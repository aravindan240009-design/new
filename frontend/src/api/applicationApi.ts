import api from './axios';
import { ApiResponse, ApplicationStatus, Gender, HostelApplication, HostelApplicationPayload, Stats } from '../types/application';

export const submitApplication = async (payload: HostelApplicationPayload) => {
  const { data } = await api.post<ApiResponse<HostelApplication>>('/api/applications', payload);
  return data.data;
};

export const getApplications = async () => {
  const { data } = await api.get<ApiResponse<HostelApplication[]>>('/api/applications');
  return data.data;
};

export const getApplication = async (id: string | number) => {
  const { data } = await api.get<ApiResponse<HostelApplication>>(`/api/applications/${id}`);
  return data.data;
};

export const updateApplication = async (id: string | number, payload: HostelApplicationPayload) => {
  const { data } = await api.put<ApiResponse<HostelApplication>>(`/api/applications/${id}`, payload);
  return data.data;
};

export const deleteApplication = async (id: number) => api.delete(`/api/applications/${id}`);
export const approveApplication = async (id: number) => api.patch(`/api/applications/${id}/approve`);
export const rejectApplication = async (id: number) => api.patch(`/api/applications/${id}/reject`);
export const assignRoom = async (id: number, roomNo: string) => api.patch(`/api/applications/${id}/room`, { roomNo });

export const searchApplications = async (keyword: string) => {
  const { data } = await api.get<ApiResponse<HostelApplication[]>>('/api/applications/search', { params: { keyword } });
  return data.data;
};

export const filterApplications = async (params: { status?: ApplicationStatus | ''; gender?: Gender | ''; course?: string }) => {
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value));
  const { data } = await api.get<ApiResponse<HostelApplication[]>>('/api/applications/filter', { params: clean });
  return data.data;
};

export const getStats = async () => {
  const { data } = await api.get<ApiResponse<Stats>>('/api/applications/stats');
  return data.data;
};
