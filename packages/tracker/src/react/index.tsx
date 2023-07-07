import React, { useRef, useState } from "react";
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

export function TrackOnView({
  children,
  name,
  payload,
}: {
  children: React.ReactNode;
  name: string;
  payload?: Record<string, string>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tracked, setTracked] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (tracked) return;
            loglib.track(name, payload);
            setTracked(true);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);
  return (
    <>
      {children}
      <span ref={ref} />
    </>
  );
}
export default LogLib;
