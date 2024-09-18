package com.demo.sql.config.exception;

public class CustomConnectionException extends RuntimeException {

    public CustomConnectionException(String message, Throwable cause) {
        super(message, cause);
    }
}