package com.demo.sql.dto.connection;

import lombok.Data;

@Data
public class ReqConnectionDTO {
    private String dbType;
    private String dbIp;
    private String dbPort;
    private String dbUserId;
    private String dbUserPw;
    private String dbName;
}
