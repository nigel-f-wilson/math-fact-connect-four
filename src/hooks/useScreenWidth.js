import { useState, useEffect } from 'react'


export function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.screen.availWidth)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenWidth(window.screen.availWidth)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenWidth;
}