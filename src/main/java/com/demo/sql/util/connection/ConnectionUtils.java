package com.demo.sql.util.connection;

import com.demo.sql.dto.connection.ResConnectionDTO;

import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.UUID;

public class ConnectionUtils {

    /*
        고유 Key 생성, UUID 8자리로 축약
     */
    public static String genUUID() {
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replaceAll("-", "")
                .substring(0, 8);
        return uuid;
    }

    /*
        Connection 기본 정보 생성
        DbType, ShortJdbcURL, Connection Key
     */
    public static ResConnectionDTO makeConnInfo(DatabaseMetaData meta, String key) throws SQLException {
        int dbType = 0;
        String shortUrl = "";
        String dbProductName = meta.getDatabaseProductName();

        if (dbProductName.toLowerCase().contains("oracle")) {
            String[] parts = meta.getURL().split("@")[1].split(":");
            shortUrl = parts[0] + "/" + parts[1];
            dbType = 1;
        } else if (dbProductName.toLowerCase().contains("mysql")) {
            String[] parts = meta.getURL().split("://")[1].split("/");
            String hostAndPort = parts[0];
            shortUrl = hostAndPort.split(":")[0] + "/" + hostAndPort.split(":")[1];
            dbType = 2;
        }

        return ResConnectionDTO.builder()
                .dbType(dbType)
                .connectionKey(key)
                .shortJdbcUrl(shortUrl)
                .build();
    }
}
