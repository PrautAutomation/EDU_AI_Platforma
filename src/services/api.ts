import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }
}

export const apiService = new ApiService();

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiService.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string; role: string }) =>
    apiService.post('/auth/register', userData),
  logout: () => apiService.post('/auth/logout'),
  refreshToken: () => apiService.post('/auth/refresh'),
  forgotPassword: (email: string) => apiService.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    apiService.post('/auth/reset-password', { token, password }),
};

export const subjectsApi = {
  getAll: () => apiService.get('/subjects'),
  getById: (id: string) => apiService.get(`/subjects/${id}`),
  create: (data: any) => apiService.post('/subjects', data),
  update: (id: string, data: any) => apiService.put(`/subjects/${id}`, data),
  delete: (id: string) => apiService.delete(`/subjects/${id}`),
  uploadMaterial: (id: string, file: File, onProgress?: (progress: number) => void) =>
    apiService.uploadFile(`/subjects/${id}/materials`, file, onProgress),
};

export const learningBlocksApi = {
  getBySubject: (subjectId: string) => apiService.get(`/subjects/${subjectId}/blocks`),
  getById: (id: string) => apiService.get(`/blocks/${id}`),
  create: (data: any) => apiService.post('/blocks', data),
  update: (id: string, data: any) => apiService.put(`/blocks/${id}`, data),
  delete: (id: string) => apiService.delete(`/blocks/${id}`),
  generateScenario: (blockId: string, studentId: string) =>
    apiService.post(`/blocks/${blockId}/generate-scenario`, { studentId }),
};

export const gameApi = {
  getGameState: (studentId: string) => apiService.get(`/game/state/${studentId}`),
  updateGameState: (studentId: string, state: any) =>
    apiService.put(`/game/state/${studentId}`, state),
  submitAnswer: (activityId: string, answer: any) =>
    apiService.post(`/game/activities/${activityId}/answer`, { answer }),
  getAchievements: (studentId: string) => apiService.get(`/game/achievements/${studentId}`),
  getLeaderboard: (subjectId?: string) => apiService.get('/game/leaderboard', { subjectId }),
};

export const analyticsApi = {
  getStudentAnalysis: (studentId: string) => apiService.get(`/analytics/student/${studentId}`),
  getClassAnalysis: (classId: string) => apiService.get(`/analytics/class/${classId}`),
  getLearningStyleAnalysis: (studentId: string) =>
    apiService.get(`/analytics/learning-style/${studentId}`),
  getPerformancePrediction: (studentId: string) =>
    apiService.get(`/analytics/prediction/${studentId}`),
  getRiskAnalysis: (studentId: string) => apiService.get(`/analytics/risks/${studentId}`),
};

export const testsApi = {
  generateTest: (blockId: string, studentId: string, options?: any) =>
    apiService.post(`/tests/generate`, { blockId, studentId, ...options }),
  submitTest: (testId: string, answers: any[]) =>
    apiService.post(`/tests/${testId}/submit`, { answers }),
  getTestResults: (studentId: string, blockId?: string) =>
    apiService.get(`/tests/results/${studentId}`, { blockId }),
  getTestById: (testId: string) => apiService.get(`/tests/${testId}`),
};