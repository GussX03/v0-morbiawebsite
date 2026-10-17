import { createRequire } from "node:module"
import { mkdir, stat } from "node:fs/promises"
import path from "node:path"

const require = createRequire(import.meta.url)
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json")] }))
const campaignRoot = "/Users/gustavomorales/Desktop/Morbia - Redes Sociales/Nuevas publicaciones Instagram/Lote 2026-10-15"
const chatbotSource = process.argv[2]

if (!chatbotSource) throw new Error("Pass the approved generated chatbot artwork path as the first argument.")

const sources = [
  ["paginas-web", path.join(campaignRoot, "08_07_DETRAS_DE_CAMARAS_MORBIA/foto.png")],
  ["chatbots", chatbotSource],
  ["automatizacion-de-procesos", path.join(campaignRoot, "01_PROBLEMA_REAL_MORBIA/foto.png")],
  ["rpa", path.join(campaignRoot, "05_04_TIP_RAPIDO_MORBIA/foto.png")],
  ["inteligencia-artificial", path.join(campaignRoot, "06_05_MARCA_VISION_MORBIA/foto.png")],
  ["analisis-de-datos", path.join(campaignRoot, "10_09_TESTIMONIO_PRUEBA_MORBIA/foto.png")],
]

const destination = path.join(process.cwd(), "public/images/services")
await mkdir(destination, { recursive: true })

for (const [slug, source] of sources) {
  const output = path.join(destination, `${slug}.webp`)
  const result = await sharp(source).rotate().resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 84, effort: 6 }).toFile(output)
  const original = await stat(source)
  console.log(`${slug}: ${result.width}x${result.height}, ${Math.round(original.size / 1024)} KB → ${Math.round(result.size / 1024)} KB, ${Math.round((1 - result.size / original.size) * 100)}% smaller`)
}
