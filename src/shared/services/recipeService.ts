import type { AxiosRequestConfig } from "axios";
import Api from "../httpConfig";

export const getRecipes = (limit = 20) => {
  const options: AxiosRequestConfig = {
    params: {
      from: "0",
      size: limit,
    },
  };

  return Api.get("/recipes/list", options);
};

export const searchRecipes = (query: string, limit = 20) => {
  const options: AxiosRequestConfig = {
    params: {
      from: "0",
      size: limit,
      q: query,
    },
  };

  return Api.get("/recipes/list", options);
};

export const getMoreRecipes = (from: number, query?: string, limit = 20) => {
  const options: AxiosRequestConfig = {
    params: {
      from,
      size: limit,
      q: query,
    },
  };

  return Api.get("/recipes/list", options);
};
