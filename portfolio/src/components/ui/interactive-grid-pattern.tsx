"use client";

import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    squares?: [number, number];
    className?: string;
    squaresClassName?: string;
    delay?: number;
}

export function InteractiveGridPattern({
                                           width = 30,
                                           height = 30,
                                           squares = [40, 30],
                                           className,
                                           squaresClassName,
                                           delay = 700,
                                           ...props
                                       }: InteractiveGridPatternProps) {
    const [cols, setCols] = useState(squares[0]);
    const [rows, setRows] = useState(squares[1]);
    const [activeSquares, setActiveSquares] = useState<Record<number, boolean>>({});

    // 🧠 Cập nhật tự động khi window resize
    useEffect(() => {
        const updateGrid = () => {
            const newCols = Math.ceil(window.innerWidth / width);
            const newRows = Math.ceil(window.innerHeight / height);
            setCols(newCols);
            setRows(newRows);
        };
        updateGrid();
        window.addEventListener("resize", updateGrid);
        return () => window.removeEventListener("resize", updateGrid);
    }, [width, height]);

    const handleEnter = (index: number) => {
        setActiveSquares((prev) => ({...prev, [index]: true}));
    };

    const handleLeave = (index: number) => {
        setTimeout(() => {
            setActiveSquares((prev) => ({...prev, [index]: false}));
        }, delay);
    };

    return (
        <svg
            width={width * cols}
            height={height * rows}
            className={cn("absolute inset-0 h-full w-full", className)}
            {...props}
        >
            {Array.from({length: cols * rows}).map((_, index) => {
                const x = (index % cols) * width;
                const y = Math.floor(index / cols) * height;
                const isActive = activeSquares[index];

                return (
                    <rect
                        key={index}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={{
                            stroke: "var(--pattern-color)",
                            fill: isActive ? "var(--pattern-color)" : "transparent",
                            transition: "fill 0.8s ease-in-out",
                        }}
                        className={cn("pointer-events-auto", squaresClassName)}
                        onMouseEnter={() => handleEnter(index)}
                        onMouseLeave={() => handleLeave(index)}
                    />
                );
            })}
        </svg>
    );
}