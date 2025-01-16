import { URLSearchParams } from "url";

export async function POST(request: Request) {
    const body = await request.text(); // Read the raw body as a string
    const params = new URLSearchParams(body); // Parse the URL-encoded string
    const refresh_token = params.get("refresh_token");

    if (!refresh_token) {
        return new Response("Refresh token is required", { status: 400 });
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
          }).toString(),
        });
      
        const contentType = tokenResponse.headers.get("content-type");
        console.log("Response Content-Type:", contentType);
      
        // Check if content type is JSON
        if (contentType && contentType.includes("application/json")) {
          const tokenData = await tokenResponse.json();
          console.log("Token Data:", tokenData);
      
          if (tokenResponse.ok) {
            return new Response(JSON.stringify(tokenData), { status: 200 });
          } else {
            return new Response(JSON.stringify(tokenData), { status: 400 });
          }
        } else {
          // Read as text if not JSON
          const rawBody = await tokenResponse.text();
          console.error("Unexpected Response Body:", rawBody);
          return new Response("Unexpected response format", { status: 500 });
        }
      } catch (error) {
        console.error("Error refreshing Spotify token:", error);
        return new Response("Something went wrong", { status: 500 });
      }
}