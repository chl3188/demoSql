package com.demo.sql.dto.connection;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResConnectionDTO {
    private int dbType;
    private String connectionKey;
    private String shortJdbcUrl;
}
