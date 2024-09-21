import axios, { AxiosInstance } from "axios";
import { IResponse } from "./response";

export const requset: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9080",
});

export const getApi = async <T>(
  url: string,
  parameter?: any
): Promise<IResponse<T>> => {
  try {
    const res = await requset({
      url,
      method: "GET",
      params: parameter,
    });

    return res.data;
  } catch (err) {
    console.log("[API Error Get] ==> " + url + " / " + err);
    return errorCheck(err);
  }
};

export const postApi = async <T>(
  url: string,
  data?: any
): Promise<IResponse<T>> => {
  try {
    const res = await requset({
      url,
      method: "POST",
      data,
    });

    return res.data;
  } catch (err) {
    console.log("[API Error Post] ==> " + url + " / " + err);
    return errorCheck(err);
  }
};

export const putApi = async (url: string, data?: any) => {
  try {
    const res = await requset({
      url,
      method: "PUT",
      data,
    });

    return res.data;
  } catch (err) {
    console.log("[API Error Put] ==> " + url + " / " + err);
    return errorCheck(err);
  }
};

export const deleteApi = async (url: string, data?: any) => {
  try {
    const res = await requset({
      url,
      method: "DELETE",
      data,
    });

    return res.data;
  } catch (err) {
    console.log("[API Error Delete] ==> " + url + " / " + err);
    return errorCheck(err);
  }
};

const errorCheck = async (err: any) => {
  if (!err || !err.response) {
    return null;
  }

  if (
    err.response.status &&
    (err.response.status === 403 || err.response.status === 401)
  ) {
    // await TokenStorage.clear();
    return err.response.data;
  }

  return err.response.data;
};
