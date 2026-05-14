export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

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
  hostelName?: string;
  floorNo?: string;
  roomNo?: string;
  bedNo?: string;
  wardenName?: string;
  wardenContactNo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostelApplicationPayload {
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
  hostelName: string;
  floorNo: string;
  roomNo: string;
  bedNo?: string;
  wardenName: string;
  wardenContactNo?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Stats {
  totalApplications: number;
  totalMale: number;
  totalFemale: number;
  totalOther: number;
}
