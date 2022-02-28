import axios from "axios";
import callApi from "../config/api";
import { CheckoutTypes } from "./data-types";
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export const getMemberTransaction = async (valueParams: string) => {
  let params = "";
  if (valueParams === "all") {
    params = "";
  } else {
    params = `?status=${valueParams}`;
  }
  const url = `${ROOT_API}/${API_VERSION}/players/history${params}`;
  return callApi({
    method: "GET",
    url,
    token: true,
  });
};

export const getMemberOverview = async () => {
  const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;
  return callApi({
    method: "GET",
    url,
    token: true,
  });
};
export const getTransactionDetail = async (id: string, token: string) => {
  const url = `${ROOT_API}/${API_VERSION}/players/history/${id}/detail`;
  return callApi({
    method: "GET",
    url,
    serverToken: token,
  });
};
export const updateProfile = async (data: FormData, id: string) => {
  const url = `${ROOT_API}/${API_VERSION}/players/profile/${id}`;
  return callApi({
    method: "PUT",
    url,
    data,
    token: true,
  });
};
