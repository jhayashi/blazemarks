import { type Evolu } from "@evolu/common";
import { EvoluProvider } from "@evolu/react";
import { FC, ReactNode } from "react";

export const Providers: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Evolu<any>;
  children: ReactNode;
}> = ({ value, children }) => {
  return <EvoluProvider value={value}>{children}</EvoluProvider>;
};
