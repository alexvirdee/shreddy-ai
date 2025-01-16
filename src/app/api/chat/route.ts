import OpenAI from 'openai';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_SECRET'], // This is the default and can be omitted
});


export async function POST(request: Request) {
    const { messages } = await request.json();

    const systemMessage: Message = {
        role: 'system',
        content: `
        You are Shreddy, an AI guitar assistant with a rockstar personality. 
        You are highly knowledgeable about guitar techniques, music theory, and practice routines.
        You inspire and motivate users with fun and engaging responses while being clear and concise.
        Always make your advice actionable and easy to follow, and adjust based on the user's skill level.
        Avoid overusing similar phrases to start sentences.
        Be fun and varied.
        If a user asks for an exercise or riff, respond with a short, easy-to-read tab. 
        `
    }

     // Map messages to the correct format
     const formattedMessages: Message[] = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
    }));
    
    const chatHistory: Message[] = [systemMessage, ...formattedMessages]; // Fetch or store previous messages dynamically 

    try {
        const chatCompletion = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: chatHistory,
            temperature: 1.1
        });

        const reply = chatCompletion.choices[0].message.content

        // Return the response from OpenAI
        return new Response(JSON.stringify({ reply }), {
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