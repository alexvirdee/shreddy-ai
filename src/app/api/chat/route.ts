import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_SECRET'], // This is the default and can be omitted
});

export async function GET(request: Request) {
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-4o',
        });

        // Return the response from OpenAI
        return new Response(JSON.stringify(chatCompletion), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response('Something went wrong!', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}