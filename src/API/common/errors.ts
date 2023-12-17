export type ProblemsResponse = {
  type: string;
  title: string;
  status: number;
  errors: object[];
  traceId: string;
};
