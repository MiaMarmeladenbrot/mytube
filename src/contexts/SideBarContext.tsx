import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

type SideBarProviderProps = {
  children: ReactNode;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

export function useSideBarContext() {
  const value = useContext(SideBarContext);
  if (value == null) throw new Error("Cannot use outside of SideBarProvider");

  return value;
}

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen(!isSmallOpen);
    } else {
      setIsLargeOpen(!isLargeOpen);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SideBarContext.Provider value={{ isLargeOpen, isSmallOpen, toggle, close }}>
      {children}
    </SideBarContext.Provider>
  );
}
