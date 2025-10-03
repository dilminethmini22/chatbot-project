import React, { useState, useRef, useEffect } from "react";
import { model } from "../gemini";
import { Link } from "react-router-dom";
import {
    Search,
    Plus,
    Send,
    Settings,
    User,
    Bot,
    MoreVertical,
    LogOut,
    Mic,
    MicOff,
    Paperclip,
    Image,
    FileText,
    X,
    History
} from "lucide-react";


function Chatbot() {
    const [message, setMessage] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [chatMode, setChatMode] = useState("primary"); // "primary" or "temporary"
    const [showRecentHistory, setShowRecentHistory] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "bot",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            timestamp: "10:30 AM"
        }
    ]);

    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);
    const chatMessagesRef = useRef(null);

    // Recent 1 month chat history for current chat area
    const recentChatHistory = [
        {
            id: 1,
            title: "AI Development Discussion",
            lastMessage: "Thanks for the explanation!",
            time: "2 hours ago",
            date: "Today",
            messages: [
                { id: 1, type: "bot", content: "Hello! How can I help with AI development?", timestamp: "2:30 PM" },
                { id: 2, type: "user", content: "Can you explain neural networks?", timestamp: "2:31 PM" },
                { id: 3, type: "bot", content: "Neural networks are computing systems inspired by biological neural networks...", timestamp: "2:31 PM" },
                { id: 4, type: "user", content: "Thanks for the explanation!", timestamp: "2:35 PM" }
            ]
        },
        {
            id: 2,
            title: "React Components Help",
            lastMessage: "Perfect, that works!",
            time: "Yesterday",
            date: "Yesterday",
            messages: [
                { id: 1, type: "bot", content: "Hi! Need help with React?", timestamp: "3:15 PM" },
                { id: 2, type: "user", content: "How do I use useState hook?", timestamp: "3:16 PM" },
                { id: 3, type: "bot", content: "useState is a React Hook that lets you add state to functional components...", timestamp: "3:16 PM" },
                { id: 4, type: "user", content: "Perfect, that works!", timestamp: "3:20 PM" }
            ]
        },
        {
            id: 3,
            title: "Database Optimization",
            lastMessage: "Query performance improved",
            time: "3 days ago",
            date: "July 23, 2025",
            messages: [
                { id: 1, type: "user", content: "My database queries are slow", timestamp: "1:00 PM" },
                { id: 2, type: "bot", content: "Let's optimize those queries. What type of database are you using?", timestamp: "1:01 PM" },
                { id: 3, type: "user", content: "PostgreSQL with large tables", timestamp: "1:02 PM" },
                { id: 4, type: "bot", content: "For PostgreSQL optimization, consider indexing...", timestamp: "1:02 PM" },
                { id: 5, type: "user", content: "Query performance improved", timestamp: "1:15 PM" }
            ]
        },
        {
            id: 4,
            title: "CSS Grid Layout",
            lastMessage: "Layout looks great now",
            time: "1 week ago",
            date: "July 19, 2025",
            messages: [
                { id: 1, type: "user", content: "Need help with CSS Grid", timestamp: "10:30 AM" },
                { id: 2, type: "bot", content: "CSS Grid is perfect for complex layouts. What are you trying to achieve?", timestamp: "10:31 AM" },
                { id: 3, type: "user", content: "A responsive card layout", timestamp: "10:32 AM" },
                { id: 4, type: "bot", content: "Here's a responsive grid approach...", timestamp: "10:32 AM" },
                { id: 5, type: "user", content: "Layout looks great now", timestamp: "10:45 AM" }
            ]
        },
        {
            id: 5,
            title: "API Integration",
            lastMessage: "Authentication working perfectly",
            time: "2 weeks ago",
            date: "July 12, 2025",
            messages: [
                { id: 1, type: "user", content: "How to integrate third-party APIs?", timestamp: "4:20 PM" },
                { id: 2, type: "bot", content: "API integration depends on the service. What API are you working with?", timestamp: "4:21 PM" },
                { id: 3, type: "user", content: "REST API with OAuth", timestamp: "4:22 PM" },
                { id: 4, type: "bot", content: "For OAuth REST APIs, you'll need to handle authentication...", timestamp: "4:22 PM" },
                { id: 5, type: "user", content: "Authentication working perfectly", timestamp: "4:35 PM" }
            ]
        }
    ];


    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setMessage(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => {
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // Auto-scroll to the latest message
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleVoiceCommand = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        }));
        setUploadedFiles([...uploadedFiles, ...newFiles]);
    };

    const removeFile = (fileId) => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    };

    const handleBackToChat = () => {
        setShowHistory(false);
    };

    const handleTextCommand = (command) => {
        switch (command) {
            case '/clear':
                setMessages([]);
                break;
            case '/export':
                const chatText = messages.map(msg => `[${msg.timestamp}] ${msg.type}: ${msg.content}`).join('\n');
                const blob = new Blob([chatText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chat_export.txt';
                a.click();
                break;
            case '/new':
                setMessages([{
                    id: 1,
                    type: "bot",
                    content: "Hello! I'm your AI assistant. How can I help you today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
                break;
            case '/upload':
                fileInputRef.current?.click();
                break;
            default:
                break;
        }
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            if (message.startsWith('/')) {
                handleTextCommand(message.trim());
                setMessage("");
                return;
            }

            const userMessage = {
                id: messages.length + 1,
                type: "user",
                content: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
            };
            const updatedMessages = [...messages, userMessage];
            setMessages(updatedMessages);
            setMessage("");
            setUploadedFiles([]);

            try {
                const result = await model.generateContent(message);
                const response = await result.response;
                const text = response.text();

                const botResponse = {
                    id: updatedMessages.length + 1,
                    type: "bot",
                    content: text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botResponse]);
            } catch (error) {
                console.error("Error generating content:", error);
                const errorResponse = {
                    id: updatedMessages.length + 1,
                    type: "bot",
                    content: `Error: ${error.message}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, errorResponse]);
            }
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            // Handle logout logic here
            console.log('User logged out');
            // You can redirect to login page or clear user session
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div
            className="flex h-screen overflow-hidden text-white"
            style={{
                background:
                    "linear-gradient(to top left, black 20%, #0b2249 50%, #1e3a8a 75%, #60a5fa 100%)",
            }}
        >
            {/* Left Sidebar */}
            <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col shadow-sm">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold text-white">Conversations</h1>
                        <div className="flex items-center gap-2">
                            <Link
                                to="/History"
                                className="p-2 hover:bg-blue-600 rounded-lg transition-colors group"
                                title="View Chat History"
                            >
                                <History className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </Link>
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <Settings className="w-5 h-5 text-gray-300" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* New Chat Button */}
                <div className="p-4 border-b border-gray-700">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium">
                        <Plus className="w-4 h-4" />
                        New Conversation
                    </button>
                </div>

                {/* Current Chat Info */}
                <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                    {/* Chat Mode Toggle */}
                    <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-white">Chat Mode</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${chatMode === 'primary' ? 'text-blue-400' : 'text-gray-400'}`}>
                                    Primary
                                </span>
                                <button
                                    onClick={() => setChatMode(chatMode === 'primary' ? 'temporary' : 'primary')}
                                    className={`relative w-10 h-5 rounded-full transition-colors ${chatMode === 'primary' ? 'bg-blue-600' : 'bg-gray-600'
                                        }`}
                                >
                                    <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${chatMode === 'primary' ? 'translate-x-0.5' : 'translate-x-5'
                                        }`} />
                                </button>
                                <span className={`text-xs ${chatMode === 'temporary' ? 'text-orange-400' : 'text-gray-400'}`}>
                                    Temporary
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">
                            {chatMode === 'primary'
                                ? '💾 Conversations will be saved to database'
                                : '🔒 Temporary mode - conversations won\'t be saved'
                            }
                        </p>
                    </div>

                    {/* Recent History Toggle */}
                    <div className="mb-4">
                        <button
                            onClick={() => setShowRecentHistory(!showRecentHistory)}
                            className="flex items-center justify-between w-full p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg border border-gray-700 transition-colors"
                        >
                            <span className="text-sm font-medium text-white">Recent Chats (1 Month)</span>
                            <div className={`transform transition-transform ${showRecentHistory ? 'rotate-180' : 'rotate-0'}`}>
                                <div className="w-4 h-4 text-gray-400">▼</div>
                            </div>
                        </button>
                    </div>

                    {/* Recent Chat History */}
                    {showRecentHistory && (
                        <div className="flex-1 overflow-y-auto space-y-3">
                            {recentChatHistory.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="p-3 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer transition-colors group"
                                    onClick={() => setMessages(chat.messages)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-white text-sm truncate mb-1 group-hover:text-blue-400 transition-colors">
                                                {chat.title}
                                            </h3>
                                            <p className="text-xs text-gray-300 truncate mb-1">
                                                {chat.lastMessage}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs text-gray-400">{chat.time}</p>
                                                <span className="text-xs text-gray-500">•</span>
                                                <p className="text-xs text-gray-500">{chat.messages.length} messages</p>
                                            </div>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all">
                                            <MoreVertical className="w-3 h-3 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!showRecentHistory && (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <Bot className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                                <p className="text-sm font-medium text-gray-300 mb-1">Current Chat Session</p>
                                <p className="text-xs">
                                    {chatMode === 'primary'
                                        ? 'Your conversation will be saved'
                                        : 'Temporary mode - not saved'
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Chat Area */}
            <div className="flex-1 flex flex-col bg-transparent backdrop-blur-sm">
                {/* Regular Chat View */}
                <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center overflow-hidden">
                                    <Bot className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white">AI Assistant</h2>
                                    <div className="text-sm text-green-400 flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        Online
                                    </div>
                                </div>
                            </div>
                            {/* Chat Mode Indicator */}
                            <div className="flex items-center gap-2">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${chatMode === 'primary'
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                                    }`}>
                                    {chatMode === 'primary' ? '💾 Primary' : '🔒 Temporary'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-200'
                                    }`}>
                                    {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={`max-w-2xl ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                    <div className={`inline-block p-4 rounded-2xl ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-md'
                                        : 'bg-gray-800 text-gray-100 rounded-bl-md'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                                        {msg.files && msg.files.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {msg.files.map((file) => (
                                                    <div key={file.id} className="flex items-center gap-2 text-xs bg-black/20 rounded p-2">
                                                        {file.type.startsWith('image/') ? (
                                                            <Image className="w-4 h-4" />
                                                        ) : (
                                                            <FileText className="w-4 h-4" />
                                                        )}
                                                        <span className="truncate">{file.name}</span>
                                                        <span className="text-gray-300">({formatFileSize(file.size)})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 px-1">{msg.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-700 bg-gray-900/30 backdrop-blur-sm">
                        <div className="max-w-4xl mx-auto">
                            {/* File Upload Preview */}
                            {uploadedFiles.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {uploadedFiles.map((file) => (
                                        <div key={file.id} className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2 text-sm">
                                            {file.type.startsWith('image/') ? (
                                                <Image className="w-4 h-4 text-blue-400" />
                                            ) : (
                                                <FileText className="w-4 h-4 text-green-400" />
                                            )}
                                            <span className="truncate max-w-32">{file.name}</span>
                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-end gap-3 bg-gray-800/50 border border-gray-600 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-3 py-2 text-white placeholder-gray-400 resize-none focus:outline-none bg-transparent"
                                />

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    multiple
                                    accept="image/*,.pdf,.doc,.docx,.txt,.json,.csv"
                                    className="hidden"
                                />

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
                                    title="Upload files"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={handleVoiceCommand}
                                    className={`p-2 rounded-lg transition-colors ${isListening
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title={isListening ? "Stop recording" : "Start voice input"}
                                >
                                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                </button>

                                <button
                                    onClick={handleSendMessage}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50"
                                    disabled={!message.trim() && uploadedFiles.length === 0}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 text-center mt-2">
                                Press Enter to send • Click mic for voice input • AI Assistant can make mistakes
                            </p>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}

export default Chatbot;
