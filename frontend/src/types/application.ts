export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface HostelApplication {
  id: number;
  studentName: string;
  parentName: string;
  parentContactNo: string;
  dateOfJoining: string;
  dateOfBirth: string;
  gender: Gender;
  course: string;
  registerNumber: string;
  studentMobileNo: string;
  residenceAddress: string;
  permanentAddress: string;
  localGuardianName: string;
  localGuardianContactNo: string;
  localGuardianAddress: string;
  personalHistory?: string;
  status: ApplicationStatus;
  roomNo?: string;
  createdAt: string;
  updatedAt: string;
}

export type HostelApplicationPayload = Omit<HostelApplication, 'id' | 'status' | 'roomNo' | 'createdAt' | 'updatedAt'>;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Stats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalMale: number;
  totalFemale: number;
}
