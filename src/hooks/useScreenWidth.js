import { useState, useEffect } from 'react'


export function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenWidth;
}