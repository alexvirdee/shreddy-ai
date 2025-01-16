declare global {
    interface Window {
      Spotify: any; // Use `any` for simplicity or define more specific types if needed
      onSpotifyWebPlaybackSDKReady: any;
    }
  }
  
export {};