"use client";

import { fetchWithFirebaseJwt } from "./auth-wrapper";

const getWithFirebaseJwt = async (endpoint: string): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;
  return fetchWithFirebaseJwt(url, { method: "GET" });
};

const postWithFirebaseJwt = async (
  endpoint: string,
  body: any
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

const uploadWithFirebaseJwt = async (
  endpoint: string,
  formData: FormData
): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;

  // Do not set Content-Type header, let fetch handle it
  return fetchWithFirebaseJwt(url, {
    method: "POST",
    body: formData, // Directly send the FormData object
  });
};

const deleteWithFirebaseJwt = async (
  endpoint: string,
  body: any = null // Allow body parameter (optional)
): Promise<Response> => {
  const url = `${process.env.EXPO_PUBLIC_API_SERVER}${endpoint}`;

  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetchWithFirebaseJwt(url, options);
};

export {
  getWithFirebaseJwt,
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  uploadWithFirebaseJwt,
};
