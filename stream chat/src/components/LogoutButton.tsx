import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
  };

  return (
    <Button
      className="bg-[#dd0808] rounded-md hover:bg-[#C30A0A]"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <span className="text-white text-lg">Logout</span>
      )}
    </Button>
  );
};

export default LogoutButton;
