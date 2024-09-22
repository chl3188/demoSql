package com.demo.sql.service.connection;

import com.demo.sql.config.exception.CustomConnectionException;
import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.dto.connection.ReqConnectionDTO;
import com.demo.sql.dto.connection.ResConnectionDTO;
import com.demo.sql.util.connection.ConnectionPool;
import com.demo.sql.util.connection.DynamicJDBC;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.demo.sql.util.ConstResponse.*;
import static com.demo.sql.util.connection.ConnectionUtils.*;

@Service
public class ConnectionService {

    public ResponseBase getConnectionKeys() {
        List<ResConnectionDTO> connections = new ArrayList<>();
        Set<String> keys = ConnectionPool.getAllKeys();

        try{
            for (String key : keys) {
                Connection conn = ConnectionPool.getConnection(key);
                DatabaseMetaData meta = conn.getMetaData();
                connections.add(makeConnInfo(meta, key));
            }
        } catch (SQLException se) {
            se.printStackTrace();
        }
        
        return new ResponseBase(RES_OK_CODE, RES_OK_MSG, connections);
    }

    public ResponseBase createConnection(ReqConnectionDTO connectionDTO) {
        String key = genUUID();

        try {
            Connection conn = DynamicJDBC.createConnection(connectionDTO);

            if(conn == null) {
                return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, RES_FAIL_CREATE_CONNECTION_MSG);
            }

            ConnectionPool.setConnection(key, conn);
        } catch (CustomConnectionException ce) {
            return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, ce.getCause().toString());
        }

        ResConnectionDTO resConnectionDTO = ResConnectionDTO.builder()
                .dbType(connectionDTO.getDbType())
                .connectionKey(key)
                .shortJdbcUrl(connectionDTO.getDbIp()+"/"+connectionDTO.getDbName())
                .build();

        return new ResponseBase(RES_OK_CODE, RES_OK_MSG, resConnectionDTO);
    }

    public ResponseBase deleteConnection(String key) {
        try {
            if(ConnectionPool.getConnection(key) != null) {
                ConnectionPool.removeConnection(key);
            }
        } catch (CustomConnectionException ce) {
            return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, ce.getCause().toString());
        } catch (SQLException e) {
            return new ResponseBase(RES_SERVER_ERR_CODE, RES_SERVER_ERR_MSG);
        }

        return new ResponseBase(RES_OK_CODE, RES_OK_MSG);
    }

}
