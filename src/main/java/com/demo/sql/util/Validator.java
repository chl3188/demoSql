package com.demo.sql.util;

import org.springframework.stereotype.Component;

@Component
public class Validator {

    /*
        String 값 Validate
     */
    public static boolean isStringValid(String value) {
        return value != null && value.isEmpty();
    }
}
