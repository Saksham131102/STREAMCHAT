import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "@/context/authContext";

type SignupProps = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // If useAuthContext is not defined, setAuthUser to null

  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
  }: SignupProps) => {
    if (password !== confirmPassword) {
      toast("Passwords do not match", {
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
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmPassword,
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
  return { loading, signup };
};

export default useSignup;
