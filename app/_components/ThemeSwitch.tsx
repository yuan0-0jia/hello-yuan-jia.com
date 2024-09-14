"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CgDarkMode } from "react-icons/cg";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <CgDarkMode />;

  if (resolvedTheme === "dark") {
    return <CgDarkMode onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme === "light") {
    return <CgDarkMode onClick={() => setTheme("dark")} />;
  }
}
