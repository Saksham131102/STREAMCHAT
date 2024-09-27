import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import toast from "react-hot-toast";

type LoginProps = {
  username: string;
  password: string;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }: LoginProps) => {
    if (!username || !password) {
      toast("Please enter username and password", {
        icon: "❌",
        style: {
          background: "#7f1e1d",
          color: "#fff",
        },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
      toast(`${error.message}`, {
        icon: "❌",
        style: {
          background: "#7f1e1d",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
