import { delApi, getApi } from "..";
import { postApi } from "../request";
import { IResponse } from "../response";
import { IReqConnection, IResConnection } from "./connection.types";

export const APIGetConnection = async (): Promise<
  IResponse<IResConnection[]>
> => {
  const response: IResponse<IResConnection[]> = await getApi("v1/connection/");
  return response;
};

export const APIPostConnection = async (
  body: IReqConnection
): Promise<IResponse<IResConnection>> => {
  const response: IResponse<IResConnection> = await postApi(
    "v1/connection/",
    body
  );
  return response;
};

export const APIDeleteConnection = async (
  key: string
): Promise<IResponse<IResConnection>> => {
  const response: IResponse<IResConnection> = await delApi(
    "v1/connection/" + key
  );
  return response;
};
