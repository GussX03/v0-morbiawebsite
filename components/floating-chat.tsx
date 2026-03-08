"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, RotateCcw, Bot } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

const generateSessionId = () => "morbia_" + Math.random().toString(36).slice(2, 11)

export default function FloatingChat() {
  const [sessionId, setSessionId] = useState(generateSessionId)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Hide greeting bubble when chat opens
      setShowGreeting(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Show greeting bubble after 3 seconds if chat hasn't been opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const payload = { id: sessionId, mensaje: trimmed }
    console.log("[v0] Sending to n8n:", payload)

    try {
      const response = await fetch(
        "https://n8n.morbia.com.mx/webhook/4fc39209-5fb5-46ba-9877-f54a40c5404e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      console.log("[v0] Response status:", response.status, response.statusText)

      const text = await response.text()
      console.log("[v0] Raw response text:", text)

      let reply = ""

      try {
        const json = JSON.parse(text)
        console.log("[v0] Parsed JSON:", json)
        reply =
          json.output ||
          json.message ||
          json.respuesta ||
          json.text ||
          json.reply ||
          (typeof json === "string" ? json : JSON.stringify(json))
      } catch {
        console.log("[v0] Response is plain text, not JSON")
        reply = text
      }

      console.log("[v0] Final reply:", reply)
      const assistantMessage: Message = { role: "assistant", content: reply }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.log("[v0] Fetch error:", err)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ocurrió un error al conectar con el asistente. Por favor intenta de nuevo.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetConversation = () => {
    setMessages([])
    setSessionId(generateSessionId())
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting bubble */}
      {showGreeting && !isOpen && (
        <div className="relative max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-gray-800 border border-[#17a993]/40 text-gray-200 text-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-xl leading-relaxed">
            <span className="text-[#61e59c] font-semibold">¡Hola!</span> Soy el asistente inteligente de Morbia. ¿En qué puedo ayudarte?
          </div>
          <button
            onClick={() => setShowGreeting(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar saludo"
          >
            <X size={10} />
          </button>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[360px] max-h-[560px] flex flex-col rounded-2xl border border-[#17a993]/30 bg-gray-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center shadow-md flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Asistente Morbia</p>
                <p className="text-[#61e59c] text-xs">Siempre disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetConversation}
                title="Reiniciar conversación"
                className="p-1.5 rounded-lg text-gray-400 hover:text-[#61e59c] hover:bg-gray-700/60 transition-all duration-200"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/60 transition-all duration-200"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[320px] max-h-[400px]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#17a993]/20 to-[#2c5b8b]/20 border border-[#17a993]/30 flex items-center justify-center">
                  <Image
                    src="/images/main-logo.png"
                    alt="Morbia"
                    width={80}
                    height={28}
                    className="w-10 h-auto"
                  />
                </div>
                <p className="text-gray-400 text-sm text-center leading-relaxed px-4">
                  ¡Hola! Soy el asistente inteligente de Morbia. Escribe tu mensaje para comenzar.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#17a993] to-[#2c5b8b] text-white rounded-tr-sm"
                      : "bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:0ms]"></span>
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-gray-800/80 border-t border-gray-700">
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 focus-within:border-[#17a993]/60 transition-colors duration-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-gray-200 text-sm placeholder-gray-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                aria-label="Enviar mensaje"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">Powered by Morbia AI</p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center shadow-lg hover:shadow-[#17a993]/30 hover:scale-105 transition-all duration-300"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>
    </div>
  )
}
