import api from './axios';
import { ApiResponse } from '../types/application';

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

export const login = async (username: string, password: string) => {
  const { data } = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', { username, password });
  return data.data;
};
