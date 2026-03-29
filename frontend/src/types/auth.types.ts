export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  educationLevel?: string;
  ageRange?: string;
  city?: string;
  goal?: string;
  language?: string;
  hasCompletedTest?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  mergeUser: (patch: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
