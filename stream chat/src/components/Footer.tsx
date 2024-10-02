import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer text-[#ababab] items-center px-32 pb-5 max-sm:px-10 bg-[#2a2a2a] font-poppins">
      <aside className="items-center grid-flow-col">
        <p>Copyright © 2024 - streamchat</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://www.linkedin.com/in/saksham131102/" target="_blank">
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a href="https://github.com/Saksham131102/STREAMCHAT" target="_blank">
          <FaGithub className="w-6 h-6" />
        </a>
        <a href="mailto:saksham00013@gmail.com">
          <IoMdMail className="w-6 h-6" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
