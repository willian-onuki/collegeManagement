import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAlert } from './Alert';

interface Props {
  children: React.ReactNode;
}

export interface DataProps {
  name: string;
  token: string;
  authenticated: boolean;
}

interface SignInResponse {
  data: DataProps;
}

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  signIn: (credentials: Credentials) => void;
  signUp: (credentials: Credentials) => void;
  signOut: () => void;
  data: DataProps;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: Props) => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [data, setData] = useState<DataProps>({} as DataProps);

  const signIn = async (credentials: Credentials) => {
    try {
      const { data } = await api.post<SignInResponse>(
        '/user/signin',
        credentials
      );
      if (data) {
        setData(data.data);
        localStorage.setItem('data', JSON.stringify(data.data));
        navigate('/');
      }
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Erro nas credenciais',
      });
    }
  };

  const signUp = async (credentials: Credentials) => {
    try {
      const { data } = await api.post('/user/signup', credentials);

      if (data) {
        navigate('/sign-in');
      }
    } catch (error) {
      alert('erro nas credenciais');
    }
  };

  const signOut = () => {
    localStorage.removeItem('data');
    navigate('/sign-in');
  };

  useEffect(() => {
    const init = async () => {
      const res = localStorage.getItem('data');
      const dataInfo: DataProps = res
        ? (JSON.parse(res) as DataProps)
        : ({} as DataProps);

      if (dataInfo) {
        setData(dataInfo);
        navigate('/');
      } else {
        localStorage.removeItem('data');
        navigate('/sign-in');
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
