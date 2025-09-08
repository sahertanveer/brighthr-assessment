import { AxiosInstance } from "axios";

// Define a mocked axios type
const axios: jest.Mocked<AxiosInstance & typeof import("axios")> = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(() => axios) as any, // cast because create returns axios itself
} as any;

export default axios;
