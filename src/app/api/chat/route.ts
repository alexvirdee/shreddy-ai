export async function GET(request: Request) {
    return new Response('Hello Shreddy!', {
        status: 200,
    });
}