import { api } from '@/lib/api';
import { clearTokens, getRefreshToken, setTokens } from '@/lib/authTokens';

export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  async register(name: string, email: string, password: string): Promise<AuthUser> {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
    setTokens(data.accessToken, data.refreshToken);
    return data.user;
  },

  async login(email: string, password: string, rememberMe = false): Promise<AuthUser> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password, rememberMe });
    setTokens(data.accessToken, data.refreshToken);
    return data.user;
  },

  async me(): Promise<AuthUser> {
    const { data } = await api.get<AuthUser>('/auth/me');
    return data;
  },

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } finally {
      clearTokens();
    }
  },
};
