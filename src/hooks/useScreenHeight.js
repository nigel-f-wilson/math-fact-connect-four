import { useState, useEffect } from 'react'


export function useScreenHeight() {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenHeight(window.innerHeight)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenHeight;
}