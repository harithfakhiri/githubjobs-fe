import axios, { AxiosResponse } from "axios";
import { GetJobsResponse, LoginResponse } from "../interface/interface";



export const login = async (
  uname: string,
  pass: string
): Promise<LoginResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      "http://localhost:5400/api/login",
      { username: uname, password: pass }
    );
    console.log(res); // Log the response data
    return { data: res.data, status: res.status, headers: res.headers };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error); // Log any Axios errors
      throw error.response?.data.err_msg; // Rethrow the error
    } else {
      console.error("Other Error:", error); // Log other types of errors
      throw error; // Rethrow the error
    }
  }
};

export const getAllJobs = async (): Promise<GetJobsResponse> => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in session storage");
    }

    const head = {
      headers: {
        Authorization: `${token}`, // Add the JWT token to the Authorization header
      },
    };

    const res: AxiosResponse = await axios.get(
      "http://localhost:5400/api/alljobs",
      head
    );
    if (res.status === 200) {
      return res;
    } else {
      throw new Error("Failed to fetch all jobs");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error); // Log any Axios errors
      throw error.response?.status; // Rethrow the error
    } else {
      console.error("Other Error:", error); // Log other types of errors
      throw error; // Rethrow the error
    }
  }
};

const convertSearchParamsToString = (searchParams: any): string => {
  const queryString = Object.entries(searchParams)
    .filter(([_, value]) => value !== undefined && value !== '' && value !== false)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&');
  
  return queryString;
};

export const searchJobs = async (queryParams?: any): Promise<GetJobsResponse> => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in session storage");
    }

    const head = {
      headers: {
        Authorization: `${token}`, // Add the JWT token to the Authorization header
      }
    };
    const query = convertSearchParamsToString(queryParams)
    console.log(`http://localhost:5400/api/searchjobs?${query}`);
    const url = `http://localhost:5400/api/searchjobs?${query}`
    console.log(url);
    const res: AxiosResponse = await axios.get(
      url,
      head
    );
    if (res.status === 200) {
      return res;
    } else {
      throw new Error("Failed to fetch all jobs");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error); // Log any Axios errors
      throw error.response?.status; // Rethrow the error
    } else {
      console.error("Other Error:", error); // Log other types of errors
      throw error; // Rethrow the error
    }
  }
};


export const getJobData = async (id: string): Promise<GetJobsResponse> => {
  try {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in session storage");
    }

    const config = {
      headers: {
        Authorization: `${token}`, // Add the JWT token to the Authorization header
      },
    };

    const res: AxiosResponse = await axios.get(
      `http://localhost:5400/api/jobdetails/${id}`,
      config
    );
    if (res.status === 200) {
      return res;
    } else {
      throw new Error(`Failed to fetch job details for ID ${id}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error); // Log any Axios errors
      throw error.response?.status; // Rethrow the error
    } else {
      console.error("Other Error:", error); // Log other types of errors
      throw error; // Rethrow the error
    }
  }
};
