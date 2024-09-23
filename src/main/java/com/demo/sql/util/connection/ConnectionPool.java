package com.demo.sql.util.connection;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class ConnectionPool {

    // 생성된 Connection Pool Map
    private final static Map<String, Connection> CONNECTION_POOL = new ConcurrentHashMap<>();

    public static Connection getConnection(String key) {
        return CONNECTION_POOL.get(key);
    }

    public static Set<String> getAllKeys() {
        return CONNECTION_POOL.keySet();
    }

    public static void setConnection(String key, Connection conn) {
        CONNECTION_POOL.put(key, conn);
    }

    public static void removeConnection(String key) throws SQLException {
        Connection conn = CONNECTION_POOL.get(key);
        conn.close();
        CONNECTION_POOL.remove(key);
    }
}
