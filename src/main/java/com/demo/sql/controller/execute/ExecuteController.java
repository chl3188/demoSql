package com.demo.sql.controller.execute;

import com.demo.sql.dto.execute.ReqExecuteSqlDTO;
import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.service.ExecuteService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/v1/execute/")
public class ExecuteController {

    @Resource
    private ExecuteService executeService;

    /*
    *  SQL 실행 API
    */
    @PostMapping("/sql")
    public ResponseBase execute(ReqExecuteSqlDTO requestExecuteSqlDTO) {
        return executeService.executeSQL(requestExecuteSqlDTO);
    }
}
