export interface JobAttributes {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply:string;
}

export interface JobCardprops {
  id: string;
  logo: string;
  title: string;
  company: string;
  location: string;
  type: string;
  created_at: string;
}

export interface LoginResponse {
  data: any;
  status: any;
  headers: any;
}

export interface GetJobsResponse {
  data: any;
  status: any;
}