package com.demo.sql.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseBase {
    private int code;
    private String msg;
    private Object data;


}
