import { readdir, readFile } from "node:fs/promises"
import { resolve } from "node:path"

const host = "www.morbia.com.mx"
const sitemapUrl = `https://${host}/sitemap.xml`
const publicDirectory = resolve("public")
const keyFile = (await readdir(publicDirectory)).find((name) => /^[a-f0-9]{32}\.txt$/i.test(name))

if (!keyFile) throw new Error("No se encontró la clave pública de IndexNow en public/.")

const key = (await readFile(resolve(publicDirectory, keyFile), "utf8")).trim()
if (key !== keyFile.slice(0, -4)) throw new Error("La clave IndexNow y su archivo público no coinciden.")

const sitemapResponse = await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) })
if (!sitemapResponse.ok) throw new Error(`El sitemap respondió HTTP ${sitemapResponse.status}.`)

const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim())
const uniqueUrls = [...new Set(urls)]

if (!uniqueUrls.length) throw new Error("El sitemap no contiene URL que se puedan enviar.")
for (const value of uniqueUrls) {
  const url = new URL(value)
  if (url.protocol !== "https:" || url.hostname !== host) {
    throw new Error(`Se rechazó una URL fuera del dominio canónico: ${value}`)
  }
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${keyFile}`,
    urlList: uniqueUrls,
  }),
  signal: AbortSignal.timeout(30_000),
})

if (![200, 202].includes(response.status)) {
  const detail = (await response.text()).slice(0, 500)
  throw new Error(`IndexNow respondió HTTP ${response.status}: ${detail}`)
}

console.log(`IndexNow aceptó ${uniqueUrls.length} URL canónicas de ${host}.`)
