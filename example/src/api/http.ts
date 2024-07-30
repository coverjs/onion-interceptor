import { createInterceptor } from "onion-interceptor";

import { interceptors } from "../interceptor";
import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

createInterceptor(http).use(...interceptors);

/**
 *  const interceptor = createInterceptor(http);
 * 
 * 
 *  function setupIntercepters(intercepter){
 *    setupLoadingInterceptor(intercepter);
 *    .....
 *  }
 * 
 */

export { http };
