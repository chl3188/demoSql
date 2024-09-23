package com.demo.sql.controller.execute;

import com.demo.sql.dto.execute.ReqExecuteSqlDTO;
import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.service.execute.ExecuteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/execute")
public class ExecuteController {

    @Autowired
    private ExecuteService executeService;

    /*
    *  SQL 실행 API
    */
    @PostMapping("/sql")
    public ResponseBase execute(@Valid @RequestBody ReqExecuteSqlDTO requestExecuteSqlDTO) {
        return executeService.executeSQL(requestExecuteSqlDTO);
    }
}
