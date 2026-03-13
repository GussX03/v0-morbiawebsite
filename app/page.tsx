"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Menu,
  X,
  ChevronRight,
  Globe,
  MessageCircle,
  Zap,
  Bot,
  Brain,
  BarChart3,
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Calendar,
  PieChart,
  Mic,
  User,
  LayoutGrid,
  Target,
  PiggyBank,
} from "lucide-react"
import Image from "next/image"
import FloatingChat from "@/components/floating-chat"

// Pre-computed star positions to avoid server/client hydration mismatch
// (Math.random() called at module level is stable across SSR and hydration)
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 100 }, (_, i) => ({
  left: seededRandom(i * 4) * 100,
  top: seededRandom(i * 4 + 1) * 100,
  delay: seededRandom(i * 4 + 2) * 3,
  duration: 2 + seededRandom(i * 4 + 3) * 3,
}))

export default function MorbiaWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(scrolled)
      // Show button when user has scrolled 80% of the page
      setShowScrollTop(scrolled > maxScroll * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setIsAboutDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsAboutDropdownOpen(false)
    }, 300) // 300ms delay before closing
    setDropdownTimeout(timeout)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
    setIsAboutDropdownOpen(false)
    setIsMobileAboutOpen(false)
  }

  const getHeaderOpacity = () => {
    const maxScroll = 500 // Start becoming more transparent after 500px
    const opacity = Math.max(0.7, 0.95 - (scrollY / maxScroll) * 0.25) // Range from 0.95 to 0.7
    return opacity
  }

  const services = [
    {
      icon: Globe,
      title: "Aplicaciones Web",
      description:
        "Desarrollamos aplicaciones web a la medida que optimizan procesos, mejoran la experiencia del usuario y se adaptan a las necesidades específicas de cada negocio, integrando diseño intuitivo y tecnología de vanguardia.",
    },
    {
      icon: MessageCircle,
      title: "Chatbots",
      description:
        "Creamos chatbots inteligentes que automatizan la atención al cliente, optimizan procesos internos y mejoran la experiencia del usuario, con integración fluida en tus plataformas digitales y adaptados a tus objetivos de negocio.",
    },
    {
      icon: Zap,
      title: "Automatizaciones",
      description:
        "Diseñamos soluciones de automatización que eliminan tareas repetitivas, optimizan flujos de trabajo y mejoran la eficiencia operativa, integrando tus herramientas actuales para lograr procesos más ágiles, precisos y escalables.",
    },
    {
      icon: Bot,
      title: "RPA",
      description:
        "Implementamos soluciones de RPA que permiten a robots de software ejecutar tareas repetitivas y basadas en reglas, reduciendo errores, incrementando la eficiencia y liberando a los equipos humanos para enfocarse en actividades estratégicas.",
    },
    {
      icon: Brain,
      title: "IA",
      description:
        "Implementamos soluciones de inteligencia artificial que potencian tus procesos operativos mediante automatización inteligente, análisis predictivo, clasificación de datos, asistentes virtuales y procesamiento de lenguaje natural, adaptadas a las necesidades reales de tu negocio.",
    },
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description:
        "Ofrecemos soluciones de análisis de datos que transforman información cruda en conocimiento estratégico, mediante dashboards interactivos, visualización avanzada y modelos analíticos que apoyan la toma de decisiones basada en evidencia.",
    },
  ]

  const technologies = [
    {
      name: "React",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1" fill="none" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.5"
            stroke="#61DAFB"
            strokeWidth="1"
            fill="none"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.5"
            stroke="#61DAFB"
            strokeWidth="1"
            fill="none"
            transform="rotate(120 12 12)"
          />
        </svg>
      ),
    },
    {
      name: "Next.js",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
          <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Z" fill="black" />
          <path d="M16.5 17.25h-1.65L9.75 9.6v7.65H8.25v-11h1.65l5.1 7.65V6.25h1.5v11Z" fill="white" />
        </svg>
      ),
    },
    {
      name: "OpenAI",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1686a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },

    {
      name: "Stripe",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <rect width="24" height="24" rx="4" fill="#635BFF" />
          <path
            d="M13.3 8.3c-.9-.4-1.5-.7-1.5-1.1 0-.4.3-.6.8-.6 1 0 2 .4 2.7.7l.4-2.5C14.8 4.4 13.7 4 12.5 4c-1.1 0-2 .3-2.7.8-.7.6-1.1 1.4-1.1 2.4 0 1.8 1.1 2.6 2.9 3.2 1.2.4 1.5.7 1.5 1.2 0 .4-.4.7-1.1.7-.8 0-2.2-.4-3.1-.9l-.4 2.5c.9.5 2.2.9 3.5.9 1.2 0 2.2-.3 2.9-.8.7-.6 1.1-1.4 1.1-2.6 0-1.9-1.1-2.7-2.9-3.2z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Power Automate",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <rect width="24" height="24" rx="3" fill="#0066FF" />
          <path d="M7 6h10v2H7V6zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="white" />
          <path d="M16 14l3-3-3-3v2H7v2h9v2z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Python",
      logo: (
        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
          <path
            d="M12.5 2c1.5 0 2.8.2 3.8.6 1 .4 1.7 1 1.7 2.4v2h-5v1h7c1 0 1.8.4 2.3 1.2.5.8.7 1.8.7 3 0 1.2-.2 2.2-.7 3-.5.8-1.3 1.2-2.3 1.2h-1.5v-2c0-1.1-.9-2-2-2h-5c-1 0-1.8-.8-1.8-1.8V5.2c0-1.4.7-2 1.7-2.4 1-.4 2.3-.6 3.8-.6h.3zm-1 2.5c-.4 0-.7.3-.7.7s.3.7.7.7.7-.3.7-.7-.3-.7-.7-.7z"
            fill="#3776AB"
          />
          <path
            d="M11.5 22c-1.5 0-2.8-.2-3.8-.6-1-.4-1.7-1-1.7-2.4v-2h5v-1H4c-1 0-1.8-.4-2.3-1.2C1.2 14 1 13 1 11.8c0-1.2.2-2.2.7-3C2.2 8 3 7.6 4 7.6h1.5v2c0 1.1.9 2 2 2h5c1 0 1.8.8 1.8 1.8v4.4c0 1.4-.7 2-1.7 2.4-1 .4-2.3.6-3.8.6h-.3zm1-2.5c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7z"
            fill="#FFD43B"
          />
        </svg>
      ),
    },
  ]

  const testimonials = [
    {
      name: "Antonio Torres",
      text: "El chatbot que desarrollaron para nuestro soporte redujo el tiempo de respuesta a minutos y elevó la satisfacción de los clientes. ¡Excelente integración con nuestras herramientas!",
    },
    {
      name: "Christian Robredo",
      text: "La aplicación web superó nuestras expectativas: carga veloz, diseño intuitivo y seguridad total. Nuestro equipo de ventas ahora trabaja y reporta desde cualquier lugar sin complicaciones.",
    },
    {
      name: "Carlos Ruiz",
      text: "Su solución de inteligencia artificial detecta patrones que antes pasaban desapercibidos. Gracias a elloğimiz la producción y reducimos costos en un 20%.",
    },
    {
      name: "Luis Ramírez",
      text: "El análisis de datos que realizaron nos permitió tomar decisiones basadas en información real, no suposiciones. Fue clave para nuestro crecimiento este trimestre.",
    },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1JCLHGkqxF/?mibextid=wwXIfr",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            fill="#1877F2"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/morbia_mx?igsh=YTlva3FpMzIxeDNk",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#833AB4" />
              <stop offset="50%" stopColor="#FD1D1D" />
              <stop offset="100%" stopColor="#FCB045" />
            </linearGradient>
          </defs>
          <path
            fill="url(#instagram-gradient)"
            d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.12 1.12 0 1 1-2.25 0 1.12 1.12 0 0 1 2.25 0z"
          />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@morbiamx",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M12 2h4.5a5.5 5.5 0 0 0 5.5 5.5V11a9.99 9.99 0 0 1-5.5-1.6v6.6a6.5 6.5 0 1 1-6.5-6.5c.34 0 .67.03 1 .09V14a2.5 2.5 0 1 0 2.5 2.5V2z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/522215268440",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.38 0 .02 5.36.02 11.98c0 2.12.56 4.19 1.62 6.01L0 24l6.18-1.62a11.97 11.97 0 0 0 5.82 1.48h.01c6.63 0 12-5.36 12-11.98 0-3.2-1.25-6.21-3.49-8.4ZM12.02 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.67.96.98-3.58-.23-.37a9.8 9.8 0 0 1-1.51-5.2c0-5.41 4.41-9.82 9.82-9.82 2.62 0 5.08 1.02 6.94 2.87a9.74 9.74 0 0 1 2.88 6.93c0 5.41-4.41 9.8-9.85 9.8Zm5.39-7.35c-.29-.15-1.71-.84-1.98-.93-.27-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.06-.29-.15-1.23-.45-2.35-1.43-.87-.77-1.46-1.71-1.63-2-.17-.29-.02-.45.13-.6.14-.14.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.65-1.56-.9-2.14-.24-.58-.48-.5-.65-.51h-.55c-.19 0-.51.07-.78.36-.27.29-1.02.99-1.02 2.42s1.05 2.81 1.19 3c.15.19 2.06 3.15 5 4.42.7.3 1.25.48 1.68.61.71.23 1.35.2 1.86.12.57-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "http://linkedin.com/company/morbia/",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="#0A66C2"
          />
        </svg>
      ),
    },
  ]

  const finzenFeatures = [
    {
      icon: TrendingUp,
      title: "Resumen Completo",
      description: "Visualiza todas tus finanzas en un solo lugar",
    },
    {
      icon: Calendar,
      title: "Calendario Financiero",
      description: "Organiza tus movimientos en el tiempo",
    },
    {
      icon: PieChart,
      title: "Análisis Visual",
      description: "Gráficas dinámicas de tus datos",
    },
    {
      icon: Brain,
      title: "Chat IA",
      description: "Asistente inteligente para tus finanzas",
    },
    {
      icon: Mic,
      title: "Registro por Voz",
      description: "Habla y registra tus movimientos",
    },
    {
      icon: User,
      title: "Perfil Personalizable",
      description: "Adapta la app a tu estilo",
    },
    {
      icon: LayoutGrid,
      title: "Widgets Personalizados",
      description: "Configura tu dashboard a tu medida",
    },
    {
      icon: Target,
      title: "Metas Financieras",
      description: "Define objetivos y monitorea tu progreso",
    },
    {
      icon: PiggyBank,
      title: "Ahorros",
      description: "Gestiona y haz crecer tus ahorros",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-gray-800 transition-all duration-300"
        style={{
          backgroundColor: `rgba(17, 24, 39, ${getHeaderOpacity()})`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              {/* Real Logo */}
              <Image
                src="/images/main-logo.png"
                alt="MORBIA Logo"
                width={120}
                height={40}
                className="h-8 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="hidden md:flex items-center flex-1 justify-center">
              <div className="flex space-x-8">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group"
                >
                  Inicio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Acerca de Nosotros with Dropdown */}
                <div className="relative" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                  <button
                    onClick={() => scrollToSection("acerca-de-nosotros")}
                    className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group flex items-center gap-1"
                  >
                    Acerca de Nosotros
                    <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
                  </button>

                  {/* Dropdown Menu */}
                  {isAboutDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-gray-800/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl overflow-hidden">
                        <button
                          onClick={() => scrollToSection("servicios")}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:text-[#61e59c] hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                          Servicios
                        </button>
                        <button
                          onClick={() => scrollToSection("tecnologías")}
                          className="w-full text-left px-4 py-3 text-gray-300 hover:text-[#61e59c] hover:bg-gray-700/50 transition-all duration-200 font-medium"
                        >
                          Tecnologías
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection("conoce-finzen")}
                  className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group"
                >
                  Conoce FinZen
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group"
                >
                  Testimonios
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
                </button>

                <button
                  onClick={() => scrollToSection("clientes")}
                  className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group"
                >
                  Clientes
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <a
                href="https://finzenbymorbia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium relative group animate-color-shift"
              >
                Ingresa a FinZen
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#61e59c] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-gray-800/95 backdrop-blur-md rounded-lg mt-2 p-4 border border-gray-700">
              <button
                onClick={() => scrollToSection("inicio")}
                className="block w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
              >
                Inicio
              </button>

              {/* Acerca de Nosotros with expandable submenu */}
              <div>
                <button
                  onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  className="flex items-center justify-between w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
                >
                  Acerca de Nosotros
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isMobileAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMobileAboutOpen && (
                  <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => scrollToSection("servicios")}
                      className="block w-full text-left py-2 text-gray-400 hover:text-[#61e59c] transition-colors duration-300"
                    >
                      Servicios
                    </button>
                    <button
                      onClick={() => scrollToSection("tecnologías")}
                      className="block w-full text-left py-2 text-gray-400 hover:text-[#61e59c] transition-colors duration-300"
                    >
                      Tecnologías
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("conoce-finzen")}
                className="block w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
              >
                Conoce FinZen
              </button>

              <button
                onClick={() => scrollToSection("testimonios")}
                className="block w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
              >
                Testimonios
              </button>

              <button
                onClick={() => scrollToSection("clientes")}
                className="block w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
              >
                Clientes
              </button>

              <a
                href="https://finzenbymorbia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left py-3 text-gray-300 hover:text-[#61e59c] transition-colors duration-300 font-medium"
              >
                Ingresa a FinZen
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* 3D Orbital Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbital-system-3d">
            {/* Central Planet */}
            <div className="planet-3d">
              <div className="planet-core-3d"></div>
              <div className="planet-ring-3d"></div>
            </div>

            {/* Orbiting AI Elements */}
            <div className="orbit-3d orbit-1-3d">
              <div className="satellite-3d ai-node-3d">
                <Brain size={16} className="text-[#61e59c]" />
              </div>
            </div>
            <div className="orbit-3d orbit-2-3d">
              <div className="satellite-3d ai-node-3d">
                <Bot size={14} className="text-[#17a993]" />
              </div>
            </div>
            <div className="orbit-3d orbit-3-3d">
              <div className="satellite-3d ai-node-3d">
                <Zap size={12} className="text-[#158091]" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Stars */}
        <div className="absolute inset-0">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-gray-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div
            className="transform transition-transform duration-1000"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-relaxed">
              <span className="bg-gradient-to-r from-[#2c5b8b] via-[#17a993] to-[#61e59c] bg-clip-text text-transparent block mb-4">
                INTELIGENCIA
              </span>
              <span className="text-white block mb-4">ORBITANDO</span>
              <span className="bg-gradient-to-r from-[#17a993] to-[#61e59c] bg-clip-text text-transparent block">
                TUS PROCESOS
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Diseñamos soluciones tecnológicas que liberan tiempo, mejoran procesos y conectan a las empresas con el
              futuro.
            </p>
            <Button
              onClick={() => scrollToSection("servicios")}
              className="bg-gradient-to-r from-[#2c5b8b] to-[#17a993] hover:from-[#17a993] hover:to-[#61e59c] text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#61e59c]/25 border-0"
            >
              Explorar Servicios
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="acerca-de-nosotros" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2c5b8b] to-[#17a993] bg-clip-text text-transparent mb-8">
              Acerca de Nosotros
            </h2>
            <div className="text-3xl md:text-4xl font-bold text-[#61e59c] mb-6">
              TODO EN ÓRBITA,
              <br />
              NADA AL AZAR
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              <span className="text-[#17a993] font-semibold">BREVE, CON VISIÓN Y PROPÓSITO.</span> Diseñamos soluciones
              tecnológicas que liberan tiempo, mejoran procesos y conectan a las empresas con el futuro.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2c5b8b] to-[#17a993] bg-clip-text text-transparent mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-[#61e59c]">Explora nuestros servicios</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gray-900/60 border-gray-800 hover:border-[#61e59c]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#61e59c]/10 backdrop-blur-sm service-card-3d"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#17a993] to-[#61e59c] rounded-full mb-4 mx-auto transform transition-transform duration-300 hover:scale-110">
                    <service.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-400 text-center leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologías" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2c5b8b] to-[#17a993] bg-clip-text text-transparent mb-4">
              Herramientas Tecnológicas
            </h2>
            <p className="text-xl text-[#61e59c]">Trabajando con lo más innovador</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-900/60 rounded-xl border border-gray-800 hover:border-[#61e59c]/50 transition-all duration-500 transform hover:scale-110 hover:shadow-lg hover:shadow-[#61e59c]/20 backdrop-blur-sm tech-card-3d"
              >
                <div className="mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  {tech.logo}
                </div>
                <span className="text-white font-semibold text-center text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="conoce-finzen" className="py-20 bg-gray-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#17a993] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2c5b8b] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#17a993]/20 to-[#61e59c]/20 rounded-full border border-[#61e59c]/30 mb-6">
              <Sparkles className="text-[#61e59c]" size={20} />
              <span className="text-[#61e59c] font-semibold">Nuestra Aplicación</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#2c5b8b] via-[#17a993] to-[#61e59c] bg-clip-text text-transparent mb-6">
              Conoce FinZen
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tu aliado inteligente para el control total de tus finanzas personales
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Logo and Tagline */}
            <div className="relative">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#17a993] to-[#61e59c] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* Logo Container */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 hover:border-[#61e59c]/50 transition-all duration-500 transform hover:scale-105">
                  <Image
                    src="/images/finzen.png"
                    alt="FinZen Logo"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />

                  {/* Floating Particles */}
                  <div className="absolute top-10 right-10 w-3 h-3 bg-[#61e59c] rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-10 w-2 h-2 bg-[#17a993] rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Tagline Card */}
              <div className="mt-8 bg-gradient-to-r from-[#2c5b8b] to-[#17a993] p-1 rounded-2xl">
                <div className="bg-gray-900 rounded-2xl p-6 text-center">
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#17a993] to-[#61e59c] bg-clip-text text-transparent">
                    Inteligencia orbitando tus finanzas
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="space-y-6">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#61e59c]/30 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#17a993] to-[#61e59c] rounded-full"></div>
                  ¿Qué es FinZen?
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  FinZen es la aplicación de finanzas personales desarrollada por nosotros, diseñada para que tomes el
                  control de tu dinero de forma sencilla e inteligente. Con FinZen puedes visualizar un resumen completo
                  de tus finanzas, gestionar ingresos, gastos y ahorros, organizar todo en un calendario financiero,
                  acceder a análisis visuales con gráficas dinámicas y hasta conversar con un chat impulsado por
                  inteligencia artificial que responde sobre tus propios datos.
                </p>
              </div>

              <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-[#61e59c]/30 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#17a993] to-[#61e59c] rounded-full"></div>
                  Innovación a tu alcance
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Además, FinZen te permite registrar movimientos con tu voz, haciendo que administrar tu dinero sea tan
                  natural como hablar. Todo esto se complementa con un perfil personalizable, pensado para que la app se
                  adapte a ti y evolucione junto a tu manera de manejar tus finanzas.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center text-white mb-8">Características principales</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finzenFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-[#61e59c]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-[#61e59c]/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#17a993] to-[#61e59c] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={() => window.open("https://finzenbymorbia.vercel.app/", "_blank")}
              className="bg-gradient-to-r from-[#2c5b8b] via-[#17a993] to-[#61e59c] hover:from-[#17a993] hover:via-[#61e59c] hover:to-[#2c5b8b] text-white px-12 py-6 text-xl rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-[#61e59c]/50 border-0 font-bold"
            >
              Descubre FinZen
              <ChevronRight className="ml-2" size={24} />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2c5b8b] to-[#17a993] bg-clip-text text-transparent mb-4">
              Testimonios
            </h2>
            <p className="text-xl text-[#61e59c]">Qué opinan nuestros clientes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-900/60 border-gray-800 hover:border-[#61e59c]/50 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm testimonial-card-3d"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-[#61e59c] fill-current" size={20} />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 mb-4 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-[#61e59c] font-semibold">— {testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section — Infinite Carousel */}
      <section id="clientes" className="py-20 bg-gray-900/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2c5b8b] to-[#17a993] bg-clip-text text-transparent mb-4">
              Conoce a nuestros clientes
            </h2>
            <p className="text-xl text-[#61e59c]">Empresas que confían en nosotros</p>
          </div>
        </div>

        {/* Infinite scrolling carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-gray-900/90 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-gray-900/90 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-infinite-scroll">
            {/* Duplicate the list twice for seamless loop */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-8 md:gap-14 px-4 md:px-7">
                {[
                  { src: "/images/sosadelbosque.jpg", alt: "Sosa Del Bosque", href: "https://grupo.sosadelbosque.mx/", invert: false },
                  { src: "/images/grupo_morales_consultores.png", alt: "Grupo Morales Consultores", href: "https://grupo-morales-consultores.vercel.app/", invert: false },
                  { src: "/images/sorteosramos369.png", alt: "Sorteos Ramos 369", href: "https://sorteosramos369.vercel.app/", invert: false },
                  { src: "/images/amanda.png", alt: "Amanda", href: "#", invert: true },
                  { src: "/images/finzen.png", alt: "Finzen", href: "#", invert: false },
                ].map((client, idx) => (
                  <a
                    key={`${copy}-${idx}`}
                    href={client.href}
                    target={client.href !== "#" ? "_blank" : undefined}
                    rel={client.href !== "#" ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-center w-[180px] h-[120px] md:w-[220px] md:h-[140px] shrink-0 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm px-6 py-4 hover:border-[#17a993]/50 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-[#17a993]/10 transition-all duration-500"
                  >
                    <Image
                      src={client.src}
                      alt={client.alt}
                      width={180}
                      height={80}
                      className={`max-h-[70px] md:max-h-[80px] w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 ${client.invert ? "invert" : ""}`}
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Comienza a automatizar tu futuro */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Comienza a automatizar tu futuro</h3>
            <p className="text-gray-400 mb-6">Contáctanos al contacto@morbia.com.mx o llámanos al +52 221 526 8440 </p>
            <Button
              className="bg-gradient-to-r from-[#2c5b8b] to-[#17a993] hover:from-[#17a993] hover:to-[#61e59c] text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#61e59c]/25 border-0"
              onClick={() => window.open("https://wa.me/522215268440", "_blank")}
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/images/main-logo.png" alt="MORBIA Logo" width={150} height={50} className="h-10 w-auto" />
              </div>
              <p className="text-[#61e59c] text-sm">INTELIGENCIA ORBITANDO TUS PROCESOS</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="mr-3 text-[#61e59c]" size={20} />
                Puebla, Puebla
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="mr-3 text-[#61e59c]" size={20} />
                (+52) 221-526-8440
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="mr-3 text-[#61e59c]" size={20} />
                contacto@morbia.com.mx
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    {social.logo}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-24 bg-gradient-to-r from-[#17a993] to-[#61e59c] hover:from-[#61e59c] hover:to-[#17a993] text-white p-4 rounded-full shadow-lg hover:shadow-[#61e59c]/25 border-0"
        >
          <ArrowUp size={24} />
        </Button>
      )}

      {/* Floating Chat */}
      <FloatingChat />
    </div>
  )
}
