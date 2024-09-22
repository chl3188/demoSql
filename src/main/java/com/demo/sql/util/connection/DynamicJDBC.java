package com.demo.sql.util.connection;

import com.demo.sql.config.exception.CustomConnectionException;
import com.demo.sql.dto.connection.ReqConnectionDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.sql.Connection;
import java.util.Properties;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;
import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_ORACLE;

public class DynamicJDBC {

    public static Connection createConnection(ReqConnectionDTO connectionDTO) {
        String jdbcUrl = "";

        try {
            AbstractDynamicJDBC dynamicJDBC = AbstractDynamicJDBC.newInstance(connectionDTO.getDbType());

            Properties props = new Properties();
            props.setProperty("user", connectionDTO.getDbUserId());
            props.setProperty("password", connectionDTO.getDbUserPw());

            switch(connectionDTO.getDbType()) {
                case DB_TYPE_ORACLE: jdbcUrl = String.format("jdbc:oracle:thin:@%s:%d:%s", connectionDTO.getDbIp(), connectionDTO.getDbPort(), connectionDTO.getDbSid(), connectionDTO.getDbName());
                    break;
                case DB_TYPE_MYSQL : jdbcUrl = String.format("jdbc:mysql://%s:%d/%s", connectionDTO.getDbIp(), connectionDTO.getDbPort(), connectionDTO.getDbName());
                    break;
            }

            return dynamicJDBC.connect(jdbcUrl, props);
        } catch (CustomConnectionException ce) {
            throw new CustomConnectionException(ce.getMessage(), ce.getCause());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
