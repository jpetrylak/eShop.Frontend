import { Method } from "axios";

export type Endpoint = {
  path: string;
  method: Method;
  successfulHttpCodes: number[];
  problemsHttpCodes: number[];
};

export type EndpointsCollection = {
  getPaged: Endpoint;
  getDetails: Endpoint;
  create: Endpoint;
};
