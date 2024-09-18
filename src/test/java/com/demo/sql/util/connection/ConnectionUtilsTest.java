package com.demo.sql.util.connection;

import com.demo.sql.dto.connection.ReqConnectionDTO;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ConnectionUtilsTest {

    @Test
    void getConnection() {
    }

    @Test
    void saveConnection() {
        ReqConnectionDTO connectionDTO = new ReqConnectionDTO();
        connectionDTO.setDbType(DB_TYPE_MYSQL);
        connectionDTO.setDbIp("127.0.0.1");
        connectionDTO.setDbPort(3306);
        connectionDTO.setDbUserId("root");
        connectionDTO.setDbUserPw("wnfjdwnfjd");
        connectionDTO.setDbName("mysql");
    }

    @Test
    void genUUID() {
    }
}