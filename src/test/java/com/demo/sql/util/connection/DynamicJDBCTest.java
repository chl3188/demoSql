package com.demo.sql.util.connection;

import com.demo.sql.dto.connection.ReqConnectionDTO;
import org.junit.jupiter.api.Test;

import java.sql.*;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class DynamicJDBCTest {

    @Test
    void getConnection() throws SQLException {
        String sql = "select * from mysql.user";
        ReqConnectionDTO connectionDTO = new ReqConnectionDTO();
        connectionDTO.setDbType(DB_TYPE_MYSQL);
        connectionDTO.setDbIp("127.0.0.1");
        connectionDTO.setDbPort(3306);
        connectionDTO.setDbUserId("root");
        connectionDTO.setDbUserPw("wnfjdwnfjd");
        connectionDTO.setDbName("mysql");

        Connection conn = DynamicJDBC.getConnection(connectionDTO);
        assertThat(conn).isNotEqualTo(null);

        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        while (rs.next()) {
            System.out.print(rs.getString("Host") + " / ");
            System.out.println(rs.getString("User"));
        }
    }
}