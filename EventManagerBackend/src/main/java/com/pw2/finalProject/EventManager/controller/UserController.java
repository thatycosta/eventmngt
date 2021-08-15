package com.pw2.finalProject.EventManager.controller;

import com.pw2.finalProject.EventManager.dto.UserDto;
import com.pw2.finalProject.EventManager.request.UserDetailsRequestModel;
import com.pw2.finalProject.EventManager.response.OperationStatusModel;
import com.pw2.finalProject.EventManager.response.RequestOperationName;
import com.pw2.finalProject.EventManager.response.RequestOperationStatus;
import com.pw2.finalProject.EventManager.response.UserResponse;
import com.pw2.finalProject.EventManager.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users") //http://localhost:8080/users
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping(path = "/{id}",
            produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public UserResponse getUser(@PathVariable String id){
        UserResponse returnValue = new UserResponse();

        UserDto userDto = userService.getUserByUserId(id);
        ModelMapper modelMapper = new ModelMapper();
        returnValue = modelMapper.map(userDto, UserResponse.class);

        return returnValue;
    }

    @PostMapping(
            consumes = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }
    )
    public UserResponse createUser(@RequestBody UserDetailsRequestModel userDetails) throws Exception{
        UserResponse returnValue = new UserResponse();

        if(userDetails.getFirstName().isEmpty()) throw  new NullPointerException("The object is null");

        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(userDetails, UserDto.class);

        UserDto createdUser = userService.createUser(userDto);
        returnValue = modelMapper.map(createdUser, UserResponse.class);

        return returnValue;
    }

    @PutMapping(path = "/{id}",
            consumes = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE },
            produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public UserResponse updateUser(@PathVariable String id, @RequestBody UserDetailsRequestModel userDetails){

        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(userDetails, UserDto.class);

        UserDto updatedUser = userService.updateUser(id, userDto);

        return modelMapper.map(updatedUser, UserResponse.class);
    }

    @DeleteMapping(path = "/{id}",
            produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public OperationStatusModel deleteUser(@PathVariable String id){

        OperationStatusModel returnValue = new OperationStatusModel();
        returnValue.setOperationName(RequestOperationName.DELETE.name());

        userService.deleteUser(id);

        returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return returnValue;
    }

    @GetMapping(produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public List<UserResponse> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
                                       @RequestParam(value = "limit", defaultValue = "25") int limit){
        List<UserResponse> returnValue = new ArrayList<>();

        List<UserDto> users = userService.getUsers(page, limit);

        for(UserDto userDto : users){
            ModelMapper modelMapper = new ModelMapper();
            UserResponse userModel = modelMapper.map(userDto, UserResponse.class);
            returnValue.add(userModel);
        }

        return returnValue;
    }

    @PostMapping(path="/subscription/{userId}/{eventId}")
    public UserResponse subscribeUser(@PathVariable String userId, @PathVariable long eventId){

        UserDto userDto = userService.subscribeUserToEvent(userId, eventId);

        ModelMapper modelMapper = new ModelMapper();
        UserResponse userResponse = new UserResponse();
        userResponse =   modelMapper.map(userDto, UserResponse.class);

        return userResponse;

    }



}
