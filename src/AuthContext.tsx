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
  userData: string | null;
  setUserData: (userData: any | null) => void;
  userChangedObservable: boolean | null;
  updateUser: (callback?: Function) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userData, setUserData] = useState<any | null>({});
  const [userChangedObservable, setUserChangedObservable] = useState<
    any | null
  >(false);

  const updateUser = (callback: Function | undefined) => {
    setUserChangedObservable(true);
    if (callback) callback();
    setUserChangedObservable(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        userChangedObservable,
        updateUser,
      }}
    >
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
