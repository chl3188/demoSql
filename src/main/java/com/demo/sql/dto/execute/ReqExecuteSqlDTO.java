package com.demo.sql.dto.execute;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqExecuteSqlDTO {
    @NotNull(message = "connectionKey cannot be null")
    private String connectionKey;
    @NotNull(message = "sql cannot be null")
    private String sql;
}
