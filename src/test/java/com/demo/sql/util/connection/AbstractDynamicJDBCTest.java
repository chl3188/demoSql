package com.demo.sql.util.connection;

import org.junit.jupiter.api.Test;

import javax.swing.*;
import java.sql.Connection;
import java.util.Properties;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;
import static org.assertj.core.api.Assertions.assertThat;

class AbstractDynamicJDBCTest {

    @Test
    void connect() throws Exception {
        Properties props = new Properties();
        props.setProperty("user", "root");
        props.setProperty("password", "wnfjdwnfjd");

        AbstractDynamicJDBC dynamicJDBC = AbstractDynamicJDBC.newInstance(DB_TYPE_MYSQL);
        Connection conn = dynamicJDBC.connect("jdbc:mysql://127.0.0.1:3306/mysql", props);

        assertThat(conn).isNotEqualTo(null);
    }
}