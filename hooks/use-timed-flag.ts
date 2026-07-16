import { useEffect, useState } from "react";

export function useTimedFlag(timeoutMs = 2500) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => setActive(false), timeoutMs);
    return () => clearTimeout(timeout);
  }, [active, timeoutMs]);

  return [active, setActive] as const;
}
