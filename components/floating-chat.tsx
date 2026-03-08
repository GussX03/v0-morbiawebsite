"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { MessageCircle, X, Send, RotateCcw, Bot } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

const generateSessionId = () => "morbia_" + Math.random().toString(36).slice(2, 11)

/**
 * Parse basic markdown: **bold**, *italic*, `code`, newlines, and bullet lists.
 * Returns React elements.
 */
function parseMarkdown(text: string): React.ReactNode[] {
  // Split by double newlines first (paragraphs), then handle inline formatting
  const paragraphs = text.split(/\n{2,}/)

  const result: React.ReactNode[] = []

  paragraphs.forEach((paragraph, pIdx) => {
    if (pIdx > 0) {
      result.push(<div key={`br-${pIdx}`} className="h-2" />)
    }

    // Check if it's a bullet list
    const lines = paragraph.split("\n")
    const isList = lines.every(
      (line) => line.trim().startsWith("- ") || line.trim().startsWith("• ") || line.trim().startsWith("* ") || line.trim() === ""
    )

    if (isList && lines.some((l) => l.trim().length > 0)) {
      const listItems = lines
        .filter((l) => l.trim().length > 0)
        .map((line, lIdx) => {
          const content = line.trim().replace(/^[-•*]\s+/, "")
          return (
            <li key={`li-${pIdx}-${lIdx}`} className="flex items-start gap-1.5 py-0.5">
              <span className="text-[#17a993] mt-1 flex-shrink-0 text-xs">●</span>
              <span>{parseInlineMarkdown(content, `${pIdx}-${lIdx}`)}</span>
            </li>
          )
        })
      result.push(
        <ul key={`ul-${pIdx}`} className="space-y-0.5 pl-1">
          {listItems}
        </ul>
      )
    } else {
      // Handle numbered lists
      const isNumberedList = lines.every(
        (line) => /^\d+[.)]\s/.test(line.trim()) || line.trim() === ""
      )

      if (isNumberedList && lines.some((l) => l.trim().length > 0)) {
        const listItems = lines
          .filter((l) => l.trim().length > 0)
          .map((line, lIdx) => {
            const content = line.trim().replace(/^\d+[.)]\s+/, "")
            return (
              <li key={`oli-${pIdx}-${lIdx}`} className="flex items-start gap-1.5 py-0.5">
                <span className="text-[#17a993] font-semibold flex-shrink-0 text-xs min-w-[1rem] text-right">
                  {lIdx + 1}.
                </span>
                <span>{parseInlineMarkdown(content, `${pIdx}-${lIdx}`)}</span>
              </li>
            )
          })
        result.push(
          <ol key={`ol-${pIdx}`} className="space-y-0.5 pl-1">
            {listItems}
          </ol>
        )
      } else {
        // Regular paragraph — handle single newlines as <br>
        const inlineLines = paragraph.split("\n")
        inlineLines.forEach((line, lIdx) => {
          if (lIdx > 0) {
            result.push(<br key={`lbr-${pIdx}-${lIdx}`} />)
          }
          result.push(
            <span key={`line-${pIdx}-${lIdx}`}>
              {parseInlineMarkdown(line, `${pIdx}-${lIdx}`)}
            </span>
          )
        })
      }
    }
  })

  return result
}

function parseInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  // Match **bold**, *italic*, `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[2]) {
      // **bold**
      nodes.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold text-white">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // *italic*
      nodes.push(
        <em key={`${keyPrefix}-i-${match.index}`} className="italic text-gray-300">
          {match[3]}
        </em>
      )
    } else if (match[4]) {
      // `code`
      nodes.push(
        <code
          key={`${keyPrefix}-c-${match.index}`}
          className="bg-gray-700/60 text-[#61e59c] px-1 py-0.5 rounded text-xs font-mono"
        >
          {match[4]}
        </code>
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function FormattedMessage({ content }: { content: string }) {
  const parsed = useMemo(() => parseMarkdown(content), [content])
  return <>{parsed}</>
}

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
      setShowGreeting(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth < 640
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const payload = { id: sessionId, mensaje: trimmed }

    try {
      const response = await fetch(
        "https://n8n.morbia.com.mx/webhook/4fc39209-5fb5-46ba-9877-f54a40c5404e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      const text = await response.text()
      let reply = ""

      try {
        const json = JSON.parse(text)
        reply =
          json.output ||
          json.message ||
          json.respuesta ||
          json.text ||
          json.reply ||
          (typeof json === "string" ? json : JSON.stringify(json))
      } catch {
        reply = text
      }

      const assistantMessage: Message = { role: "assistant", content: reply }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("[Morbia Chat] Fetch error:", err)
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting bubble */}
      {showGreeting && !isOpen && (
        <div className="relative max-w-[200px] sm:max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-gray-800 border border-[#17a993]/40 text-gray-200 text-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-xl leading-relaxed">
            <span className="text-[#61e59c] font-semibold">¡Hola!</span> Soy el asistente
            inteligente de Morbia. ¿En qué puedo ayudarte?
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

      {/* Chat window — full screen on mobile, floating on desktop */}
      {isOpen && (
        <div
          className={[
            // Mobile: full screen overlay
            "fixed inset-0 sm:inset-auto",
            // Desktop: positioned and sized
            "sm:relative sm:w-[380px] sm:max-h-[560px]",
            // Shared
            "flex flex-col bg-gray-900 shadow-2xl overflow-hidden",
            "sm:rounded-2xl sm:border sm:border-[#17a993]/30",
            "animate-in fade-in slide-in-from-bottom-4 duration-300",
            "z-50",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:py-3 bg-gray-800 border-b border-gray-700 safe-top">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center shadow-md flex-shrink-0">
                <Bot size={20} className="text-white sm:w-[18px] sm:h-[18px]" />
              </div>
              <div>
                <p className="text-white font-semibold text-base sm:text-sm leading-tight">
                  Asistente Morbia
                </p>
                <p className="text-[#61e59c] text-xs">Siempre disponible</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={resetConversation}
                title="Reiniciar conversación"
                className="p-2 sm:p-1.5 rounded-lg text-gray-400 hover:text-[#61e59c] hover:bg-gray-700/60 transition-all duration-200"
              >
                <RotateCcw size={18} className="sm:w-[15px] sm:h-[15px]" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/60 transition-all duration-200"
              >
                <X size={18} className="sm:w-[15px] sm:h-[15px]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 sm:min-h-[320px] sm:max-h-[400px]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#17a993]/20 to-[#2c5b8b]/20 border border-[#17a993]/30 flex items-center justify-center">
                  <Image
                    src="/images/main-logo.png"
                    alt="Morbia"
                    width={80}
                    height={28}
                    className="w-12 sm:w-10 h-auto"
                  />
                </div>
                <div className="text-center px-6">
                  <p className="text-gray-300 text-base sm:text-sm font-medium mb-1">
                    ¡Hola! 👋
                  </p>
                  <p className="text-gray-400 text-sm sm:text-sm leading-relaxed">
                    Soy el asistente inteligente de Morbia. Escribe tu mensaje para comenzar.
                  </p>
                </div>

                {/* Quick action suggestions on mobile */}
                <div className="flex flex-wrap justify-center gap-2 mt-2 px-4">
                  {["¿Qué es Morbia?", "Servicios", "Contacto"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion)
                        setTimeout(() => {
                          inputRef.current?.focus()
                        }, 50)
                      }}
                      className="px-3 py-1.5 text-xs rounded-full border border-[#17a993]/40 text-[#61e59c] hover:bg-[#17a993]/10 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 sm:gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-white sm:w-[14px] sm:h-[14px]" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] sm:max-w-[78%] px-4 sm:px-3.5 py-3 sm:py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#17a993] to-[#2c5b8b] text-white rounded-tr-sm"
                      : "bg-gray-800 text-gray-200 border border-gray-700/80 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <FormattedMessage content={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 sm:gap-2 items-start">
                <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-white sm:w-[14px] sm:h-[14px]" />
                </div>
                <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-[#17a993] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 sm:py-3 bg-gray-800/80 border-t border-gray-700 safe-bottom">
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 sm:py-2 focus-within:border-[#17a993]/60 transition-colors duration-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-gray-200 text-base sm:text-sm placeholder-gray-500 outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 active:scale-95"
                aria-label="Enviar mensaje"
              >
                <Send size={16} className="sm:w-[14px] sm:h-[14px]" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 text-center mt-2">
              Powered by Morbia AI
            </p>
          </div>
        </div>
      )}

      {/* Toggle button — hidden when chat is fullscreen on mobile */}
      {!(isOpen && typeof window !== "undefined") && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#17a993] to-[#2c5b8b] flex items-center justify-center shadow-lg hover:shadow-[#17a993]/30 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageCircle size={22} className="text-white" />
          )}
        </button>
      )}
    </div>
  )
}
