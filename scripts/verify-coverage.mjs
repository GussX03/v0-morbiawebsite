import assert from "node:assert/strict"

const base = process.argv[2] || "http://127.0.0.1:3000"
const canonicalBase = "https://www.morbia.com.mx"
const paths = [
  "/",
  "/servicios-tecnologicos-puebla-tlaxcala",
  ...["presencia-digital", "paginas-web", "chatbots", "automatizacion-de-procesos", "rpa", "inteligencia-artificial", "analisis-de-datos"].map((slug) => `/servicios/${slug}`),
]

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

for (const path of paths) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 200, `${path}: route status`)
  const html = await response.text()
  const text = visibleText(html)
  assert.ok(text.includes("Puebla y Tlaxcala"), `${path}: geography identifies the physical location`)
  assert.ok(/estés donde estés|en cualquier lugar/i.test(text), `${path}: attention is not geographically limited`)
  const nonLocationText = text
    .replaceAll("Estamos en Puebla y Tlaxcala", "Nuestra ubicación")
    .replaceAll("Nos ubicamos en Puebla y Tlaxcala", "Nuestra ubicación")
    .replaceAll("Ubicación: Puebla y Tlaxcala", "Nuestra ubicación")
    .replaceAll("Sorteos Ramos Tlaxcala", "Cliente")
  assert.doesNotMatch(nonLocationText, /\b(?:Puebla|Tlaxcala)\b/i, `${path}: no regional-only marketing copy`)
  assert.ok(html.includes('name="description"'), `${path}: metadata remains present`)
  assert.ok(html.includes('rel="canonical"'), `${path}: canonical remains present`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]
  assert.equal(canonical, path === "/" ? canonicalBase : `${canonicalBase}${path}`, `${path}: canonical points to this page`)
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${path}: exactly one H1`)
  for (const [, jsonLd] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    assert.doesNotThrow(() => JSON.parse(jsonLd), `${path}: JSON-LD parses`)
  }
  if (path === "/") {
    assert.ok(text.includes("Explora todas nuestras soluciones"), "homepage: neutral catalog link")
    assert.ok(text.includes("Ubicación: Puebla y Tlaxcala"), "homepage: clear contact location")
  }
  if (path === "/servicios-tecnologicos-puebla-tlaxcala") {
    assert.ok(text.includes("Tu negocio puede trabajar mejor."), "catalog: current neutral heading")
  }
  console.log(`PASS ${path}: location, unrestricted attention and visible copy`)
}

for (const path of ["/llms.txt", "/llms-full.txt"]) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 200, `${path}: route status`)
  assert.ok(response.headers.get("content-type")?.includes("text/plain"), `${path}: plain text`)
  const text = await response.text()
  assert.ok(text.includes("Ubicación: Puebla y Tlaxcala"), `${path}: location preserved`)
  assert.ok(text.includes("Catálogo de servicios:"), `${path}: neutral catalog label`)
  assert.doesNotMatch(text, /(?:para empresas de|atiende a empresas de|Cobertura declarada:|Servicios en) Puebla y Tlaxcala/i, `${path}: no restricted coverage claim`)
  assert.ok(text.includes("no son un límite geográfico") || text.includes("no se limitan geográficamente"), `${path}: location is distinct from coverage`)
  console.log(`PASS ${path}: location and coverage clearly distinguished`)
}

const sitemapPaths = [...paths, "/aviso-de-privacidad"]
const sitemapResponse = await fetch(`${base}/sitemap.xml`)
assert.equal(sitemapResponse.status, 200, "sitemap: route status")
const sitemap = await sitemapResponse.text()
for (const path of sitemapPaths) {
  const expectedUrl = path === "/" ? canonicalBase : `${canonicalBase}${path}`
  assert.ok(sitemap.includes(`<loc>${expectedUrl}</loc>`), `sitemap: includes ${expectedUrl}`)
}
assert.doesNotMatch(sitemap, /<lastmod>/i, "sitemap: omit unverified blanket modification times")
console.log(`PASS sitemap: ${sitemapPaths.length} canonical pages, no blanket lastmod`)

const privacyResponse = await fetch(`${base}/aviso-de-privacidad`)
assert.equal(privacyResponse.status, 200, "privacy notice: route status")
const privacyHtml = await privacyResponse.text()
assert.match(privacyHtml, /<link rel="canonical" href="https:\/\/www\.morbia\.com\.mx\/aviso-de-privacidad"/i, "privacy notice: self-canonical")
assert.match(privacyHtml, /<title>Aviso de privacidad de FinZen \| Morbia<\/title>/i, "privacy notice: unique title without duplicate brand")
console.log("PASS privacy notice: unique metadata and self-canonical")
