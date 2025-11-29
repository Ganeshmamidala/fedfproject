import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Search, User, Clock, Paperclip, Phone, Video } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getConversations, getMessages, sendMessage } from '../../lib/mockData';

const MessagingView = () => {
  const { user, userProfile } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.userId);
    }
  }, [selectedConversation]);

  const loadConversations = () => {
    const convs = getConversations(user.id);
    setConversations(convs);
  };

  const loadMessages = (otherUserId) => {
    const msgs = getMessages(user.id, otherUserId);
    setMessages(msgs);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      sendMessage(user.id, selectedConversation.userId, newMessage.trim());
      setNewMessage('');
      loadMessages(selectedConversation.userId);
      loadConversations();
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-gray-600 mt-2">Communicate with employers and students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No conversations yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start chatting with employers or students</p>
                </div>
              ) : (
                conversations
                  .filter(conv => 
                    conv.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    conv.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((conversation) => (
                    <div
                      key={conversation.userId}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`p-4 border-b border-gray-200/30 cursor-pointer transition-all duration-200 hover:bg-blue-50/50 ${
                        selectedConversation?.userId === conversation.userId ? 'bg-blue-50/70 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {conversation.user?.full_name?.[0] || '?'}
                          </div>
                          {conversation.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conversation.user?.full_name || 'Unknown User'}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatTime(new Date(conversation.lastMessage.timestamp))}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedConversation.user?.full_name?.[0] || '?'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConversation.user?.full_name || 'Unknown User'}</h3>
                        <p className="text-sm text-gray-600 capitalize">{selectedConversation.user?.role || 'User'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => alert('Voice call feature - Coming soon!')}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voice call"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => alert('Video call feature - Coming soon!')}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Video call"
                      >
                        <Video className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.senderId === user.id
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(new Date(message.timestamp))}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200/50">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingView;