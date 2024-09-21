export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IGetParameter {
  page: number;
  size?: number;
  sort?: string;
  direction?: SortDirection;
  search?: string;
}

export interface IPagination {
  total: number;
  size: number;
  page: number;
  isLast?: boolean;
  isFirst?: boolean;
}

export interface IPaginationResponse<T> extends IPagination {
  list: T[];
}

export enum RESPONSE_CODE {
  OK = 200,
  OK_NO_CONTENTS = 204,
  BAD_PARAMETER = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 403,
  SERVER_ERROR = 500,
  SOCIAL_USER_DUPLICATE = 1001,
}

export const MESSAGE = {
  ERROR: "잠시 후 다시 시도해 주세요",
};

export const responseSuccess = <T>(res: IResponse<T>): boolean => {
  if (
    res &&
    [RESPONSE_CODE.OK, RESPONSE_CODE.OK_NO_CONTENTS].includes(res.code)
  ) {
    return true;
  }

  return false;
};

export const apiResponseBoolean = <T>(
  res: IResponse<T>,
  hideMessage?: boolean
) => {
  try {
    if (responseSuccess(res)) {
      return true;
    }

    !hideMessage && alert(res.message);
    return false;
  } catch (error) {
    !hideMessage && alert(MESSAGE.ERROR);
    return false;
  }
};

export const apiResponseData = <T>(res: IResponse<T>) => {
  try {
    if (responseSuccess(res)) {
      return res.data;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const apiResponsePaging = <T>(res: IResponse<T>) => {
  const result = {
    list: [],
    total: 0,
    size: 10,
    page: 1,
    isLast: false,
  };

  try {
    if (responseSuccess(res)) {
      return res.data;
    }

    return result;
  } catch (error) {
    return result;
  }
};
