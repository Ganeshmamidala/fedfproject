export type UserRole = 'admin' | 'student' | 'employer' | 'placement_officer';

export type ApplicationStatus = 
  | 'applied' 
  | 'under_review' 
  | 'shortlisted' 
  | 'interview_scheduled' 
  | 'interviewed' 
  | 'selected' 
  | 'rejected' 
  | 'offer_extended'
  | 'offer_accepted'
  | 'offer_declined';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  profile?: StudentProfile | EmployerProfile;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  student_id: string;
  department: string;
  graduation_year: number;
  cgpa: number;
  skills: string[];
  resume_url?: string;
  phone: string;
  created_at: string;
}

export interface EmployerProfile {
  id: string;
  user_id: string;
  company_name: string;
  company_description: string;
  industry: string;
  website?: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  job_type: 'full_time' | 'part_time' | 'internship' | 'contract';
  salary_range: string;
  application_deadline: string;
  is_active: boolean;
  created_at: string;
  employer?: EmployerProfile;
  applications_count?: number;
}

export interface Application {
  id: string;
  job_id: string;
  student_id: string;
  status: ApplicationStatus;
  cover_letter: string;
  applied_at: string;
  updated_at: string;
  job?: Job;
  student?: StudentProfile;
  employer?: EmployerProfile;
}

export interface PlacementRecord {
  id: string;
  student_id: string;
  job_id: string;
  employer_id: string;
  placement_date: string;
  salary_offered: number;
  status: 'active' | 'completed' | 'terminated';
  created_at: string;
  student?: StudentProfile;
  job?: Job;
  employer?: EmployerProfile;
}