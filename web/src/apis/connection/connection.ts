import { getApi } from "..";
import { postApi } from "../request";
import { IResponse } from "../response";
import { IReqConnection } from "./connection.types";

export const APIGetConnection = async (): Promise<IResponse<string[]>> => {
  const response: IResponse<string[]> = await getApi("v1/connection/");
  return response;
};

export const APIPostConnection = async (
  body: IReqConnection
): Promise<IResponse<string>> => {
  const response: IResponse<string> = await postApi("v1/connection/", body);
  return response;
};
