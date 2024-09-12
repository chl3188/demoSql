package com.demo.sql.dto.execute;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqExecuteSqlDTO {
    private String sql;
}
