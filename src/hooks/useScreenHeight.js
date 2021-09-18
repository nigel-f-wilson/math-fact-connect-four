import { useState, useEffect } from 'react'


export function useScreenHeight() {
    const [screenHeight, setScreenHeight] = useState(window.screen.availHeight)

    useEffect(() => {
        const handleScreenSizeChange = () => setScreenHeight(window.screen.availHeight)
        window.addEventListener('resize', handleScreenSizeChange)
        return () => window.removeEventListener('resize', handleScreenSizeChange)
    }, []);

    return screenHeight;
}