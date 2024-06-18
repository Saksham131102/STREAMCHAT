import { createContext, useContext, useEffect, useState } from "react";

interface IUser {
  _id: string;
  fullname: string;
  username: string;
  profilePic: string;
}
interface AuthContextType {
  authUser: IUser;
  setAuthUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const INITIAL_STATE = {
  authUser: {
    _id: "",
    fullname: "",
    username: "",
    profilePic: "",
  },
  setAuthUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<IUser>(INITIAL_STATE.authUser);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
