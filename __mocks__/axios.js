const axiosMock = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => axiosMock),
};
export default axiosMock;
