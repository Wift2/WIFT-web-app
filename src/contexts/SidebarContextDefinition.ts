import { createContext } from 'react';

interface SidebarContextType {
  isMini: boolean;
  setIsMini: (mini: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);
