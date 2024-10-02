import { Button } from "@/components/ui/button";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen bg-[#2a2a2a] font-poppins"
      // style={{
      //   backgroundImage:
      //     "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      // }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <div className="flex flex-col">
            <h1 className="mb-2 text-5xl font-medium">
              <span className="text-[#ababab]">Stream</span>
              <span className="text-white"> movies</span>
            </h1>
            <h1 className="mb-2 text-5xl font-medium">
              <span className="text-[#dd0808]">Chat</span>
              <span className="text-white"> with friends</span>
            </h1>
          </div>
          <p className="mb-5 mt-2 text-white text-xl">
            The only platform where you can watch movies and chat with your
            friends.
          </p>
          <Link to="/signup">
            <Button className="bg-[#dd0808] gap-1 hover:bg-[#C30A0A]">
              <span className="text-white">Get started</span>
              <span className="text-white text-lg">
                <GoArrowUpRight />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
