package com.demo.sql.dto.execute;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ResExecuteSqlDTO {
    private String type;
    private List<Map<String, String>> resultList;
    private int affectedRows;
}
