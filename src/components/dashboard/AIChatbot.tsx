
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant for the Employee Management System. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickAccessQuestions = [
    "What are the company policies?",
    "Who is my reporting manager or team lead?",
    "How do I update my personal or bank details?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContent = async (prompt: string) => {
    try {
      setIsLoading(true);
      
      const apiKey = 'AIzaSyBJ_mkG3GH4gNvEzbolC0Z4H4Q-A_hduwA';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an expert in Employee Management Systems (EMS). Use the following context to answer any question related to EMS: 

An Employee Management System (EMS) is software that automates HR tasks like employee onboarding, attendance tracking, payroll, performance reviews, and task assignment. It includes modules such as:

1. Core HR: employee profiles, onboarding/offboarding, role assignments, document storage.
2. Attendance: biometric/QR check-in, leave request workflows, shift planning.
3. Payroll: automated salary calculation, tax deductions, slip generation.
4. Performance: goal/KPI tracking, 360-degree reviews.
5. Communication: announcements, feedback forms, HR chatbot.
6. Analytics: real-time dashboards, custom reports.

HR stands for Human Resources, which manages employee lifecycle: hiring, payroll, leave, policies, conflict resolution.

AI in EMS is used for automating tasks, handling employee queries via chatbots, analyzing trends (e.g., attrition), and smart resume screening.

Example questions it can answer:
- What are must-have features in an EMS?
- How does AI help in HR?
- What does the HR chatbot do?
- What's the structure of EMS database?
- What frontend pages are needed for EMS?

Now, answer the following query: ${prompt}`
              }
            ]
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not process your request.';
      
      return botResponse;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'I apologize, but I am experiencing some technical difficulties. Please try again later.';
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate bot response
    const botResponse = await generateContent(text);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      <Card className="w-96 h-[500px] shadow-2xl border-0 bg-white dark:bg-gray-900">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
              <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[440px]">
          {/* Quick Access Buttons */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
            <div className="space-y-2">
              {quickAccessQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(question)}
                  className="w-full text-left justify-start h-auto py-2 px-3 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about employee management..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbot;
