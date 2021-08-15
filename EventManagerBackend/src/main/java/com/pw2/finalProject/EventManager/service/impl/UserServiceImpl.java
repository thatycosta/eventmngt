package com.pw2.finalProject.EventManager.service.impl;

import com.pw2.finalProject.EventManager.dto.UserDto;
import com.pw2.finalProject.EventManager.dto.Utils;
import com.pw2.finalProject.EventManager.io.entity.EventEntityOne;
import com.pw2.finalProject.EventManager.io.entity.UserEntityOne;
import com.pw2.finalProject.EventManager.exceptions.UserServiceException;
import com.pw2.finalProject.EventManager.io.repository.EventRepository;
import com.pw2.finalProject.EventManager.io.repository.UsersRepository;
import com.pw2.finalProject.EventManager.response.ErrorMessages;
import com.pw2.finalProject.EventManager.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersRepository userRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    Utils utils;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDto createUser(UserDto user) {

        if(userRepository.findByEmail(user.getEmail()) != null) throw new UserServiceException("Record already exists");

        ModelMapper modelMapper = new ModelMapper();
        UserEntityOne userEntity = modelMapper.map(user, UserEntityOne.class);

        String publicUserId = utils.generateUserId(30);
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userEntity.setUserId(publicUserId);

        UserEntityOne storedUserDetails = userRepository.save(userEntity);

        return modelMapper.map(storedUserDetails, UserDto.class);
    }

    @Override
    public UserDto getUser(String email){
        UserEntityOne userEntity = userRepository.findByEmail(email);

        if(userEntity == null) throw new UsernameNotFoundException(email);

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(userEntity, returnValue);
        return returnValue;
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        UserDto returnValue = new UserDto();
        UserEntityOne userEntity = userRepository.findByUserId(userId);

        if(userEntity == null)
            throw new UsernameNotFoundException("User with ID: " + userId + " not found");

        BeanUtils.copyProperties(userEntity, returnValue);

        return returnValue;
    }

    @Override
    public UserDto updateUser(String userId, UserDto user) {
        UserDto returnValue = new UserDto();

        UserEntityOne userEntity = userRepository.findByUserId(userId);

        if(userEntity == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());

        UserEntityOne updatedUserDetails = userRepository.save(userEntity);

        BeanUtils.copyProperties(updatedUserDetails, returnValue);

        return returnValue;
    }

    @Override
    public UserDto subscribeUserToEvent(String userId, long eventId) {
        UserEntityOne userEntity = userRepository.findByUserId(userId);

        EventEntityOne event = eventRepository.findEventById(eventId);
        Set<EventEntityOne> events = new HashSet<>();
        events.add(event);
        userEntity.setEventEntities(events);
        event.getEventsentitiesone().add(userEntity);

        eventRepository.save(event);
        UserEntityOne updatedUserDetails = userRepository.save(userEntity);

        ModelMapper modelMapper = new ModelMapper();

        UserDto userDto = new UserDto();
        userDto = modelMapper.map(updatedUserDetails, UserDto.class);

        return userDto;
    }

    @Override
    public void deleteUser(String userId) {

        UserEntityOne userEntity = userRepository.findByUserId(userId);

        if(userEntity == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        userRepository.delete(userEntity);

    }

    @Override
    public List<UserDto> getUsers(int page, int limit) {
        List<UserDto> returnValue = new ArrayList<>();

        if(page > 0) page = page - 1;

        Pageable pageableRequest = PageRequest.of(page, limit);

        Page<UserEntityOne> usersPage =  userRepository.findAll(pageableRequest);
        List<UserEntityOne> users = usersPage.getContent();

        for(UserEntityOne userEntity : users){
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(userEntity, userDto);
            returnValue.add(userDto);
        }

        return returnValue;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntityOne userEntity = userRepository.findByEmail(email);

        if(userEntity == null) throw new UsernameNotFoundException(email);

        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), new ArrayList<>());
    }
}
