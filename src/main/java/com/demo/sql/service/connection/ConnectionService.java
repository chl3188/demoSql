package com.demo.sql.service.connection;

import com.demo.sql.config.exception.CustomConnectionException;
import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.dto.connection.ReqConnectionDTO;
import com.demo.sql.util.connection.ConnectionUtils;
import com.demo.sql.util.connection.DynamicJDBC;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.SQLException;

import static com.demo.sql.util.ConstResponse.*;
import static com.demo.sql.util.connection.ConnectionUtils.genUUID;

@Service
public class ConnectionService {

    public ResponseBase createConnection(ReqConnectionDTO connectionDTO) {
        String key = genUUID();

        try {
            Connection conn = DynamicJDBC.createConnection(connectionDTO);

            if(conn == null) {
                return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, RES_FAIL_CREATE_CONNECTION_MSG);
            }

            ConnectionUtils.setConnection(key, conn);
        } catch (CustomConnectionException ce) {
            return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, ce.getCause().toString());
        }

        return new ResponseBase(RES_OK_CODE, RES_OK_MSG, key);
    }

    public ResponseBase deleteConnection(String key) {
        try {
            if(ConnectionUtils.getConnection(key) != null) {
                ConnectionUtils.removeConnection(key);
            }
        } catch (CustomConnectionException ce) {
            return new ResponseBase(RES_FAIL_CREATE_CONNECTION_CODE, ce.getCause().toString());
        } catch (SQLException e) {
            return new ResponseBase(RES_SERVER_ERR_CODE, RES_SERVER_ERR_MSG);
        }

        return new ResponseBase(RES_OK_CODE, RES_OK_MSG);
    }

}
