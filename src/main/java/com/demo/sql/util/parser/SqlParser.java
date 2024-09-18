package com.demo.sql.util.parser;

public class SqlParser {

    public static SqlType getSqlType(String sql) {
        if (sql == null || sql.trim().isEmpty()) {
            return SqlType.UNKNOWN;
        }

        String trimmedSql = sql.trim().toUpperCase();

        if (trimmedSql.startsWith("SELECT")) {
            return SqlType.SELECT;
        } else if (trimmedSql.startsWith("INSERT")) {
            return SqlType.INSERT;
        } else if (trimmedSql.startsWith("UPDATE")) {
            return SqlType.UPDATE;
        } else if (trimmedSql.startsWith("DELETE")) {
            return SqlType.DELETE;
        } else if (trimmedSql.startsWith("CREATE")) {
            return SqlType.CREATE;
        } else {
            return SqlType.UNKNOWN;
        }
    }
}
