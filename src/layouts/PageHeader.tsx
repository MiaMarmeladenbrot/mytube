import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/Logo.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSideBarContext } from "../contexts/SideBarContext";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <header className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* Logo */}
      <PageHeaderLogo hidden={showFullWidthSearch} />

      {/* SearchForm */}
      <form
        className={`${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }  gap-4 flex-grow justify-center`}
      >
        {/* Back-Btn */}
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            size={"icon"}
            variant={"ghost"}
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}

        {/* SearchBar */}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="search"
            className="border border-secondary-border shadow-inner shadow-secondary rounded-l-full py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        {/* Mic-Btn */}
        <Button size={"icon"} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      {/* Icons */}
      <div className={`${showFullWidthSearch ? "hidden" : "flex"} flex-shrink-0 md:gap-2`}>
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>

        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>

        <Button size="icon" variant="ghost">
          <Upload />
        </Button>

        <Button size="icon" variant="ghost">
          <Bell />
        </Button>

        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </header>
  );
}

type PageHeaderLogoProps = {
  hidden?: boolean;
};

export function PageHeaderLogo({ hidden = false }: PageHeaderLogoProps) {
  const { toggle } = useSideBarContext();

  return (
    <div className={`${hidden ? "hidden" : "flex"} gap-4 items-center flex-shrink-0`}>
      <Button onClick={toggle} variant={"ghost"} size={"icon"}>
        <Menu />
      </Button>

      <a href="/">
        <img src={logo} alt="" className="h-5" />
      </a>
    </div>
  );
}
