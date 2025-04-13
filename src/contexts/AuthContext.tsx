import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, LoginCredentials, LoginResponse } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: LoginResponse['user'] | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = authService.getUser();
    console.log('Stored user on mount:', storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Attempting login with credentials:', credentials);
      const response = await authService.login(credentials);
      console.log('Login successful, response:', response);
      
      if (!response.token || !response.user) {
        throw new Error('Réponse invalide du serveur');
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      
      if (response.user.role === 'admin' || response.user.role === 'super_admin') {
        console.log('User is admin, redirecting to dashboard');
        navigate('/admin/dashboard');
        toast.success('Connexion réussie');
      } else {
        console.log('User is not admin, logging out');
        authService.logout();
        throw new Error('Accès non autorisé. Vous n\'avez pas les droits d\'administration nécessaires.');
      }
    } catch (error) {
      console.error('Login error in context:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    authService.logout();
    setUser(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 