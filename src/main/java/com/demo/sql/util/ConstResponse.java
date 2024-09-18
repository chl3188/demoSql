package com.demo.sql.util;

public class ConstResponse {

    public static final int RES_OK_CODE = 200;
    public static final String RES_OK_MSG= "SUCCESS";

    public static final int RES_SERVER_ERR_CODE = 500;
    public static final String RES_SERVER_ERR_MSG = "SERVER ERROR";

    public static final int RES_FAIL_INVALID_PARAM_CODE = 1000;
    public static final String RES_FAIL_INVALID_PARAM_MSG = "Invalid Parameter";
    public static final int RES_FAIL_CREATE_CONNECTION_CODE = 2000;
    public static final String RES_FAIL_CREATE_CONNECTION_MSG = "Failed Create Connection";
    public static final int RES_FAIL_CONNECTION_INVALID_CODE = 2001;
    public static final String RES_FAIL_CONNECTION_INVALID_MSG = "Invalid Connection";
}
