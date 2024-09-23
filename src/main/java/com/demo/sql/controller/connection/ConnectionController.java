package com.demo.sql.controller.connection;

import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.dto.connection.ReqConnectionDTO;
import com.demo.sql.service.connection.ConnectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/connection")
public class ConnectionController {

    @Autowired
    ConnectionService connectionService;

    /*
        DB 커넥션 정보 조회
     */
    @GetMapping("/")
    public ResponseBase getConnection() {
        return connectionService.getConnectionKeys();
    }

    /*
        DB 커넥션 생성, Validator 적용
     */
    @PostMapping("/")
    public ResponseBase createConnection(@Valid @RequestBody ReqConnectionDTO connectionDTO) {
        return connectionService.createConnection(connectionDTO);
    }

    /*
        DB 커넥션 삭제, Connection Key 필요
     */
    @DeleteMapping("/{key}")
    public ResponseBase deleteConnection(@PathVariable String key) {
        return connectionService.deleteConnection(key);
    }
}
