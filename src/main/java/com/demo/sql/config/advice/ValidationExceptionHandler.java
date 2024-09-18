package com.demo.sql.config.advice;

import com.demo.sql.dto.common.ResponseBase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

import static com.demo.sql.util.ConstResponse.RES_FAIL_INVALID_PARAM_CODE;
import static com.demo.sql.util.ConstResponse.RES_FAIL_INVALID_PARAM_MSG;

@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseBase> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(
                new ResponseBase(RES_FAIL_INVALID_PARAM_CODE, RES_FAIL_INVALID_PARAM_MSG, errors), HttpStatus.BAD_REQUEST);
    }
}
