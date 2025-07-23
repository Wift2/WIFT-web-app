import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { SidebarContext } from './SidebarContextDefinition';

export const SidebarProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isMini, setIsMini] = useState(false);

  return (
    <SidebarContext.Provider value={{ isMini, setIsMini }}>
      {children}
    </SidebarContext.Provider>
  );
};
