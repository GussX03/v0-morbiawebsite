"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { TbMessageCircle as MessageCircle, TbX as X, TbSend as Send, TbRefresh as RotateCcw, TbRobot as Bot, TbPhone as Phone, TbMail as Mail, TbWorld as Globe, TbVideo as Video, TbCalendarEvent as CalendarDays, TbAutomation as Workflow, TbLayoutDashboard as PanelTop, TbBrain as BrainCircuit, TbChartBar as BarChart3, TbFileText as FileText, TbSparkles as Sparkles, TbRosetteDiscount as BadgeDollarSign } from "react-icons/tb"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa6"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { createProgressiveText } from "@/lib/progressive-text"
import { isAllowedButtonHref, isAllowedQuickReply, safeInlineHref, type ChatButton } from "@/lib/chat-buttons"

gsap.registerPlugin(useGSAP)

interface Message {
  role: "user" | "assistant"
  content: string
  id?: string
  buttons?: ChatButton[]
}

const generateSessionId = () => "morbia_" + Math.random().toString(36).slice(2, 11)
const CHAT_ENDPOINT = "/api/chat"
const AVAILABILITY_TIMEOUT_MS = 30000
const MESSAGE_TIMEOUT_MS = 60000

/**
 * Parse basic markdown: **bold**, *italic*, `code`, newlines, and bullet lists.
 * Returns React elements.
 */
function parseMarkdown(text: string, buttons: ChatButton[]): React.ReactNode[] {
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
              <span className="text-[#55f5e8] mt-1 flex-shrink-0 text-xs">●</span>
              <span>{parseInlineMarkdown(content, `${pIdx}-${lIdx}`, buttons)}</span>
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
                <span className="text-[#55f5e8] font-semibold flex-shrink-0 text-xs min-w-[1rem] text-right">
                  {lIdx + 1}.
                </span>
                <span>{parseInlineMarkdown(content, `${pIdx}-${lIdx}`, buttons)}</span>
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
              {parseInlineMarkdown(line, `${pIdx}-${lIdx}`, buttons)}
            </span>
          )
        })
      }
    }
  })

  return result
}

function parseInlineMarkdown(text: string, keyPrefix: string, buttons: ChatButton[]): React.ReactNode[] {
  // Match [link](url), **bold**, *italic*, `code`, or bare URLs
  const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|(https?:\/\/[^\s<>,;)]+))/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    if (match[2] && match[3]) {
      const href = safeInlineHref(match[3], buttons)
      if (!href) {
        nodes.push(match[2])
        lastIndex = match.index + match[0].length
        continue
      }
      // [text](url) markdown link
      nodes.push(
        <a
          key={`${keyPrefix}-a-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#55f5e8] underline underline-offset-2 decoration-[#55f5e8]/40 hover:decoration-[#55f5e8] transition-colors duration-200"
        >
          {match[2]}
        </a>
      )
    } else if (match[4]) {
      // **bold**
      nodes.push(
        <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold text-white">
          {match[4]}
        </strong>
      )
    } else if (match[5]) {
      // *italic*
      nodes.push(
        <em key={`${keyPrefix}-i-${match.index}`} className="italic text-gray-300">
          {match[5]}
        </em>
      )
    } else if (match[6]) {
      // `code`
      nodes.push(
        <code
          key={`${keyPrefix}-c-${match.index}`}
          className="bg-[#0a446c] text-[#55f5e8] px-1 py-0.5 rounded text-xs font-mono"
        >
          {match[6]}
        </code>
      )
    } else if (match[7]) {
      const href = safeInlineHref(match[7], buttons)
      if (!href) {
        nodes.push(match[7])
        lastIndex = match.index + match[0].length
        continue
      }
      // Bare URL (https://...)
      nodes.push(
        <a
          key={`${keyPrefix}-u-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#55f5e8] underline underline-offset-2 decoration-[#55f5e8]/40 hover:decoration-[#55f5e8] transition-colors duration-200 break-all"
        >
          {match[7]}
        </a>
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

function FormattedMessage({ content, buttons }: { content: string; buttons: ChatButton[] }) {
  const parsed = useMemo(() => parseMarkdown(content, buttons), [content, buttons])
  return <>{parsed}</>
}

function isChatButton(value: unknown): value is ChatButton {
  if (!value || typeof value !== "object") return false
  const button = value as { label?: unknown; icon?: unknown; href?: unknown; reply?: unknown }
  if (typeof button.label !== "string" || button.label.length > 40 || typeof button.icon !== "string") return false
  return (typeof button.href === "string" && button.reply === undefined && isAllowedButtonHref(button.href)) ||
    (typeof button.reply === "string" && button.href === undefined && isAllowedQuickReply(button.reply))
}

const buttonIcons: Record<string, typeof Phone> = {
  whatsapp: FaWhatsapp, phone: Phone, email: Mail, instagram: FaInstagram, facebook: FaFacebookF,
  linkedin: FaLinkedinIn, tiktok: FaTiktok, link: Globe, video: Video, calendar: CalendarDays,
  chat: MessageCircle, automation: Workflow, web: PanelTop, ai: BrainCircuit, data: BarChart3,
  file: FileText, quote: BadgeDollarSign, spark: Sparkles,
}

function ChatActions({ buttons, onReply, disabled }: { buttons: ChatButton[]; onReply: (reply: string) => void; disabled: boolean }) {
  if (!buttons.length) return null
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {buttons.map((button) => {
        const Icon = buttonIcons[button.icon] || Globe
        const className = "inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#55f5e8]/55 bg-[#063e69] px-3 py-2 text-xs font-semibold text-[#b5fff8] transition-colors hover:bg-[#0b627e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#55f5e8] disabled:cursor-not-allowed disabled:opacity-50"
        if (button.reply !== undefined) {
          return <button key={button.reply} type="button" disabled={disabled} onClick={() => onReply(button.reply)} className={className}>
            <Icon size={15} aria-hidden="true" />{button.label}
          </button>
        }
        const external = button.href.startsWith("https://")
        return (
          <a key={button.href} href={button.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
            className={className}>
            <Icon size={15} aria-hidden="true" />{button.label}
          </a>
        )
      })}
    </div>
  )
}

export default function FloatingChat() {
  const [sessionId, setSessionId] = useState(generateSessionId)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [showGreeting, setShowGreeting] = useState(true)
  const chatRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const stickToBottom = useRef(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const activeRequest = useRef<AbortController | null>(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)")
    const updateViewport = () => setIsMobileViewport(mobileQuery.matches)

    updateViewport()
    mobileQuery.addEventListener("change", updateViewport)

    return () => mobileQuery.removeEventListener("change", updateViewport)
  }, [])

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (isOpen && !window.matchMedia("(max-width: 639px)").matches) {
      gsap.fromTo("[data-chat-panel]", { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" })
    }
  }, { scope: chatRef, dependencies: [isOpen], revertOnUpdate: true })

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!isOpen && showGreeting) {
      gsap.fromTo("[data-chat-greeting]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" })
    }
  }, { scope: chatRef, dependencies: [isOpen, showGreeting], revertOnUpdate: true })

  useGSAP(() => {
    if (!isLoading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const typingTween = gsap.to("[data-typing-dot]", {
      y: -4,
      duration: 0.34,
      yoyo: true,
      repeat: -1,
      stagger: 0.1,
      ease: "sine.inOut",
    })
    return () => typingTween.kill()
  }, { scope: chatRef, dependencies: [isLoading], revertOnUpdate: true })

  // Do not expose the chat unless the n8n workflow responds successfully.
  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), AVAILABILITY_TIMEOUT_MS)

    const checkAvailability = async () => {
      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: "morbia_healthcheck", mensaje: "healthcheck" }),
          signal: controller.signal,
          cache: "no-store",
        })

        if (response.ok) {
          setIsAvailable(true)
        } else {
          console.warn("[Morbia Chat] Availability check failed:", response.status)
        }
      } catch (err) {
        console.warn("[Morbia Chat] Availability check failed:", err)
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void checkAvailability()

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false)
      if (!window.matchMedia("(max-width: 767px)").matches) {
        const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100)
        return () => window.clearTimeout(timer)
      }
    }
  }, [isOpen])

  useEffect(() => {
    const container = messagesRef.current
    if (container && stickToBottom.current) container.scrollTop = container.scrollHeight
  }, [messages])

  useEffect(() => {
    if (isOpen) return
    const timer = setTimeout(() => {
      setShowGreeting(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (!isOpen || !window.matchMedia("(max-width: 639px)").matches) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return
    const viewport = window.visualViewport
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (viewport && window.matchMedia("(max-width: 639px)").matches) {
          panel.style.top = `${viewport.offsetTop}px`
          panel.style.left = `${viewport.offsetLeft}px`
          panel.style.bottom = "auto"
          panel.style.right = "auto"
          panel.style.width = `${viewport.width}px`
          panel.style.height = `${viewport.height}px`
        } else {
          panel.style.removeProperty("top")
          panel.style.removeProperty("left")
          panel.style.removeProperty("bottom")
          panel.style.removeProperty("right")
          panel.style.removeProperty("width")
          panel.style.removeProperty("height")
        }
      })
    }
    update()
    viewport?.addEventListener("resize", update)
    viewport?.addEventListener("scroll", update)
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      viewport?.removeEventListener("resize", update)
      viewport?.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      panel.style.removeProperty("top")
      panel.style.removeProperty("left")
      panel.style.removeProperty("bottom")
      panel.style.removeProperty("right")
      panel.style.removeProperty("width")
      panel.style.removeProperty("height")
    }
  }, [isOpen])

  const sendMessageDirect = async (text: string) => {
    const payload = { id: sessionId, mensaje: text }
    const controller = new AbortController()
    activeRequest.current = controller
    const timeout = window.setTimeout(() => controller.abort(), MESSAGE_TIMEOUT_MS)
    const messageId = crypto.randomUUID()
    let receivedText = false
    const progressByMessageId = new Map<string, ReturnType<typeof createProgressiveText>>()
    const localMessageIds = new Map<string, string>()
    let lastAssistantMessageId: string | undefined
    let buttonsMessageId: string | undefined

    const progressFor = (streamMessageId: string) => {
      const existing = progressByMessageId.get(streamMessageId)
      if (existing) return existing

      const localMessageId = `${messageId}:${streamMessageId}`
      localMessageIds.set(streamMessageId, localMessageId)
      const progress = createProgressiveText({
        signal: controller.signal,
        onUpdate(content) {
          if (activeRequest.current !== controller) return
          setIsStreaming(true)
          setMessages((prev) => prev.some((message) => message.id === localMessageId)
            ? prev.map((message) => message.id === localMessageId ? { ...message, content } : message)
            : [...prev, { id: localMessageId, role: "assistant", content }])
        },
      })
      progressByMessageId.set(streamMessageId, progress)
      return progress
    }

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream, application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`)
      }

      if (response.headers.get("content-type")?.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        let completed = false
        let buttons: ChatButton[] = []
        while (true) {
          const chunk = await reader.read()
          if (chunk.done) break
          buffer = (buffer + decoder.decode(chunk.value, { stream: true })).replace(/\r\n/g, "\n")
          if (buffer.length > 1_000_000) throw new Error("La respuesta es demasiado grande.")
          let boundary: number
          while ((boundary = buffer.indexOf("\n\n")) >= 0) {
            const block = buffer.slice(0, boundary)
            buffer = buffer.slice(boundary + 2)
            const data = block.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n")
            if (!data) continue
            const event = JSON.parse(data) as { type?: string; messageId?: string; text?: string; buttons?: unknown }
            if (event.type === "error") throw new Error("El asistente no pudo completar su respuesta.")
            if (event.type === "done") completed = true
            if (event.type === "buttons" && Array.isArray(event.buttons)) {
              buttons = event.buttons.filter(isChatButton).slice(0, 8)
              if (typeof event.messageId === "string") buttonsMessageId = event.messageId
            }
            if (event.type === "message" && typeof event.messageId === "string" && typeof event.text === "string" && event.text) {
              receivedText = true
              lastAssistantMessageId = event.messageId
              progressFor(event.messageId).update(event.text)
            }
            // Keep compatibility with n8n and older deployments that stream a single text event.
            if (event.type === "text" && typeof event.text === "string" && event.text) {
              receivedText = true
              lastAssistantMessageId = "legacy"
              progressFor("legacy").update(event.text)
            }
          }
        }
        if (!completed || !receivedText) throw new Error("La respuesta quedó incompleta.")
        await Promise.all(Array.from(progressByMessageId.values(), (progress) => progress.finish()))
        const targetMessageId = localMessageIds.get(buttonsMessageId || lastAssistantMessageId || "")
        if (buttons.length && targetMessageId && activeRequest.current === controller) {
          setMessages((prev) => prev.map((message) => message.id === targetMessageId ? { ...message, buttons } : message))
        }
        return
      }

      const rawText = await response.text()
      let reply = ""
      let parsedJson: unknown

      try {
        parsedJson = JSON.parse(rawText)

        // If the response is an array, take the first element
        if (Array.isArray(parsedJson)) {
          parsedJson = parsedJson[0] ?? {}
        }

      } catch {
        parsedJson = null
        reply = rawText
      }

      if (typeof parsedJson === "string") reply = parsedJson
      else if (parsedJson && typeof parsedJson === "object") {
        const data = parsedJson as Record<string, unknown>
        const candidate = data.output || data.message || data.respuesta || data.text || data.reply
        if (typeof candidate === "string") reply = candidate
      }

      // Ensure literal \n sequences are converted to real newlines
      reply = reply.replace(/\\n/g, "\n").trim()

      const data = parsedJson && typeof parsedJson === "object" ? parsedJson as Record<string, unknown> : undefined
      const rawMessages = Array.isArray(data?.messages)
        ? data.messages.filter((message: unknown) => message && typeof message === "object" && typeof (message as { text?: unknown }).text === "string") as Array<{ id?: unknown; text: string }>
        : [{ text: reply }]
      const localIdsByServerId = new Map<string, string>()
      const buttons = Array.isArray(data?.buttons) ? data.buttons.filter(isChatButton).slice(0, 8) : []
      const resolvedMessages = rawMessages
        .map((message) => {
          const serverId = typeof message.id === "string" ? message.id : crypto.randomUUID()
          const localId = `${messageId}:${serverId}`
          localIdsByServerId.set(serverId, localId)
          return { id: localId, role: "assistant" as const, content: message.text.trim() }
        })
        .filter((message) => message.content.length > 0)
      const rawButtonsMessageId = typeof data?.buttonsMessageId === "string" ? data.buttonsMessageId : undefined
      const targetMessageId = localIdsByServerId.get(rawButtonsMessageId || "") || resolvedMessages.at(-1)?.id
      const resolvedWithButtons = resolvedMessages.map((message) =>
        message.id === targetMessageId && buttons.length ? { ...message, buttons } : message,
      )
      setMessages((prev) => [...prev, ...resolvedWithButtons])
    } catch (err) {
      if (activeRequest.current !== controller) return
      console.error("[Morbia Chat] Fetch error:", err)
      const timedOut = err instanceof DOMException && err.name === "AbortError"
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: receivedText
            ? "La respuesta se interrumpió. Si estabas gestionando una cita, confirma su estado antes de intentarlo de nuevo."
            : timedOut
              ? "El asistente tardó más de lo esperado. Por favor intenta de nuevo."
              : "Ocurrió un error al conectar con el asistente. Por favor intenta de nuevo.",
        },
      ])
    } finally {
      for (const progress of progressByMessageId.values()) progress.dispose()
      window.clearTimeout(timeout)
      if (activeRequest.current === controller) {
        activeRequest.current = null
        setIsLoading(false)
        setIsStreaming(false)
      }
    }
  }

  const sendMessageText = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading || activeRequest.current) return

    const userMessage: Message = { role: "user", content: trimmed }
    stickToBottom.current = true
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    await sendMessageDirect(trimmed)
  }

  const sendMessage = () => sendMessageText(input)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetConversation = () => {
    activeRequest.current?.abort()
    activeRequest.current = null
    setIsLoading(false)
    setIsStreaming(false)
    setMessages([])
    stickToBottom.current = true
    setSessionId(generateSessionId())
  }

  // Keep the launcher reachable on phones while preserving the desktop health gate.
  if (!isAvailable && !isMobileViewport) {
    return null
  }

  return (
    <div ref={chatRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Greeting bubble */}
      {showGreeting && !isOpen && (
        <div data-chat-greeting className="relative max-w-[200px] sm:max-w-[220px]">
          <div className="morbia-chat-surface border border-[#52f3e7]/35 text-white text-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-xl leading-relaxed">
            <span className="text-[#55f5e8] font-semibold">¡Hola!</span> Soy el asistente
            inteligente de Morbia. ¿En qué puedo ayudarte?
          </div>
          <button
            onClick={() => setShowGreeting(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#063e69] border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Cerrar saludo"
          >
            <X size={10} />
          </button>
        </div>
      )}

      {/* Chat window — full screen on mobile, floating on desktop */}
      {isOpen && (
        <div
          data-chat-panel
          ref={panelRef}
          className={[
            // Mobile: full screen overlay
            "fixed inset-0 h-[100dvh] sm:inset-auto sm:h-auto",
            // Desktop: positioned and sized
            "sm:relative sm:w-[380px] sm:max-h-[560px]",
            // Shared
            "morbia-chat-surface flex flex-col shadow-2xl overflow-hidden",
            "sm:rounded-2xl sm:border sm:border-[#52f3e7]/30",
            "z-50",
          ].join(" ")}
        >
          {/* Header */}
          <div className="morbia-chat-safe-top flex items-center justify-between px-4 py-3 sm:py-3 bg-[#063e69]/85 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#19e0d0] to-[#075e8d] flex items-center justify-center shadow-md flex-shrink-0">
                <Bot size={20} className="text-white sm:w-[18px] sm:h-[18px]" />
              </div>
              <div>
                <p className="text-white font-semibold text-base sm:text-sm leading-tight">
                  Asistente Morbia
                </p>
                <p className="text-[#55f5e8] text-xs">Asistente de inteligencia artificial</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={resetConversation}
                title="Reiniciar conversación"
                className="p-2 sm:p-1.5 rounded-lg text-white/55 hover:text-[#55f5e8] hover:bg-white/10 transition-all duration-200"
              >
                <RotateCcw size={18} className="sm:w-[15px] sm:h-[15px]" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 rounded-lg text-white/55 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <X size={18} className="sm:w-[15px] sm:h-[15px]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} onScroll={(event) => {
            const element = event.currentTarget
            stickToBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 80
          }} className="flex-1 overflow-y-auto overscroll-contain bg-[#052d50]/75 p-4 space-y-4 min-h-0 sm:min-h-[320px] sm:max-h-[400px]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#19e0d0]/25 to-[#075e8d]/45 border border-[#52f3e7]/35 flex items-center justify-center">
                  <Image
                    src="/images/main-logo.png"
                    alt="Morbia"
                    width={80}
                    height={28}
                    className="w-12 sm:w-10 h-auto brightness-0 invert"
                  />
                </div>
                <div className="text-center px-6">
                  <p className="text-white text-base sm:text-sm font-medium mb-1">
                    ¡Hola!
                  </p>
                  <p className="text-white/65 text-sm sm:text-sm leading-relaxed">
                    Soy el asistente inteligente de Morbia. Escribe tu mensaje para comenzar.
                  </p>
                </div>

                {/* Quick action suggestions on mobile */}
                <div className="flex flex-wrap justify-center gap-2 mt-2 px-4">
                  {["¿Qué es Morbia?", "Servicios", "Contacto"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => void sendMessageText(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full border border-[#52f3e7]/40 text-[#55f5e8] hover:bg-[#19e0d0]/10 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={`flex gap-2.5 sm:gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#19e0d0] to-[#075e8d] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-white sm:w-[14px] sm:h-[14px]" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] sm:max-w-[78%] px-4 sm:px-3.5 py-3 sm:py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#19e0d0] to-[#08739b] text-white rounded-tr-sm"
                      : "bg-[#0a446c] text-white/90 border border-white/10 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <>
                      <FormattedMessage content={msg.content} buttons={msg.buttons || []} />
                      <ChatActions buttons={msg.buttons || []} onReply={(reply) => void sendMessageText(reply)} disabled={isLoading} />
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && !isStreaming && (
              <div className="flex gap-2.5 sm:gap-2 items-start">
                <div className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#19e0d0] to-[#075e8d] flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-white sm:w-[14px] sm:h-[14px]" />
                </div>
                <div className="bg-[#0a446c] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                  <span data-typing-dot className="w-2 h-2 bg-[#55f5e8] rounded-full" />
                  <span data-typing-dot className="w-2 h-2 bg-[#55f5e8] rounded-full" />
                  <span data-typing-dot className="w-2 h-2 bg-[#55f5e8] rounded-full" />
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="morbia-chat-safe-bottom px-3 py-3 sm:py-3 bg-[#063e69]/90 border-t border-white/15">
            <div className="flex items-center gap-2 bg-[#042b4d] border border-white/15 rounded-xl px-3 py-2.5 sm:py-2 focus-within:border-[#52f3e7]/60 transition-colors duration-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent text-white text-[16px] placeholder:text-white/40 outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#19e0d0] to-[#08739b] flex items-center justify-center text-white hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 active:scale-95"
                aria-label="Enviar mensaje"
              >
                <Send size={16} className="sm:w-[14px] sm:h-[14px]" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-white/40 text-center mt-2">
              Powered by Morbia AI
            </p>
          </div>
        </div>
      )}

      {/* Toggle button — hidden when chat is fullscreen on mobile */}
      {!(isOpen && typeof window !== "undefined") && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#19e0d0] to-[#075e8d] flex items-center justify-center shadow-lg hover:shadow-[#19e0d0]/30 hover:scale-105 active:scale-95 transition-all duration-300"
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
