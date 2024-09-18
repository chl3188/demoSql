package com.demo.sql.util.connection;

import com.demo.sql.config.exception.CustomConnectionException;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.sql.Connection;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_MYSQL;
import static com.demo.sql.util.connection.ConstDbType.DB_TYPE_ORACLE;

public abstract class AbstractDynamicJDBC {

    protected final static Set<String> JDBC_DRIVER_MAP = Collections.newSetFromMap(new ConcurrentHashMap<String, Boolean>());
    private static URLClassLoader classLoader;
    protected final Method methodConnect;
    protected final Object driver;
    protected abstract String driverClsName();
    protected abstract String jdbcPath();

    protected AbstractDynamicJDBC() throws IOException, ReflectiveOperationException{
        Class<?> proto = null;

        if(!JDBC_DRIVER_MAP.contains(jdbcPath())) {
            JDBC_DRIVER_MAP.add(jdbcPath());
            classLoader = URLClassLoader.newInstance(new URL[] { new ClassPathResource(jdbcPath()).getURL() });
            proto = classLoader.loadClass(driverClsName());
        } else {
            proto = classLoader.loadClass(driverClsName());
        }

        driver = proto.getDeclaredConstructor().newInstance();
        methodConnect = proto.getMethod("connect", String.class, Properties.class);
        methodConnect.setAccessible(true);
    }

    static public AbstractDynamicJDBC newInstance(int databaseType) throws IOException, ReflectiveOperationException {
        switch (databaseType) {
            case DB_TYPE_ORACLE: return new OracleDynamicJDBC();
            case DB_TYPE_MYSQL: return new MysqlDynamicJDBC();
        }
        return null;
    }

    public Connection connect(String jdbcUrl, Properties properties) {
        try {
            return (Connection) methodConnect.invoke(driver, jdbcUrl, properties);
        } catch (Exception e) {
            throw new CustomConnectionException(e.getMessage(), e.getCause());
        }
    }

    static class OracleDynamicJDBC extends AbstractDynamicJDBC {
        OracleDynamicJDBC() throws IOException, ReflectiveOperationException {};
        @Override protected String driverClsName() { return "oracle.jdbc.driver.OracleDriver"; }
        @Override protected String jdbcPath() { return "/jdbc/oracle/ojdbc11.jar"; }
    }

    static class MysqlDynamicJDBC extends AbstractDynamicJDBC {
        MysqlDynamicJDBC() throws IOException, ReflectiveOperationException {};
        @Override protected String driverClsName() { return "com.mysql.cj.jdbc.Driver"; }
        @Override protected String jdbcPath() { return "/jdbc/mysql/mysql-connector-j-9.0.0.jar"; }
    }
}
