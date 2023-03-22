import { AlertProvider } from "./Alert";
import { AuthProvider } from "./Auth";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({children}: Props) {
  return (
    <AlertProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AlertProvider>
  )
}
