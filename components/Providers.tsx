import { EvoluProvider } from "@evolu/react";
import { FC, ReactNode } from "react";
import { evolu } from "../lib/Db";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <EvoluProvider value={evolu}>{children}</EvoluProvider>;
};
