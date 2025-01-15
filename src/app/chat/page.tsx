"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

type Message = {
    sender: 'user' | 'shreddy'; // Restrict sender to these values
    text: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to the chat
        const newMessage: Message = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);

        // Clear the input field
        setInput("");

        // typing state when Shreddy is replying
        setIsTyping(true);

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
        } finally {
            // Shreddy should be done typing 
            setIsTyping(false);
        }
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto max-h-120 mb-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 scrollbar-track-transparent">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg max-w-xs ${message.sender === "user" ? "bg-blue-600" : "bg-green-600"
                                }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="text-gray-400">Shreddy is typing...</div>}
                <div ref={messagesEndRef} />
            </div>

            {/* Input and send button */}
            <div className="flex items-center space-x-2">
                <Input
                    className="flex-1 bg-gray-700 text-white"
                    placeholder="Ask Shreddy something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                />
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={sendMessage}
                >
                    Send
                </Button>
            </div>
            {messages.length > 0 ? (
                <div className="mt-2">
                    <Button
                        className="bg-red-600 hover:bg-red-700 w-full"
                        onClick={() => setMessages([])}
                    >
                        Clear Chat
                    </Button>
                </div>
            ) : <></>}
        </div>
    )
}