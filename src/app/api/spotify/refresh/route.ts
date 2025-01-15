export async function POST(request: Request) {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
        return new Response("Refresh token is required", { status: 400 });
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
        const tokenResponse = await fetch("https://accounts.spotify.com/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token,
              }).toString(),
        })

        const tokenData = await tokenResponse.json();

        if (tokenResponse.ok) {
            return new Response(JSON.stringify(tokenData), { status: 200 });
        } else {
            return new Response(JSON.stringify(tokenData), { status: 400 })
        }
    } catch (error) {
        console.error("Error refreshing Spotify token", error);
        return new Response("Something went wrong", { status: 500 });
    }
}