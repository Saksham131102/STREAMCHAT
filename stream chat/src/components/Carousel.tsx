import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import HOD from "../assets/images/hod.avif";
import venom from "../assets/images/venom.avif";
// import venom from "../assets/videos/venom.mp4";
import { Button } from "./ui/button";
import { FaPlay } from "react-icons/fa";
import { IoTv } from "react-icons/io5";
import { Play, Volume2 } from "lucide-react";
import { IoIosInformationCircle } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

const Carousel = () => {
  return (
    <>
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
        .swiper-pagination-bullet {
          background-color: white;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper bg-[#2a2a2a] rounded-lg aspect-[21/9]"
      >
        <SwiperSlide>
          <img src={venom} alt="venon:the last dance" className="w-full" />
          <div className="absolute z-2 bottom-5 md:bottom-10 lg:bottom-20 left-5 md:left-10 lg:left-20 w-full font-poppins">
            {/* Movie name */}
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white mb-1 md:mb-3">
              Venom: The last dance
            </h1>

            {/* play and information buttons */}
            <div className="flex justify-between items-center w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-10rem)]">
              <div className="flex gap-3 items-center">
                <Button className="bg-white flex max-sm:h-7 items-center gap-1 md:gap-2 text-sm md:text-lg lg:text-xl transition-all duration-300 hover:bg-[#c7c7c7]">
                  <div className="">
                    <FaPlay />
                  </div>
                  <div>Play</div>
                </Button>
                <Button className="bg-white flex max-sm:h-7 items-center gap-1 md:gap-2 text-sm md:text-lg lg:text-xl transition-all duration-300 hover:bg-[#c7c7c7]">
                  <div className="">
                    <IoTv />
                  </div>
                  <div>Room</div>
                </Button>
                <IoIosInformationCircle className="text-2xl md:text-4xl text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 p-2 bg-black rounded-lg">
                <Play className="w-4 md:w-5 text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
                <Separator orientation="vertical" className="bg-white h-5" />
                <Volume2 className="w-4 md:w-5 text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img src={HOD} alt="House of the Dragon" className="w-full" />
          <div className="absolute z-2 bottom-5 md:bottom-10 lg:bottom-20 left-5 md:left-10 lg:left-20 w-full font-poppins">
            {/* Movie name */}
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white mb-1 md:mb-3">
              House of the Dragon
            </h1>

            {/* play and information buttons */}
            <div className="flex justify-between items-center w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-10rem)]">
              <div className="flex gap-3 items-center">
                <Button className="bg-white flex max-sm:h-7 items-center gap-1 md:gap-2 text-sm md:text-lg lg:text-xl transition-all duration-300 hover:bg-[#c7c7c7]">
                  <div className="">
                    <FaPlay />
                  </div>
                  <div>Play</div>
                </Button>
                <Button className="bg-white flex max-sm:h-7 items-center gap-1 md:gap-2 text-sm md:text-lg lg:text-xl transition-all duration-300 hover:bg-[#c7c7c7]">
                  <div className="">
                    <IoTv />
                  </div>
                  <div>Room</div>
                </Button>
                <IoIosInformationCircle className="text-2xl md:text-4xl text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 p-2 bg-black rounded-lg">
                <Play className="w-4 md:w-5 text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
                <Separator orientation="vertical" className="bg-white h-5" />
                <Volume2 className="w-4 md:w-5 text-white transition-all duration-300 hover:text-[#c7c7c7] cursor-pointer" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
