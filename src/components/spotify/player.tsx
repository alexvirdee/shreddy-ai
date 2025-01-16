import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
    const [player, setPlayer] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    // Fetch Spotify Access Token from backend
    useEffect(() => {
        // const fetchToken = async () => {
        //     try {
        //         const response = await fetch("/api/spotify"); // Backend handles token refresh logic
        //         if (response.ok) {
        //             const data = await response.json();
        //             setToken(data.access_token);
        //         } else {
        //             console.error("Failed to fetch Spotify access token");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching Spotify token:", error);
        //     }
        // };

        // fetchToken();

        setToken('BQBTYNBKxCK9CtEMDg4QvxN0x545-Hsu1vuxwo6CDf17A5TsqJTWVTPS9is5OltegKkX6SLmv0uepsuB0Mwg0KhO4qsZd6-_2bhHzRD8ty9UvGFhSFBC2qnefLjGqjRppoc89QGkrJIBxDaiyWl-T5tllreWQryYJU5hmWd460FZc39VOOhUjaN3mUPTKtKKZKG3_UMK')
    }, []);

    // Log the token to verify
    useEffect(() => {
        if (token) {
            console.log("Spotify access token received:", token);
        }
    }, [token]);

    // Initialize Spotify Web Playback SDK
    useEffect(() => {
        if (!token) return;

        // Define global callback
        window.onSpotifyWebPlaybackSDKReady = () => {
            const spotifyPlayer = new window.Spotify.Player({
                name: "Shreddy's Web Player",
                getOAuthToken: (cb: (token: string) => void) => cb(token),
                volume: 0.5,
            });

            setPlayer(spotifyPlayer);

            spotifyPlayer.connect();

            spotifyPlayer.addListener("ready", async ({ device_id }: any) => {
                console.log("Spotify Player ready with Device ID:", device_id);

                // Start playback with backend
                try {
                    const response = await fetch("/api/spotify/play", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ device_id }),
                    });

                    if (!response.ok) {
                        console.error("Error starting playback:", await response.json());
                    } else {
                        console.log("Playback started!");
                    }
                } catch (error) {
                    console.error("Error playing track:", error);
                }
            });

            spotifyPlayer.addListener("not_ready", ({ device_id }: any) => {
                console.error("Spotify Player Not Ready", device_id);
            });
        };

        // Inject SDK script if not loaded
        const existingScript = document.getElementById("spotify-player-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "spotify-player-script";
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [token]);

    return (
        <div className="fixed bottom-4 right-4 w-80 h-24 bg-gray-800 text-white rounded-lg shadow-lg flex items-center justify-center">
            <span>🎸 Trampled Under Foot - Led Zeppelin</span>
        </div>
    );
}