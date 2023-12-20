export interface IApiResponse<T = any> {
  isSuccessful: boolean;
  data?: T | null;
  problems?: ProblemsResponse | null;
}

export type ProblemsResponse = {
  type: string;
  title: string;
  status: number;
  errors: ProblemsError;
  traceId: string;
};

export type ProblemsError = {
  [name: string]: string[];
};
