package com.pw2.finalProject.EventManager.exceptions;

public class UserServiceException extends RuntimeException{

    private static final long serialVersionUID = 32312156445134L;

    public UserServiceException(String message) {
        super(message);
    }
}