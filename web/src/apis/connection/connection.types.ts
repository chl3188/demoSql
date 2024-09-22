export interface IReqConnection {
  dbType: number;
  dbIp: string;
  dbPort: string;
  dbUserId: string;
  dbUserPw: string;
  dbSid: string;
  dbName: string;
}

export interface IResConnection {
  dbType: number;
  connectionKey: string;
  shortJdbcUrl: string;
}