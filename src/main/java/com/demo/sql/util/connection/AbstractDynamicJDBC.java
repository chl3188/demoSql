package com.demo.sql.util.connection;

import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;

public abstract class AbstractDynamicJDBC {

    protected final static Map<String, String> JDBC_DRIVER_MAP = new ConcurrentHashMap<>();

    protected final Method methodConnect;
    protected final Object driver;
    protected abstract String driverClsName();
    protected abstract String jdbcPath();

    protected AbstractDynamicJDBC() throws IOException, ReflectiveOperationException{
        Class<?> proto = null;

        if(!JDBC_DRIVER_MAP.containsKey(jdbcPath())) {
            JDBC_DRIVER_MAP.put(jdbcPath(), jdbcPath());
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[] { new ClassPathResource(jdbcPath()).getURL() });
            proto = classLoader.loadClass(driverClsName());
        } else {
            proto = Class.forName(driverClsName());
        }

        driver = proto.getDeclaredConstructor().newInstance();
        methodConnect = proto.getMethod("connect", String.class, Properties.class);
        methodConnect.setAccessible(true);
    }

    static public AbstractDynamicJDBC newInstance(int databaseType) throws IOException, ReflectiveOperationException {
        switch (databaseType) {
            case DB_TYPE_MYSQL: return new MysqlDynamicJDBC();
        }
        return null;
    }

    public Connection connect(String jdbcUrl, Properties properties) {
        try {
            return (Connection) methodConnect.invoke(driver, jdbcUrl, properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    static class MysqlDynamicJDBC extends AbstractDynamicJDBC {
        MysqlDynamicJDBC() throws IOException, ReflectiveOperationException {};
        @Override protected String driverClsName() { return "com.mysql.cj.jdbc.Driver"; }
        @Override protected String jdbcPath() { return "/jdbc/mysql-connector-j-9.0.0.jar"; }
    }
}
