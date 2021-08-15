package com.pw2.finalProject.EventManager.service;

import com.pw2.finalProject.EventManager.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserDto createUser(UserDto user);
    UserDto getUser(String email);
    UserDto getUserByUserId(String userId);
    UserDto updateUser(String userId, UserDto user);
    void deleteUser(String userId);
    UserDto subscribeUserToEvent(String userId, long eventId);
    List<UserDto> getUsers(int page, int limit);
}
