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

    // Load messages from localStorage on mount
    useEffect(() => {
        const storedMessages = localStorage.getItem("shreddyChatMessages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("shreddyChatMessages", JSON.stringify(messages));
    }, [messages])

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
        <div className="mx-auto mt-6 bg-white text-black p-6 rounded-lg border border-gray-300 w-full md:w-[440px] h-[348px] md:h-[634px] flex flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto pr-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} my-2`}
                    >
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="rounded-full bg-gray-100 border p-1">
                                {message.sender === "user" ? (
                                    <svg stroke="none" fill="black" strokeWidth="0"
                                        viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                                        </path>
                                    </svg>
                                ) : (
                                    <svg stroke="none" fill="black" strokeWidth="1.5"
                                        viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                        </path>
                                    </svg>
                                )}
                            </div>
                            {/* Message Text */}
                            <div>
                                <p className="font-bold text-gray-700">
                                    {message.sender === "user" ? "You" : "Shreddy"}
                                </p>
                                <p className="text-gray-600 text-sm">{message.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>

            {isTyping && <p className="text-sm text-gray-500 mt-2">Shreddy is typing...</p>}

            {/* Input Field */}
            <div className="mt-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                    className="flex items-center gap-2"
                >
                    <Input
                        className="flex-1 "
                        placeholder="Ask Shreddy something..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                        Send
                    </Button>
                </form>
                {messages.length > 0 && (
                    <Button
                        className="mt-4 bg-red-600 hover:bg-red-700 w-full"
                        onClick={() => {
                            setMessages([]);
                            localStorage.removeItem("shreddyChatMessages");
                        }}
                    >
                        Clear Chat
                    </Button>
                )}
            </div>
        </div>
    )
}