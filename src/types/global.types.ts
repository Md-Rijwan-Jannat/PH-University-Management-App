import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface IError {
  message: string;
  status: string;
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
}

export interface IResponse<T> {
  data?: T;
  error?: IError;
  meta?: IMeta;
  success: boolean;
  message: string;
}

export type TResponseRedux<T> = IResponse<T> & BaseQueryApi;

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export interface IErrorResponse {
  message?: string;
  statusCode: number;
  errorSources?: TErrorSources;
}

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
