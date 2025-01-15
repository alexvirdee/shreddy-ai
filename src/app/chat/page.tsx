"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

type Message = {
    sender: 'user' | 'shreddy'; // Restrict sender to these values
    text: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to the chat
        const newMessage: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);

        // Clear the input field
        setInput("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            // Add Shreddy's response to the chat
            const shreddyMessage: Message = { sender: 'shreddy', text: data.reply };
            setMessages((prev) => [...prev, shreddyMessage]);
        } catch (error) {
            console.error("Error communicating with shreddy", error);
        }
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            Chat system here
        </div>
    )
}