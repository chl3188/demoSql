package com.demo.sql.controller.connection;

import com.demo.sql.dto.common.ResponseBase;
import com.demo.sql.dto.connection.ReqConnectionDTO;
import com.demo.sql.service.connection.ConnectionService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/connection")
public class ConnectionController {

    @Resource
    ConnectionService connectionService;

    @GetMapping("/")
    public ResponseBase getConnection() {
        return connectionService.getConnectionKeys();
    }

    @PostMapping("/")
    public ResponseBase createConnection(@Valid @RequestBody ReqConnectionDTO connectionDTO) {
        return connectionService.createConnection(connectionDTO);
    }

    @DeleteMapping("/{key}")
    public ResponseBase deleteConnection(@PathVariable String key) {
        return connectionService.deleteConnection(key);
    }
}
