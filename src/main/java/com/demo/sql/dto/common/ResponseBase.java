package com.demo.sql.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseBase {
    private int code;
    private String message;
    private Object data;

    public ResponseBase(int code, String msg) {
        this.code = code;
        this.message = msg;
    }
}
