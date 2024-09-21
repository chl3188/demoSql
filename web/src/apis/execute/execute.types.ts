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
  resultList: IResExecuteSQLResult[];
  affectedRows: number;
}
