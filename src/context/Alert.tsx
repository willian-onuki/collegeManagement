import { Text } from '@chakra-ui/react';
import { createContext, useCallback, useContext } from 'react';
import { ToastContainer, toast} from 'react-toastify';

interface AlertContextProps {
  children: React.ReactNode;
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning';
  title?: string;
  message?: string;
}

interface AlertProviderProps {
  showAlert: (props: AlertProps) => void;
}

const AlertContext = createContext<AlertProviderProps>({} as AlertProviderProps);

export const AlertProvider = ({ children }: AlertContextProps) => {
  const msg = useCallback(
    (props: AlertProps) => (
      <>
        <Text fontWeight='bold'>{props.title}</Text>
        <Text>{props.message}</Text>
      </>
    ),
    []
  );

  const showAlert = (props: AlertProps) => {
    const show = {
      success: () => toast.success(msg(props)),
      error: () => toast.error(msg(props)),
      warning: () => toast.warning(msg(props)),
    };

    return show[props.type]();
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginTop: '78px',
        }}
      />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  return context;
};
