
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastContainer, toast } from 'react-toastify';
import {
  MessageSquare,
  Send,
  X,
  User,
  Bot,
  Clock,
  Minimize2,
  Maximize2
} from "lucide-react";

const LiveChat = ({ isOpen, onClose, ticketId }) => {
//   const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: "welcome-1",
        content: ticketId 
          ? `Hello! I see you're inquiring about ticket ${ticketId}. How can I help you today?`
          : "Hello! Welcome to TrackPro support. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
        senderName: "Support Bot"
      };
      setMessages([welcomeMessage]);
      
      // Simulate connection after a brief delay
      setTimeout(() => {
        setIsConnected(true);
        toast({
          title: "Connected to Support",
          description: "You're now connected to our support team.",
        });
      }, 1500);
    }
  }, [isOpen, ticketId, messages.length, toast]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const customerMessage = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: "customer",
      timestamp: new Date(),
      senderName: "You"
    };

    setMessages(prev => [...prev, customerMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: `agent-${Date.now()}`,
        content: getAutoResponse(newMessage),
        sender: "agent",
        timestamp: new Date(),
        senderName: "Agent Sarah"
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAutoResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("status") || lowerMessage.includes("update")) {
      return "I can help you check the status of your ticket. Let me pull up the latest information for you.";
    }
    if (lowerMessage.includes("problem") || lowerMessage.includes("issue")) {
      return "I understand you're experiencing an issue. Can you provide more details about what specific problem you're encountering?";
    }
    if (lowerMessage.includes("billing") || lowerMessage.includes("payment")) {
      return "For billing inquiries, I'll need to verify some information. Can you please provide your account details?";
    }
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with today?";
    }
    
    return "Thank you for your message. I'm reviewing your inquiry and will provide assistance shortly. Is there any additional information you'd like to share?";
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSenderIcon = (sender) => {
    switch (sender) {
      case 'customer': return <User className="w-4 h-4" />;
      case 'agent': return <MessageSquare className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSenderColor = (sender) => {
    switch (sender) {
      case 'customer': return 'bg-blue-500';
      case 'agent': return 'bg-green-500';
      case 'bot': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 shadow-xl border-2 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
        <CardHeader className="pb-2 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Live Support</span>
              {isConnected && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Online
                </Badge>
              )}
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-80 flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'customer' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center space-x-1 mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${getSenderColor(message.sender)}`}>
                          {getSenderIcon(message.sender)}
                        </div>
                        <span className="text-xs text-gray-500">{message.senderName}</span>
                        <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                      <div className={`p-2 rounded-lg text-sm ${
                        message.sender === 'customer' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-1 mb-1">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                        <MessageSquare className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-gray-500">Agent Sarah is typing...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LiveChat;
