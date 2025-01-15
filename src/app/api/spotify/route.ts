import queryString from 'query-string';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3000/api/spotify/callback';

export async function GET(request: Request) {
    // Build the Spotify oAuth URL
    const authUrl = `https://accounts.spotify.com/authorize?${queryString.stringify({
        response_type: "code",
        client_id,
        redirect_uri,
        scope: "streaming user-read-email user-read-private user-modify-playback-state",
      })}`;

      // Redirect user to Spotify
      return new Response(null, {
        status: 302,
        headers: { Location: authUrl },
      })
}