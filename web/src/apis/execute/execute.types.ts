export enum ExecuteSQLType {
  QUERY = "Query",
  DML = "DML",
}

export interface IReqExecuteSQL {
  connectionKey: string;
  sql: string;
}

export interface IResExecuteSQLResult {
  [key: string]: string;
}

export interface IResExecuteSQL {
  type: string;
  columnList: IResExecuteSQLResult[];
  resultList: IResExecuteSQLResult[];
  affectedRows: number;
}
