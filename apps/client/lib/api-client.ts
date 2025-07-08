import { authClient } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class ApiClient {
  private static async getAuthHeaders(): Promise<HeadersInit> {
    const session = await authClient.getSession();
    
    if (!session.data) {
      throw new Error('No active session found');
    }

    return {
      'Authorization': `Bearer ${session.data.session.token}`,
      'Content-Type': 'application/json',
    };
  }

  static async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async post<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async put<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async delete<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// Define the response types
export interface ProfileResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    google_id: string;
    image?: string;
  };
}

export interface ChatGroupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

// Example usage functions with proper types
export const api = {
  // Get user profile
  getProfile: (): Promise<ProfileResponse> => ApiClient.get<ProfileResponse>('/api/profile'),
  
  // Create chat group
  createChatGroup: (data: { title: string; passcode: string }): Promise<ChatGroupResponse> => 
    ApiClient.post<ChatGroupResponse>('/api/chat-groups', data),
  
  // Add more API functions as needed
}; 