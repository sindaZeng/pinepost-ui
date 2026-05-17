import * as React from "react";
import { cn } from "../lib/cn";
import type { PinepostSize } from "./types";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: PinepostSize;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "md", ...props }, ref) => (
    <input ref={ref} className={cn("pinepost-input", `pinepost-input--${inputSize}`, className)} {...props} />
  )
);

Input.displayName = "Input";
