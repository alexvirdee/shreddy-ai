export async function POST(request: Request) {
    const { device_id, access_token } = await request.json();

    if (!device_id || !access_token) {
        return new Response("Device ID and Access Token are required", { status: 400 });
    }

    try {
        const playbackResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer: ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: ["spotify:track:4lPJoKw24HizeIcDLqaWeE"], // "Trampled Under Foot" by Led Zeppelin
            }),
        });

        if (playbackResponse.ok) {
            return new Response("Playback started", { status: 200 });
        } else {
            const errorData = await playbackResponse.json();
            return new Response(JSON.stringify(errorData), { status: 400 });
        }
    } catch (error) {
        console.error("Error starting playback", error);
        return new Response("Something went wrong", { status: 500 });
    }
}