import type { Sprinkles } from "../styles/sprinkles.css";
import { sprinkles } from '../styles/sprinkles.css';

type BoxProps = {
    children: React.ReactNode;
    className?: string;
} & Sprinkles;

export function Box({ children, className, ...styleProps }: BoxProps) {
    // Only pass styleProps to sprinkles, not className
    const sprinkleClass = sprinkles(styleProps);
    return <div className={className ? `${sprinkleClass} ${className}` : sprinkleClass}>{children}</div>;
}