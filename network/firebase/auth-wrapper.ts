/* eslint-disable no-undef */
"use client";

import { auth } from "@/firebaseConfig";

const withAuthorization = (fetch: typeof window.fetch) => {
  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    const currentUser = auth.currentUser;
    const jwt = await currentUser?.getIdToken();
    const uid = currentUser?.uid;

    console.log("JWT TOKEN", jwt);

    if (jwt) {
      options.headers = {
        ...options.headers,
        cache: "no-store",
        pragma: "no-cache",
        Authorization: `Bearer ${jwt}`,
        "server-environment": process.env.SERVER_ENV!,
        "X-User-Id": uid || "",
      };
    }

    return fetch(url, options);
  };
};

export const fetchWithFirebaseJwt = withAuthorization(fetch);
