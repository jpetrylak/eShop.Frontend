export const OrdersEndpoints = {
  getPaged: {
    path: "api/orders",
    method: "GET",
    successfulHttpCodes: [200],
    problemsHttpCodes: []
  },

  getDetails: {
    path: "api/orders/{orderId}",
    method: "GET",
    successfulHttpCodes: [200],
    problemsHttpCodes: [404]
  },

  create: {
    path: "api/orders",
    method: "POST",
    successfulHttpCodes: [201],
    problemsHttpCodes: [409, 400]
  }
};
