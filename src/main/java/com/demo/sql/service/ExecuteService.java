package com.demo.sql.service;

import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.util.Validator;
import com.demo.sql.util.connection.ConnectionUtils;
import com.demo.sql.util.connection.DynamicJDBC;
import com.demo.sql.util.parser.SqlParser;
import com.demo.sql.util.parser.SqlType;
import org.springframework.stereotype.Service;
import com.demo.sql.dto.execute.ReqExecuteSqlDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.demo.sql.util.ConstResponse.*;

@Service
public class ExecuteService {

    public ResponseBase executeSQL(ReqExecuteSqlDTO executeSqlDTO) {
        List<Map<String, String>> resultList = new ArrayList<>();

        try{
            Connection conn = ConnectionUtils.getConnection(executeSqlDTO.getConnectionKey());

            if(conn == null) {
                return new ResponseBase(RES_FAIL_CONNECTION_INVALID_CODE, RES_FAIL_CONNECTION_INVALID_MSG);
            }

            SqlType sqlType = SqlParser.getSqlType(executeSqlDTO.getSql());
            PreparedStatement pstmt = conn.prepareStatement(executeSqlDTO.getSql());
            if(sqlType == SqlType.SELECT) {
                ResultSet resultSet = pstmt.executeQuery();

                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (resultSet.next()) {
                    Map<String, String> rowMap = new HashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnLabel(i);
                        String columnValue = resultSet.getString(i);
                        rowMap.put(columnName, columnValue);
                    }
                    resultList.add(rowMap);
                }

                return new ResponseBase(RES_OK_CODE, RES_OK_MSG, resultList);
            } else {
                int affectedRow = pstmt.executeUpdate();

                return new ResponseBase(RES_OK_CODE, RES_OK_MSG, affectedRow);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseBase(RES_SERVER_ERR_CODE, e.getMessage());
        }
    }
}
