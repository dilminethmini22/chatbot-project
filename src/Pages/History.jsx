import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, FileText, Mic, MessageCircle, Filter } from "lucide-react";

function History() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("all");

    // Categorized history data
    const chatHistory = {
        document: [
            { id: 1, title: "PDF Analysis Report", lastMessage: "Document analysis complete", time: "2 hours ago", date: "Today", type: "document" },
            { id: 2, title: "Contract Review", lastMessage: "Key terms highlighted", time: "Yesterday", date: "Yesterday", type: "document" },
            { id: 3, title: "Research Paper Summary", lastMessage: "Main findings extracted", time: "2 days ago", date: "July 24, 2025", type: "document" },
            { id: 4, title: "Financial Report Analysis", lastMessage: "Budget discrepancies noted", time: "1 week ago", date: "July 19, 2025", type: "document" },
            { id: 5, title: "Technical Documentation", lastMessage: "API specifications reviewed", time: "2 weeks ago", date: "July 12, 2025", type: "document" }
        ],
        voice: [
            { id: 6, title: "Project Status Update", lastMessage: "All tasks on schedule", time: "3 hours ago", date: "Today", type: "voice" },
            { id: 7, title: "Meeting Notes Dictation", lastMessage: "Action items recorded", time: "Yesterday", date: "Yesterday", type: "voice" },
            { id: 8, title: "Quick Code Review", lastMessage: "Implementation approved", time: "3 days ago", date: "July 23, 2025", type: "voice" },
            { id: 9, title: "Design Feedback Session", lastMessage: "UI improvements suggested", time: "1 week ago", date: "July 19, 2025", type: "voice" },
            { id: 10, title: "Strategy Discussion", lastMessage: "Market approach defined", time: "2 weeks ago", date: "July 11, 2025", type: "voice" }
        ],
        chat: [
            { id: 11, title: "AI Development Discussion", lastMessage: "Thanks for the explanation!", time: "1 hour ago", date: "Today", type: "chat" },
            { id: 12, title: "Technical Questions", lastMessage: "How does React work?", time: "Yesterday", date: "Yesterday", type: "chat" },
            { id: 13, title: "Code Debugging Help", lastMessage: "Issue resolved successfully", time: "2 days ago", date: "July 24, 2025", type: "chat" },
            { id: 14, title: "Learning JavaScript", lastMessage: "Concepts are clearer now", time: "1 week ago", date: "July 19, 2025", type: "chat" },
            { id: 15, title: "Database Optimization", lastMessage: "Query performance improved", time: "2 weeks ago", date: "July 12, 2025", type: "chat" },
            { id: 16, title: "Security Best Practices", lastMessage: "Vulnerabilities addressed", time: "3 weeks ago", date: "July 5, 2025", type: "chat" }
        ]
    };

    // Combine all history for filtering
    const allHistory = [...chatHistory.document, ...chatHistory.voice, ...chatHistory.chat]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const getFilteredHistory = () => {
        if (activeFilter === "all") return allHistory;
        return chatHistory[activeFilter] || [];
    };

    const getIconForType = (type) => {
        switch (type) {
            case "document": return <FileText className="w-4 h-4" />;
            case "voice": return <Mic className="w-4 h-4" />;
            case "chat": return <MessageCircle className="w-4 h-4" />;
            default: return <MessageCircle className="w-4 h-4" />;
        }
    };

    const getColorForType = (type) => {
        switch (type) {
            case "document": return "text-green-400";
            case "voice": return "text-purple-400";
            case "chat": return "text-blue-400";
            default: return "text-gray-400";
        }
    };

    const filteredHistory = getFilteredHistory();
    const groupedByDate = {};

    filteredHistory.forEach(chat => {
        if (!groupedByDate[chat.date]) {
            groupedByDate[chat.date] = [];
        }
        groupedByDate[chat.date].push(chat);
    });

    return (
        <div
            className="flex h-screen text-white"
            style={{
                background:
                    "linear-gradient(to top left, black 20%, #0b2249 50%, #1e3a8a 75%, #60a5fa 100%)",
            }}
        >
            <div className="flex-1 flex flex-col bg-transparent backdrop-blur-sm">
                <div className="flex flex-col h-full">
                    {/* History Header */}
                    <div className="p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => window.history.back()}
                                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <div className="w-5 h-5 text-gray-300">←</div>
                                </button>
                                <h2 className="text-xl font-semibold text-white">Chat History</h2>
                            </div>
                            <p className="text-sm text-gray-400">{filteredHistory.length} conversations</p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Filter className="w-4 h-4 text-gray-400 mr-2" />
                            {[
                                { key: "all", label: "All", icon: null, count: allHistory.length },
                                { key: "document", label: "Documents", icon: <FileText className="w-4 h-4" />, count: chatHistory.document.length },
                                { key: "voice", label: "Voice", icon: <Mic className="w-4 h-4" />, count: chatHistory.voice.length },
                                { key: "chat", label: "Chat", icon: <MessageCircle className="w-4 h-4" />, count: chatHistory.chat.length }
                            ].map(filter => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${activeFilter === filter.key
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                                        }`}
                                >
                                    {filter.icon}
                                    {filter.label}
                                    <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded">
                                        {filter.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* History Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-4xl mx-auto space-y-6">
                            {Object.entries(groupedByDate).map(([date, chats]) => (
                                <div key={date} className="space-y-3">
                                    <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                                        {date}
                                    </h3>
                                    <div className="grid gap-3">
                                        {chats.map(chat => (
                                            <div
                                                key={chat.id}
                                                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/70 cursor-pointer transition-colors group"
                                                onClick={() => navigate("/chatbot")}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={getColorForType(chat.type)}>
                                                                {getIconForType(chat.type)}
                                                            </span>
                                                            <h4 className="font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                                                                {chat.title}
                                                            </h4>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full ${chat.type === "document" ? "bg-green-900/50 text-green-300" :
                                                                chat.type === "voice" ? "bg-purple-900/50 text-purple-300" :
                                                                    "bg-blue-900/50 text-blue-300"
                                                                }`}>
                                                                {chat.type}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-300 truncate mb-2">
                                                            {chat.lastMessage}
                                                        </p>
                                                        <p className="text-xs text-gray-400">{chat.time}</p>
                                                    </div>
                                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all">
                                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {filteredHistory.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-lg mb-2">No conversations found</div>
                                    <div className="text-gray-500 text-sm">Try selecting a different filter</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
