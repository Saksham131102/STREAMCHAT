import links from "@/NavigationLinks";

interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const NameAndNavigations = ({ active, setActive }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold ">
        <span className="text-[#ababab]">Stream</span>
        <span className="text-[#dd0808]">Chat</span>
      </h1>

      {links.map((link) => (
        <h2
          key={link.name}
          onClick={() => {
            if (active !== link.name) {
              setActive(link.name);
            }
          }}
          className={`text-[#ababab] text-md cursor-pointer ${
            active === link.name ? "underline" : ""
          }`}
        >
          {link.name}
        </h2>
      ))}
    </div>
  );
};

export default NameAndNavigations;
