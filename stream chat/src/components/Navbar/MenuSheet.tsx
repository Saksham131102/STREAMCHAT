import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import links from "@/NavigationLinks";

interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const MenuSheet = ({ active, setActive }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side="left" className="text-white font-poppins w-[250px]">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-2xl font-semibold ">
              <span className="text-[#ababab]">Stream</span>
              <span className="text-[#dd0808]">Chat</span>
            </h1>
          </SheetTitle>
          {/* separator */}
          <SheetDescription className="border-b border-[#ababab]"></SheetDescription>
          <div className="mt-10">
            <ul className="flex flex-col gap-3 text-xl">
              {links.map((link) => (
                <li
                  key={link.name}
                  onClick={() => {
                    if (active !== link.name) {
                      setActive(link.name);
                    }
                  }}
                  className={`text-[#ababab] cursor-pointer ${
                    active === link.name ? "underline" : ""
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
