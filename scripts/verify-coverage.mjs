import assert from "node:assert/strict"

const base = process.argv[2] || "http://127.0.0.1:3000"
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
  assert.ok(text.includes("Nos ubicamos en Puebla y Tlaxcala"), `${path}: geography identifies location`)
  assert.ok(text.includes("estés donde estés"), `${path}: attention is not geographically limited`)
  const nonLocationText = text
    .replaceAll("Nos ubicamos en Puebla y Tlaxcala", "Nuestra ubicación")
    .replaceAll("Ubicación: Puebla y Tlaxcala", "Nuestra ubicación")
    .replaceAll("Sorteos Ramos Tlaxcala", "Cliente")
  assert.doesNotMatch(nonLocationText, /\b(?:Puebla|Tlaxcala)\b/i, `${path}: no regional-only marketing copy`)
  assert.ok(html.includes('name="description"'), `${path}: metadata remains present`)
  assert.ok(html.includes('rel="canonical"'), `${path}: canonical remains present`)
  if (path === "/") {
    assert.ok(text.includes("Explora todas nuestras soluciones"), "homepage: neutral catalog link")
    assert.ok(text.includes("Ubicación: Puebla y Tlaxcala"), "homepage: clear contact location")
  }
  if (path === "/servicios-tecnologicos-puebla-tlaxcala") {
    assert.ok(text.includes("TECNOLOGÍA PARA TU NEGOCIO"), "catalog: neutral heading")
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
