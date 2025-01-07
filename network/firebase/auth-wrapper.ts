/* eslint-disable no-undef */
"use client";

import { auth } from "@/firebaseConfig";
const withAuthorization = (fetch: typeof window.fetch) => {
  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    const jwt = await auth.currentUser?.getIdToken();
    console.log("JWT TOKEN", jwt);
    if (jwt) {
      options.headers = {
        ...options.headers,
        cache: "no-store",
        pragma: "no-cache",
        Authorization: `Bearer ${jwt}`,
        "server-environment": process.env.SERVER_ENV!,
      };
    }
    return fetch(url, options);
  };
};

export const fetchWithFirebaseJwt = withAuthorization(fetch);
