"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  sender: "user" | "lakshmi";
  timestamp: Date;
}

// Type definitions for Speech Recognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: any) => any) | null;
  onerror: ((this: SpeechRecognition, ev: any) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface LakshmiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardType?: "user" | "manager";
  showWelcome?: boolean; // Only show welcome if this is true
}

export const LakshmiChatbot: React.FC<LakshmiChatbotProps> = ({
  isOpen,
  onClose,
  dashboardType = "user",
  showWelcome = false,
}) => {
  const router = useRouter();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Lakshmi, your AI voice assistant. You can type or speak to me. Try saying 'open messages' or 'how many properties are listed'?",
      sender: "lakshmi",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [permissionShown, setPermissionShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const processMessageRef = useRef<((message: string) => void) | null>(null);

  const addMessage = (sender: "user" | "lakshmi", text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  };

  const handleProcessMessage = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    let response = "";
    let action: (() => void) | null = null;

    // Base path based on dashboard type
    const basePath = dashboardType === "manager" ? "/manager/dashboard" : "/user/dashboard";

    // Navigation commands
    if (
      lowerMessage.includes("open messages") ||
      lowerMessage.includes("go to messages") ||
      lowerMessage.includes("show messages") ||
      lowerMessage.includes("check messages") ||
      lowerMessage.includes("view messages") ||
      lowerMessage.includes("messages page")
    ) {
      response = "Opening messages page for you.";
      action = () => {
        router.push(`${basePath}/messages`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open dashboard") ||
      lowerMessage.includes("go to dashboard") ||
      lowerMessage.includes("show dashboard")
    ) {
      response = "Opening dashboard for you.";
      action = () => {
        router.push(basePath);
        onClose();
      };
    } else if (
      dashboardType === "manager" && (
        lowerMessage.includes("open properties") ||
        lowerMessage.includes("go to properties") ||
        lowerMessage.includes("show properties") ||
        lowerMessage.includes("manage properties")
      )
    ) {
      response = "Opening properties page for you.";
      action = () => {
        router.push(`${basePath}/properties`);
        onClose();
      };
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open browse") ||
        lowerMessage.includes("go to browse") ||
        lowerMessage.includes("show properties") ||
        lowerMessage.includes("browse properties")
      )
    ) {
      response = "Opening browse properties page for you.";
      action = () => {
        router.push(`${basePath}/browse`);
        onClose();
      };
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open saved") ||
        lowerMessage.includes("go to saved") ||
        lowerMessage.includes("show saved") ||
        lowerMessage.includes("saved properties")
      )
    ) {
      response = "Opening saved properties page for you.";
      action = () => {
        router.push(`${basePath}/favorites`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open applications") ||
      lowerMessage.includes("go to applications") ||
      lowerMessage.includes("show applications") ||
      lowerMessage.includes("my applications") ||
      lowerMessage.includes("application")
    ) {
      response = dashboardType === "manager" 
        ? "Opening applications management page for you."
        : "Opening applications page for you.";
      action = () => {
        router.push(`${basePath}/applications`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open appointments") ||
      lowerMessage.includes("go to appointments") ||
      lowerMessage.includes("show appointments") ||
      lowerMessage.includes("appointment")
    ) {
      if (dashboardType === "manager") {
        response = "Opening appointments page for you.";
        action = () => {
          router.push(`${basePath}/appointments`);
          onClose();
        };
      } else {
        response = "Opening viewings page for you.";
        action = () => {
          router.push(`${basePath}/viewings`);
          onClose();
        };
      }
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open viewings") ||
        lowerMessage.includes("go to viewings") ||
        lowerMessage.includes("show viewings")
      )
    ) {
      response = "Opening viewings page for you.";
      action = () => {
        router.push(`${basePath}/viewings`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open leads") ||
      lowerMessage.includes("go to leads") ||
      lowerMessage.includes("show leads") ||
      lowerMessage.includes("leads and clients")
    ) {
      if (dashboardType === "manager") {
        response = "Opening leads and clients page for you.";
        action = () => {
          router.push(`${basePath}/leads`);
          onClose();
        };
      }
    } else if (
      lowerMessage.includes("open analytics") ||
      lowerMessage.includes("go to analytics") ||
      lowerMessage.includes("show analytics") ||
      lowerMessage.includes("check analytics") ||
      lowerMessage.includes("check the analytics") ||
      lowerMessage.includes("view analytics")
    ) {
      if (dashboardType === "manager") {
        response = "Opening analytics page for you.";
        action = () => {
          router.push(`${basePath}/analytics`);
          onClose();
        };
      } else {
        response = "Opening analysis page for you.";
        action = () => {
          router.push(`${basePath}/analysis`);
          onClose();
        };
      }
    } else if (
      lowerMessage.includes("open billing") ||
      lowerMessage.includes("go to billing") ||
      lowerMessage.includes("show billing")
    ) {
      if (dashboardType === "manager") {
        response = "Opening billing page for you.";
        action = () => {
          router.push(`${basePath}/billing`);
          onClose();
        };
      } else {
        response = "Opening payments page for you.";
        action = () => {
          router.push(`${basePath}/payments`);
          onClose();
        };
      }
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open payments") ||
        lowerMessage.includes("go to payments") ||
        lowerMessage.includes("show payments")
      )
    ) {
      response = "Opening payments page for you.";
      action = () => {
        router.push(`${basePath}/payments`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open profile") ||
      lowerMessage.includes("go to profile") ||
      lowerMessage.includes("show profile")
    ) {
      response = "Opening profile page for you.";
      action = () => {
        router.push(`${basePath}/profile`);
        onClose();
      };
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open ai picks") ||
        lowerMessage.includes("go to ai picks") ||
        lowerMessage.includes("show ai picks")
      )
    ) {
      response = "Opening AI picks page for you.";
      action = () => {
        router.push(`${basePath}/ai-picks`);
        onClose();
      };
    } else if (
      lowerMessage.includes("open services") ||
      lowerMessage.includes("go to services") ||
      lowerMessage.includes("show services")
    ) {
      response = "Opening services page for you.";
      action = () => {
        router.push(`${basePath}/services`);
        onClose();
      };
    } else if (
      dashboardType === "user" && (
        lowerMessage.includes("open reviews") ||
        lowerMessage.includes("go to reviews") ||
        lowerMessage.includes("show reviews")
      )
    ) {
      response = "Opening reviews page for you.";
      action = () => {
        router.push(`${basePath}/reviews`);
        onClose();
      };
    }
    // Property count queries
    else if (
      lowerMessage.includes("how many properties") ||
      lowerMessage.includes("number of properties") ||
      lowerMessage.includes("total properties") ||
      lowerMessage.includes("properties listed") ||
      lowerMessage.includes("count properties") ||
      lowerMessage.includes("how many properties are listed") ||
      lowerMessage.includes("what is the number of properties") ||
      lowerMessage.includes("total number of properties")
    ) {
      if (dashboardType === "manager") {
        const totalProperties = 6; // Based on manager properties
        response = `You currently have ${totalProperties} properties listed. You can manage them from the Properties page. Would you like me to open it?`;
      } else {
        const totalProperties = 6; // Based on featured properties shown
        response = `There are currently ${totalProperties} featured properties listed on the platform. You can browse all properties, check AI picks for personalized recommendations, or view your saved properties.`;
      }
    }
    // Greetings
    else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      response = dashboardType === "manager"
        ? "Hello! How can I assist you today? You can ask me to open any page, check property counts, view applications, appointments, or ask questions about the platform."
        : "Hello! How can I assist you today? You can ask me to open any page, check property counts, or ask questions about the platform.";
    }
    // Property search
    else if (
      lowerMessage.includes("property") ||
      lowerMessage.includes("search") ||
      lowerMessage.includes("find")
    ) {
      response = dashboardType === "manager"
        ? "I can help you manage properties! You can view all your properties, add new ones, or manage existing listings. Would you like me to open the properties page?"
        : "I can help you find properties! You can browse all properties, use AI Picks for personalized recommendations, or check your saved properties. Would you like me to open any of these sections?";
    }
    // Applications
    else if (
      lowerMessage.includes("application") ||
      lowerMessage.includes("apply") ||
      lowerMessage.includes("applied")
    ) {
      response = dashboardType === "manager"
        ? "You can review and manage all property applications. Would you like me to open the applications page?"
        : "You can view and track all your property applications. Would you like me to open the applications page?";
    }
    // Appointments/Viewings
    else if (
      lowerMessage.includes("viewing") ||
      lowerMessage.includes("schedule") ||
      lowerMessage.includes("tour") ||
      lowerMessage.includes("appointment")
    ) {
      if (dashboardType === "manager") {
        response = "You can manage all appointments and viewings. Would you like me to open the appointments page?";
      } else {
        response = "To schedule a viewing, go to a property's details page and click 'Schedule Viewing'. Would you like me to open the viewings page?";
      }
    }
    // Payments/Billing
    else if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("pay") ||
      lowerMessage.includes("bill") ||
      lowerMessage.includes("billing")
    ) {
      response = dashboardType === "manager"
        ? "You can manage billing and invoices. Would you like me to open the billing page?"
        : "You can manage all your payments and bills. Would you like me to open the payments page?";
    }
    // Saved properties (user only)
    else if (
      dashboardType === "user" && (
        lowerMessage.includes("saved") ||
        lowerMessage.includes("favorite") ||
        lowerMessage.includes("bookmark")
      )
    ) {
      response = "Your saved properties are in the 'Saved Properties' section. Would you like me to open it?";
    }
    // Help
    else if (
      lowerMessage.includes("help") ||
      lowerMessage.includes("support") ||
      lowerMessage.includes("question")
    ) {
      response =
        "I'm here to help! You can ask me to open pages, check property counts, or ask questions about the platform. What would you like to know?";
    }
    // Default response
    else {
      response =
        "I understand you're asking about: " +
        userMessage +
        ". I can help you navigate to different pages, check property information, or answer questions. Try saying 'open messages' or 'how many properties are listed'?";
    }

    // Add user message
    addMessage("user", userMessage);

    // Show typing indicator
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      setIsTyping(false);
      const lakshmiMessage = addMessage("lakshmi", response);

      // Speak the response
      speak(response);

      // Execute action if any (navigation)
      if (action) {
        // Give user time to hear the response before navigating
        setTimeout(() => {
          action();
        }, 1500);
      }
    }, 800);
  };

  // Store the function reference
  useEffect(() => {
    processMessageRef.current = handleProcessMessage;
  }, [router, onClose]);

  // Initialize speech recognition - only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.trim();
          setInputMessage(transcript);
          setIsListening(false);
          
          // Process the voice command
          if (processMessageRef.current && transcript) {
            // Small delay to show the transcript in input field
            setTimeout(() => {
              processMessageRef.current!(transcript);
            }, 100);
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          
          // Only show permission error once
          if (event.error === "not-allowed") {
            if (!permissionShown) {
              setPermissionShown(true);
              addMessage(
                "lakshmi",
                "Please allow microphone access to use voice commands. You can enable it in your browser settings."
              );
            }
          } else if (event.error === "no-speech") {
            // User didn't speak, silently ignore
            return;
          } else if (event.error === "aborted") {
            // User stopped, silently ignore
            return;
          } else {
            // Other errors - only show once
            if (!permissionShown && event.error !== "network") {
              setPermissionShown(true);
              addMessage(
                "lakshmi",
                "Voice recognition encountered an error. Please try again or use text input."
              );
            }
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }

      synthRef.current = window.speechSynthesis;
      
      // Load voices when they become available (some browsers load voices asynchronously)
      const loadVoices = () => {
        // Voices are now loaded, they will be available in the speak function
        if (synthRef.current) {
          const voices = synthRef.current.getVoices();
          console.log('Available voices loaded:', voices.length);
        }
      };
      
      // Some browsers load voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Try to load voices immediately (may not work in all browsers)
      loadVoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Welcome message - only show when showWelcome prop is true (first login for new users)
  useEffect(() => {
    if (isOpen && showWelcome && !hasWelcomed) {
      const dashboardName = dashboardType === "manager" ? "manager dashboard" : "user dashboard";
      const welcomeMessage = `Welcome to the ${dashboardName}, and I'm here to assist in all your steps, just one click I'm right for you to help. Thanks have a great day.`;
      
      // Clear existing messages and add welcome message
      setMessages([
        {
          id: Date.now().toString(),
          text: welcomeMessage,
          sender: "lakshmi",
          timestamp: new Date(),
        },
      ]);
      
      // Speak the welcome message
      setTimeout(() => {
        speak(welcomeMessage);
      }, 800);
      
      setHasWelcomed(true);
    }
  }, [isOpen, showWelcome, hasWelcomed, dashboardType]);

  const speak = (text: string) => {
    if (synthRef.current) {
      // Stop any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices and select a female professional voice
      const voices = synthRef.current.getVoices();
      let selectedVoice = null;
      
      // Prefer female voices with professional-sounding names
      const preferredVoiceNames = [
        'Samantha', // macOS
        'Karen', // macOS
        'Victoria', // macOS
        'Google UK English Female', // Chrome
        'Microsoft Zira - English (United States)', // Windows
        'Microsoft Hazel - English (Great Britain)', // Windows
        'Google US English Female', // Chrome
        'Alex', // macOS (can be female)
      ];
      
      // Try to find a preferred voice (check by name first, then verify it's female)
      for (const voiceName of preferredVoiceNames) {
        const voice = voices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes(voiceName.toLowerCase());
        });
        if (voice) {
          // Check if it's explicitly female or has a female name
          const name = voice.name.toLowerCase();
          if (name.includes('female') || 
              name.includes('samantha') || 
              name.includes('karen') || 
              name.includes('victoria') ||
              name.includes('zira') ||
              name.includes('hazel')) {
            selectedVoice = voice;
            break;
          }
        }
      }
      
      // If no preferred voice found, look for any female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => {
          const name = voice.name.toLowerCase();
          return name.includes('female') ||
                 name.includes('samantha') ||
                 name.includes('karen') ||
                 name.includes('victoria') ||
                 name.includes('zira') ||
                 name.includes('hazel') ||
                 name.includes('susan') ||
                 name.includes('linda');
        });
      }
      
      // If still no voice found, try to find a voice that sounds female
      if (!selectedVoice && voices.length > 0) {
        // Filter voices that might be female (common female voice names)
        const possibleFemaleVoices = voices.filter(voice => {
          const name = voice.name.toLowerCase();
          return name.includes('samantha') || 
                 name.includes('karen') || 
                 name.includes('victoria') ||
                 name.includes('zira') ||
                 name.includes('hazel') ||
                 name.includes('susan') ||
                 name.includes('linda') ||
                 name.includes('female');
        });
        
        if (possibleFemaleVoices.length > 0) {
          selectedVoice = possibleFemaleVoices[0];
        } else {
          // Fallback: use first available voice and adjust pitch/rate to sound more female
          selectedVoice = voices[0];
        }
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      
      // Adjust voice parameters for professional female voice
      utterance.rate = 0.92; // Slightly slower for professional, clear tone
      utterance.pitch = selectedVoice && (selectedVoice.name.toLowerCase().includes('female') || 
                                         selectedVoice.name.toLowerCase().includes('samantha') ||
                                         selectedVoice.name.toLowerCase().includes('karen') ||
                                         selectedVoice.name.toLowerCase().includes('victoria') ||
                                         selectedVoice.name.toLowerCase().includes('zira') ||
                                         selectedVoice.name.toLowerCase().includes('hazel')) 
                         ? 1.0  // Natural pitch for actual female voices
                         : 1.2; // Higher pitch if using fallback voice to sound more female
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        addMessage(
          "lakshmi",
          "Voice recognition is not available. Please use text input."
        );
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    handleProcessMessage(inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
        {/* Header */}
        <div className="bg-[#FF7700] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Lakshmi</h3>
              <p className="text-xs text-white/80">AI Voice Assistant</p>
            </div>
            {isListening && (
              <div className="ml-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs">Listening...</span>
              </div>
            )}
            {isSpeaking && (
              <div className="ml-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs">Speaking...</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-[#FF7700] text-white"
                    : "bg-white text-gray-900 shadow-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 shadow-sm rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title={isListening ? "Stop listening" : "Start voice input - Click and speak your command"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or click mic to speak..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-[#FF7700] text-white px-4 py-2 rounded-lg hover:bg-[#FF7700]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Try saying: &quot;open messages&quot;, &quot;how many properties are listed&quot;, or
            &quot;go to dashboard&quot;
          </p>
        </div>
      </div>
  );
};
