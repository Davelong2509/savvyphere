"use client";

import { Reveal } from "@/components/Reveal";

export default function SectionReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  variant = "up",
  once = true,
  amount = 0.1,
  duration = 0.82,
  ...rest
}) {
  return (
    <Reveal
      as={as}
      className={className}
      delay={delay}
      duration={duration}
      variant={variant}
      once={once}
      amount={amount}
      {...rest}
    >
      {children}
    </Reveal>
  );
}
