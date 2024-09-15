package com.demo.sql.dto.connection;

import lombok.Data;

@Data
public class ReqConnectionDTO {
    private int dbType;
    private String dbIp;
    private int dbPort;
    private String dbUserId;
    private String dbUserPw;
    private String dbName;
}
