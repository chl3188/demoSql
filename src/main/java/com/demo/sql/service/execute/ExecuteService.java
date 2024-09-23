package com.demo.sql.service.execute;

import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.dto.execute.ResExecuteSqlDTO;
import com.demo.sql.util.connection.ConnectionPool;
import com.demo.sql.util.parser.SqlParser;
import com.demo.sql.util.parser.SqlType;
import org.springframework.stereotype.Service;
import com.demo.sql.dto.execute.ReqExecuteSqlDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.*;

import static com.demo.sql.util.ConstResponse.*;

@Service
public class ExecuteService {

    public ResponseBase executeSQL(ReqExecuteSqlDTO executeSqlDTO) {
        try{
            Connection conn = ConnectionPool.getConnection(executeSqlDTO.getConnectionKey());
            ResExecuteSqlDTO result = new ResExecuteSqlDTO();

            if(conn == null) {
                return new ResponseBase(RES_FAIL_CONNECTION_INVALID_CODE, RES_FAIL_CONNECTION_INVALID_MSG);
            }

            SqlType sqlType = SqlParser.getSqlType(executeSqlDTO.getSql());
            PreparedStatement pstmt = conn.prepareStatement(executeSqlDTO.getSql());

            if(sqlType == SqlType.SELECT) {
                List<Map<String, String>> resultList = new ArrayList<>();
                ResultSet resultSet = pstmt.executeQuery();

                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (resultSet.next()) {
                    Map<String, String> rowMap = new LinkedHashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        String columnName = metaData.getColumnLabel(i);
                        String columnValue = resultSet.getString(i);
                        rowMap.put(columnName, columnValue);
                    }
                    resultList.add(rowMap);
                }
                result.setType("Query");
                result.setResultList(resultList);
            } else {
                int affectedRow = pstmt.executeUpdate();
                result.setType("DML");
                result.setAffectedRows(affectedRow);
            }

            return new ResponseBase(RES_OK_CODE, RES_OK_MSG, result);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseBase(RES_SERVER_ERR_CODE, e.getMessage());
        }
    }
}
