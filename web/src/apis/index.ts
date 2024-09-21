import axios, { AxiosResponse } from "axios";
// import { TokenStorage } from "@/utils/storage";
import { BASE_URL } from "./config";
import { IResponse } from "./response";

const API = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

const errorCheck = async (err: any) => {
  if (!err || !err.response) {
    return null;
  }

  if (
    err.response.status &&
    (err.response.status === 403 || err.response.status === 401)
  ) {
    // TokenStorage.clear();
    return err.response.data;
  }

  return err.response.data;
};

export const getApi = async <T>(
  url: string,
  params?: any
): Promise<IResponse<T>> => {
  try {
    // setAuthToken(TokenStorage.get());

    const res: AxiosResponse<IResponse<T>> = await API({
      url,
      method: "GET",
      params,
    });

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

export const postApi = async <T>(
  url: string,
  data?: any
): Promise<IResponse<T>> => {
  try {
    // setAuthToken(TokenStorage.get());

    const res: AxiosResponse<IResponse<T>> = await API({
      url,
      method: "POST",
      data: data,
    });

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

export const putApi = async <T>(
  url: string,
  data?: any
): Promise<IResponse<T>> => {
  try {
    // setAuthToken(TokenStorage.get());

    const res: AxiosResponse<IResponse<T>> = await API({
      url,
      method: "PUT",
      data: data,
    });

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

export const delApi = async <T>(
  url: string,
  data?: any
): Promise<IResponse<T>> => {
  try {
    // setAuthToken(TokenStorage.get());

    const res: AxiosResponse<IResponse<T>> = await API({
      url,
      method: "DELETE",
      data: data,
    });

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

export const fileDownloadApi = async <T>(
  url: string,
  data?: any
): Promise<IResponse<T>> => {
  try {
    // setAuthToken(TokenStorage.get());

    const res: AxiosResponse<IResponse<T>> = await API({
      url,
      method: "POST",
      data: data,
      responseType: "blob",
    });

    return res.data;
  } catch (err) {
    return errorCheck(err);
  }
};

/**
 * 헤더 토큰 설정
 * @param token
 */
export const setAuthToken = (token: string | null) => {
  if (typeof token === "string") {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
