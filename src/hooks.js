import { useState, useEffect, useRef } from 'react'

// Usage
//
// function App() {
//     const [hoverRef, isHovered] = useHover();
//     return <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;
// }
// Hook
export function useHover() {
    const [value, setValue] = useState(false);
    const ref = useRef(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener("mouseover", handleMouseOver);
                node.addEventListener("mouseout", handleMouseOut);
                return () => {
                    node.removeEventListener("mouseover", handleMouseOver);
                    node.removeEventListener("mouseout", handleMouseOut);
                };
            }
        },
        // [ref.current] // Recall only if ref changes
    );
    return [ref, value];
}

export function useScreenHeight() {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenHeight(window.innerHeight)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenHeight;
}

export function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenWidth;
}

export function useScreenOrientation() {
    const [orientation, setOrientation] = useState(window.screen.orientation.type)

    useEffect(() => {
        const handleOrientationChange = () => setOrientation(window.screen.orientation.type)
        window.addEventListener('orientationchange', handleOrientationChange)
        return () => window.removeEventListener('orientationchange', handleOrientationChange)
    }, []);

    return orientation;
}