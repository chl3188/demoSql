package com.demo.sql.util.connection;

import com.demo.sql.dto.connection.ReqConnectionDTO;

import java.sql.Connection;
import java.util.Properties;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;

public class DynamicJDBC {

    public static Connection getConnection(ReqConnectionDTO connectionDTO) {
        String jdbcUrl = "";

        try {
            AbstractDynamicJDBC dynamicJDBC = AbstractDynamicJDBC.newInstance(connectionDTO.getDbType());

            Properties props = new Properties();
            props.setProperty("user", connectionDTO.getDbUserId());
            props.setProperty("password", connectionDTO.getDbUserPw());

            switch(connectionDTO.getDbType()) {
                case DB_TYPE_MYSQL : jdbcUrl = String.format("jdbc:mysql://%s:%d/%s", connectionDTO.getDbIp(), connectionDTO.getDbPort(), connectionDTO.getDbName()); break;
            }

            return dynamicJDBC.connect(jdbcUrl, props);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
