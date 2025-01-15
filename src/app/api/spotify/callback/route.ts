export async function POST(request: Request) {
    const { code } = await request.json(); // Get the authorization code from the request body

    if (!code) {
        return new Response("Authorization code is required", { status: 400 });
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:3000/api/spotify/callback';

    try {
        // Exchange code for an access token
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri
            }).toString(),
        });
    
        const tokenData = await tokenResponse.json();
    
        if (tokenResponse.ok) {
            console.log("Token Data:", tokenData);
            return new Response(JSON.stringify(tokenData), { status: 200 });
        } else {
            console.error("Token Error:", tokenData);
            return new Response(JSON.stringify(tokenData), { status: 400 });
        }
    } catch (error) {
        console.error("Error exchanging Spotify code:", error);
        return new Response("Something went wrong", { status: 500 });
    }
}