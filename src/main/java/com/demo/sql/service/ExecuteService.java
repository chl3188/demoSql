package com.demo.sql.service;

import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.util.Validator;
import org.springframework.stereotype.Service;
import com.demo.sql.dto.execute.ReqExecuteSqlDTO;
import static com.demo.sql.util.ConstResponse.*;

@Service
public class ExecuteService {

    public ResponseBase executeSQL(ReqExecuteSqlDTO body) {
        if(Validator.isStringValid(body.getSql())) {
            return new ResponseBase(RES_FAIL_INVALID_PARAM_CODE, RES_FAIL_INVALID_PARAM_MSG, null);
        }

        return new ResponseBase(RES_OK_CODE, RES_OK_MSG, null);
    }
}
