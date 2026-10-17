import assert from "node:assert/strict"

const base = process.argv[2] || "http://127.0.0.1:3000"
const slugs = ["paginas-web", "chatbots", "automatizacion-de-procesos", "rpa", "inteligencia-artificial", "analisis-de-datos"]

for (const slug of slugs) {
  const response = await fetch(`${base}/servicios/${slug}`)
  assert.equal(response.status, 200, `${slug}: route status`)
  const html = await response.text()
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${slug}: one H1`)
  assert.ok(html.includes(`rel="canonical" href="https://www.morbia.com.mx/servicios/${slug}"`), `${slug}: canonical preserved`)
  assert.ok(html.includes(`href="/servicios-tecnologicos-puebla-tlaxcala#${slug}"`), `${slug}: return to originating service`)
  assert.ok(html.includes('aria-label="Navegación principal"'), `${slug}: shared main navigation`)
  assert.ok(html.includes('href="/#clientes"'), `${slug}: homepage section navigation`)
  for (const id of ["que-resolvemos", "en-tu-negocio", "como-empezamos", "preguntas", "hablemos"]) assert.ok(html.includes(`id="${id}"`), `${slug}: ${id} destination`)
  assert.equal((html.match(/<details\b/g) || []).length, 3, `${slug}: usable questions`)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]))
  assert.ok(schemas.some((schema) => schema["@graph"]?.some((item) => item["@type"] === "Service" && item.url === `https://www.morbia.com.mx/servicios/${slug}`)), `${slug}: service schema`)
  const imageTag = [...html.matchAll(/<img\b[^>]+>/g)].map((match) => match[0]).find((tag) => tag.includes(encodeURIComponent(`/media/${slug}.`)))
  assert.ok(imageTag?.includes('srcSet='), `${slug}: responsive optimized image`)
  assert.ok(!html.includes(`/images/services/${slug}.jpg`), `${slug}: rejected photos removed`)
  console.log(`PASS /servicios/${slug}: content, navigation, schema, optimized image`)
}

const catalog = await (await fetch(`${base}/servicios-tecnologicos-puebla-tlaxcala`)).text()
const home = await (await fetch(base)).text()
for (const slug of slugs) {
  assert.ok(catalog.includes(`id="${slug}"`), `catalog anchor ${slug}`)
  assert.ok(catalog.includes(`href="/servicios/${slug}"`), `catalog service ${slug}`)
  assert.ok(home.includes(`href="/servicios/${slug}"`), `homepage card ${slug}`)
}
assert.ok(catalog.includes('loading="lazy"'), "catalog artwork lazy loading")
console.log("PASS catalog + homepage: all six direct service links, anchors and lazy artwork")
