import axios from "axios";
import callApi from "../config/api";
import { CheckoutTypes } from "./data-types";
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getFeaturedGames = async () => {
  const URL = "players/landingpage";

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;
  return axiosResponse.data;
};

export const getDetailVoucher = async (id: any) => {
  const URL = `players/${id}/detailpage`;

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;
  return axiosResponse.data;
};

export const getGameCategory = async () => {
  const URL = `players/category`;
  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;
  return axiosResponse.data;
};
export const setCheckout = async (data: CheckoutTypes) => {
  const url = `${ROOT_API}/${API_VERSION}/players/checkout`;
  return callApi({
    method: "POST",
    data,
    url,
    token: true,
  });
};
