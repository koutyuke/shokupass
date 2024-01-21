import { apiContract } from "@shokupass/api-contracts";
import { initClient } from "@ts-rest/core";

const fetchClient = initClient(apiContract, {
  baseUrl: process.env["EXPO_PUBLIC_API_BASE_URL"]!,
  baseHeaders: {
    "Content-Type": "application/json",
  },
});

export { fetchClient };
