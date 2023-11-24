import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for token on component mount (page refresh)
    const storedToken = localStorage.getItem("authorization");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
