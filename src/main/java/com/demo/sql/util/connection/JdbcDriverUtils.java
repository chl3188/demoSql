package com.demo.sql.util.connection;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Map;

public class JdbcDriverUtils {

    public static Map<String, DatabaseMeta> JDBC_DRIVER_PATH = new HashMap<>() {{
        put("oracle", new DatabaseMeta("com.mysql.cj.jdbc.Driver", "jdbc/oracle.jar"));
        put("mysql", new DatabaseMeta("com.mysql.cj.jdbc.Driver", "jdbc/mysql-connector-j-9.0.0"));
    }};

    public static void invoke(String dbType) throws Exception {
        DatabaseMeta metaInfo = getDatabaseMeta(dbType);

        URLClassLoader ucl = new URLClassLoader(new URL[] { getUrl(metaInfo.getPath()) });
        Driver d = (Driver)Class.forName(metaInfo.getClassName(), true, ucl).newInstance();
        System.out.println("Driver loaded: " + d.getClass().getName());
        DriverManager.registerDriver(d);
        DriverManager.getConnection("jdbc:postgresql://host/db", "user", "pw");
    }

    public static DatabaseMeta getDatabaseMeta(String dbType) {
        return JDBC_DRIVER_PATH.get(dbType);
    }

    public static URL getUrl(String path) throws MalformedURLException {
        String resourcesPath = "src/main/resources";
        File jarFile = new File(resourcesPath, path);
        return jarFile.toURI().toURL();
    }

    @Data
    @AllArgsConstructor
    public static class DatabaseMeta {
        private String className;
        private String path;
    }
}
