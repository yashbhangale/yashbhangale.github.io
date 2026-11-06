// Genuine public AWS screenshots; deterministic opaque redaction, no generative edits.
// Run: node scripts/prepare-aws-reference-screenshots.mjs
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const destination = 'public/blog/images/aws-landing-zone/references'
await mkdir(destination, { recursive: true })
const sources = JSON.parse(await readFile('scripts/aws-reference-screenshots.json', 'utf8'))
const manifest=[]
for (const item of sources) {
  const response=await fetch(item.url)
  if(!response.ok)throw new Error(`Download failed: ${response.status} ${item.url}`)
  const original=Buffer.from(await response.arrayBuffer())
  const meta=await sharp(original).metadata()
  const maskScale = item.maskBasisWidth ? meta.width / item.maskBasisWidth : 1
  const masks = item.masks.map(rect => rect.map(value => Math.round(value * maskScale)))
  const maskSvg=`<svg width="${meta.width}" height="${meta.height}">${masks.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#151515"/>`).join('')}</svg>`
  const masked=await sharp(original).composite([{input:Buffer.from(maskSvg)}]).png().toBuffer()
  const cropped=item.crop?await sharp(masked).extract(item.crop).png().toBuffer():masked
  const {width,height}=await sharp(cropped).metadata()
  const footerHeight=52
  const footer=Buffer.from(`<svg width="${width}" height="${footerHeight}"><rect width="100%" height="100%" fill="#f1f3f5"/><path d="M0 0H${width}" stroke="#9aa6b2"/><g font-family="Arial,sans-serif" font-size="${width<800?12:15}" fill="#364152"><text x="12" y="20">AWS reference · source published ${item.year} · Identifiers redacted where present</text><text x="12" y="40">2025–2026 source · Not a client-environment screenshot</text></g></svg>`)
  const output=await sharp(cropped).extend({bottom:footerHeight,background:'#f1f3f5'}).composite([{input:footer,top:height,left:0}]).png().toBuffer()
  await writeFile(`${destination}/${item.name}.png`,output)
  manifest.push({...item,appliedMasks:masks,width,height:height+footerHeight,retrieved:'2026-11-07',sourceSha256:createHash('sha256').update(original).digest('hex'),outputSha256:createHash('sha256').update(output).digest('hex'),credit:'Screenshot: Amazon Web Services. Modified by cropping and/or opaque redaction only; attribution footer appended.'})
}
await writeFile(`${destination}/sources.json`,JSON.stringify(manifest,null,2)+'\n')
console.log(`Downloaded, redacted, and credited ${manifest.length} genuine AWS reference screenshots.`)
