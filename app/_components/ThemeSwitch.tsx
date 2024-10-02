"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CgDarkMode } from "react-icons/cg";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button>
        <CgDarkMode />
      </button>
    );

  if (resolvedTheme === "dark") {
    return (
      <button onClick={() => setTheme("light")}>
        <CgDarkMode />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button onClick={() => setTheme("dark")}>
        <CgDarkMode />
      </button>
    );
  }
}
