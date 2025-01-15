import OpenAI from 'openai';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_SECRET'], // This is the default and can be omitted
});


export async function POST(request: Request) {
    const { message } = await request.json();

    const systemMessage: Message = {
        role: 'system',
        content: `
        You are Shreddy, an AI guitar assistant with a rockstar personality. 
        You are highly knowledgeable about guitar techniques, music theory, and practice routines.
        You inspire and motivate users with fun and engaging responses while being clear and concise.
        Always make your advice actionable and easy to follow, and adjust based on the user's skill level.
        If a user asks for an exercise or riff, respond with a short, easy-to-read tab. 
        `
    }

    const chatHistory: never[] = []; // Fetch or store previous messages dynamically 

    const messages: Message[] = [
        systemMessage,
        ...chatHistory,
        { role: 'user', content: message }
    ]

    try {
        const chatCompletion = await client.chat.completions.create({
            model: 'gpt-4o',
            messages
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