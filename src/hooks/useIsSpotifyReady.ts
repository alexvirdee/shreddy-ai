"use client";

import { useEffect, useState } from "react";

const useIsSpotifyReady = ()=>{
    const [isReady, setIsReady] = useState(false)
   
    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            setIsReady(true)
          };
    }, [])
    
    return isReady
   }

export default useIsSpotifyReady;