import { postApi } from "../request";
import { IResponse } from "../response";
import { IReqExecuteSQL, IResExecuteSQL } from "./execute.types";

export const APIPostExecuteSQL = async (
  body: IReqExecuteSQL
): Promise<IResponse<IResExecuteSQL>> => {
  const response: IResponse<IResExecuteSQL> = await postApi(
    "v1/execute/sql",
    body
  );
  return response;
};
