import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Search, User, Clock, Paperclip, Phone, Video, Smile, Image, FileText, CheckCheck, Check, MoreVertical, Trash2, Edit2, Copy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getConversations, getMessages, sendMessage } from '../../lib/mockData';

const MessagingView = () => {
  const { user, userProfile } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate random online users
    const interval = setInterval(() => {
      const randomOnline = {};
      conversations.forEach(conv => {
        randomOnline[conv.userId] = Math.random() > 0.5;
      });
      setOnlineUsers(randomOnline);
    }, 10000);
    return () => clearInterval(interval);
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = () => {
    const convs = getConversations(user.id);
    setConversations(convs);
  };

  const loadMessages = (otherUserId) => {
    const msgs = getMessages(user.id, otherUserId);
    setMessages(msgs);
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && attachedFiles.length === 0) || !selectedConversation) return;

    if (editingMessage) {
      // Update existing message
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessage.id ? { ...msg, content: newMessage.trim(), edited: true } : msg
      ));
      setEditingMessage(null);
    } else {
      // Send new message
      const messageData = {
        content: newMessage.trim(),
        attachments: attachedFiles
      };
      sendMessage(user.id, selectedConversation.userId, newMessage.trim());
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
    
    setNewMessage('');
    setAttachedFiles([]);
    setShowEmojiPicker(false);
    loadMessages(selectedConversation.userId);
    loadConversations();
  };

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type
    }));
    setAttachedFiles(prev => [...prev, ...fileData]);
  };

  const removeAttachment = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setNewMessage(message.content);
  };

  const handleDeleteMessage = (messageId) => {
    if (confirm('Delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    alert('Message copied to clipboard!');
  };

  const insertEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const emojis = ['😀', '😂', '🤣', '😊', '😍', '🥰', '😎', '🤔', '👍', '👏', '🙌', '💪', '🔥', '✨', '🎉', '❤️', '👋', '🤝', '💼', '🎯', '📝', '✅', '⭐', '💡'];

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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
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
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {conversation.user?.full_name?.[0] || '?'}
                          </div>
                          {onlineUsers[conversation.userId] && (
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
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
                <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedConversation.user?.full_name?.[0] || '?'}
                        </div>
                        {onlineUsers[selectedConversation.userId] && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConversation.user?.full_name || 'Unknown User'}</h3>
                        <p className="text-sm text-gray-600">
                          {onlineUsers[selectedConversation.userId] ? (
                            <span className="text-green-600 flex items-center">
                              <span className="w-2 h-2 bg-green-600 rounded-full mr-1 animate-pulse"></span>
                              Online
                            </span>
                          ) : (
                            <span className="capitalize">{selectedConversation.user?.role || 'User'}</span>
                          )}
                        </p>
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
                    messages.map((message, index) => {
                      const isOwn = message.senderId === user.id;
                      const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex items-end space-x-2 group ${isOwn ? 'justify-end flex-row-reverse space-x-reverse' : 'justify-start'}`}
                        >
                          {/* Avatar */}
                          {!isOwn && (
                            <div className={`w-8 h-8 ${showAvatar ? 'visible' : 'invisible'}`}>
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                {selectedConversation.user?.full_name?.[0] || '?'}
                              </div>
                            </div>
                          )}

                          {/* Message Bubble */}
                          <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                            <div
                              className={`relative px-4 py-3 rounded-2xl ${
                                isOwn
                                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-sm'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                              } shadow-sm hover:shadow-md transition-shadow`}
                            >
                              <p className="text-sm break-words">{message.content}</p>
                              {message.edited && (
                                <span className={`text-xs italic ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                                  (edited)
                                </span>
                              )}
                              <div className={`flex items-center justify-between mt-1 space-x-2`}>
                                <p className={`text-xs ${
                                  isOwn ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {formatTime(new Date(message.timestamp))}
                                </p>
                                {isOwn && (
                                  <div className="flex items-center space-x-0.5">
                                    {message.read ? (
                                      <CheckCheck className="w-3 h-3 text-blue-200" />
                                    ) : (
                                      <Check className="w-3 h-3 text-blue-200" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Message Actions */}
                            <div className={`opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center space-x-1`}>
                              <button
                                onClick={() => handleCopyMessage(message.content)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                title="Copy"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              {isOwn && (
                                <>
                                  <button
                                    onClick={() => handleEditMessage(message)}
                                    className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(message.id)}
                                    className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {selectedConversation.user?.full_name?.[0] || '?'}
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200/50">
                  {/* Editing Indicator */}
                  {editingMessage && (
                    <div className="mb-3 flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm text-blue-700">
                        <Edit2 className="w-4 h-4" />
                        <span>Editing message</span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingMessage(null);
                          setNewMessage('');
                        }}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Attached Files Preview */}
                  {attachedFiles.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {attachedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg text-sm"
                        >
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{file.name}</span>
                          <span className="text-gray-500 text-xs">({file.size})</span>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end space-x-3">
                    {/* File Attachment */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileAttach}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Attach files"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Emoji Picker */}
                    <div className="relative">
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Add emoji"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                      {showEmojiPicker && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80 max-h-64 overflow-y-auto">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Emoji</h3>
                            <button
                              onClick={() => setShowEmojiPicker(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </button>
                          </div>
                          <div className="grid grid-cols-8 gap-2">
                            {emojis.map((emoji, index) => (
                              <button
                                key={index}
                                onClick={() => insertEmoji(emoji)}
                                className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex-1 relative">
                      <textarea
                        placeholder={editingMessage ? "Edit your message..." : "Type your message..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={1}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none max-h-32"
                        style={{ minHeight: '48px' }}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {newMessage.length}/1000
                      </div>
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() && attachedFiles.length === 0}
                      className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      title={editingMessage ? "Save changes" : "Send message"}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
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