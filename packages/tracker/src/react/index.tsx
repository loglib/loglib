import React from "react";
import { useEffect } from "react";
import { loglib } from "../lib";
import { Config } from "../types";

interface Props {
  config?: Partial<Config>;
}

function LogLib({ config }: Props) {
  useEffect(() => {
    loglib.record(config);
  }, []);
  return null;
}

export function Track({
  children,
  name,
  payload,
}: {
  children: React.ReactNode;
  name: string;
  payload?: Record<string, string>;
}) {
  return (
    <>
      {children}
      <span onClick={() => loglib.track(name, payload)} />
    </>
  );
}
export default LogLib;
