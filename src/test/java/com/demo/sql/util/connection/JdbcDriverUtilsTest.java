package com.demo.sql.util.connection;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JdbcDriverUtilsTest {

    @Test
    void invoke() throws Exception {
        String dbType = "mysql";

        JdbcDriverUtils.invoke(dbType);
    }

    @Test
    void getDatabaseMeta() {
    }

    @Test
    void getUrl() {
    }
}