"use client";

import { fetchWithFirebaseJwt } from "./auth-wrapper";

const getWithFirebaseJwt = async (endpoint: string): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;
  return fetchWithFirebaseJwt(url, { method: "GET" });
};

const postWithFirebaseJwt = async (
  endpoint: string,
  body: any,
): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;
  return fetchWithFirebaseJwt(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const deleteWithFirebaseJwt = async (endpoint: string): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;
  return fetchWithFirebaseJwt(url, { method: "DELETE" });
};

export { getWithFirebaseJwt, postWithFirebaseJwt, deleteWithFirebaseJwt };
