package com.demo.sql.dto.connection;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReqConnectionDTO {
    private int dbType;
    @NotNull(message = "dbIp cannot be null")
    private String dbIp;
    private int dbPort;
    @NotNull(message = "dbUserId cannot be null")
    private String dbUserId;
    @NotNull(message = "dbUserPw cannot be null")
    private String dbUserPw;
    @NotNull(message = "dbName cannot be null")
    private String dbName;
}
