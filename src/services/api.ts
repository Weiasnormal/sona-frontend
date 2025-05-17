import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error)
  }
)

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export const apiService = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await api.get<ApiResponse<T>>(url)
    return response.data
  },

  post: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    const response = await api.post<ApiResponse<T>>(url, data)
    return response.data
  },

  put: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    const response = await api.put<ApiResponse<T>>(url, data)
    return response.data
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await api.delete<ApiResponse<T>>(url)
    return response.data
  },
} 