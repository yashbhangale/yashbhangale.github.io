// Original public-safe diagrams. No source screenshot or client identifiers.
// Run from the project root: node scripts/generate-landing-zone-assets.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const dir = 'public/blog/images/aws-landing-zone'
await mkdir(dir, { recursive: true })
const ink = '#e9e4d6', muted = '#aeb8bd', line = '#70818e', amber = '#ffbd00'
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const text = (x, y, s, size = 20, color = ink, weight = 400) => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`
const box = (x,y,w,h,title,lines=[],accent=amber) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#151d24" stroke="#46535e"/><path d="M${x+18} ${y+22}h24" stroke="${accent}" stroke-width="3"/>${text(x+18,y+55,title,23,ink,700)}${lines.map((s,i)=>text(x+18,y+87+i*27,s,19,muted)).join('')}`
const arrow = (d, color=line, dashed=false) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" ${dashed?'stroke-dasharray="7 6"':''} marker-end="url(#arrow)"/>`
const start = (title,subtitle,h=900) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}" viewBox="0 0 1200 ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)} Original anonymized reference illustration. No client identifiers.</desc><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="${line}" stroke-width="1.5"/></marker></defs><rect width="1200" height="${h}" fill="#0c1116"/><g font-family="Arial, sans-serif">${text(48,65,title,38,ink,700)}${text(48,101,subtitle,20,muted)}`
const end = (h=900) => `<path d="M48 ${h-64}H1152" stroke="#34414b"/>${text(48,h-30,'Original reference diagram · Generic labels · Production details withheld',17,muted)}${text(1070,h-30,'YB',18,amber,700)}</g></svg>`

let s = start('An AWS foundation with clear boundaries','Governance at the top. Shared foundations below. Isolated application accounts.',970)
s += box(48,140,1104,142,'Management account',['AWS Organizations  /  Control Tower  /  consolidated billing','Governance and account provisioning; no application workloads'])
s += arrow('M600 282V318')
s += box(48,330,352,200,'Security / integrations OU',['Audit / security tooling','Log archive / audit evidence','Backup integration, if selected'],'#72c8bb')
s += box(424,330,352,200,'Infrastructure OU',['Network / shared services','Tooling / observability','Terraform baseline automation'],'#9ab6e9')
s += box(800,330,352,200,'Workloads OU',['Non-production: Dev / UAT','Production: separate accounts','Different access and controls'],amber)
s += '<path d="M224 318H976M224 318V330M600 318V330M976 318V330" fill="none" stroke="#70818e" stroke-width="2"/>'
s += box(48,566,536,151,'Sandbox OU',['Isolated experiments; named owners','Budgets, expiry, restricted connectivity'])
s += box(616,566,536,151,'Suspended OU',['Controlled retirement after review','Not an incident-containment shortcut'])
s += text(48,767,'Across accounts',22,ink,700)
s += text(48,804,'Identity Center access  /  SCP boundaries  /  central evidence  /  cost ownership',21,muted)
s += text(48,852,'OU placement must follow the selected Control Tower version and integration rules.',19,muted)
s += end(970)
await writeFile(`${dir}/overview.svg`,s)

s=start('Workforce access without shared credentials','Identity authentication, account authorization, and organization limits are separate.',790)
s+=box(48,155,336,160,'Corporate identity source',['Workforce groups and MFA','Provider intentionally unspecified'],'#72c8bb')
s+=box(468,155,336,160,'IAM Identity Center',['SAML sign-in / SCIM provisioning','Group-to-account assignments'],amber)
s+=arrow('M384 235H468')
s+=box(468,397,336,150,'Permission sets',['Job-specific policies','Reviewed session durations'],amber)
s+=arrow('M636 315V397')
s+=box(888,397,264,150,'Account role',['Temporary session','Console / CLI access'],'#9ab6e9')
s+=arrow('M804 473H888')
s+=box(48,397,336,150,'SCP boundary',['Limits member-account actions','Does not grant permissions'],'#9ab6e9')
s+=arrow('M216 547V594H1020V547',line,true)
s+=text(48,665,'Separate recovery path: secured, monitored, and tested before it is needed.',21,ink)
s+=end(790)
await writeFile(`${dir}/identity.svg`,s)

s=start('Private workload spokes, deliberate routes','Logical view in ap-south-1. Each AZ needs its own validated forward and return path.',1110)
s+=box(48,150,336,150,'Dev / UAT VPCs',['Private workload subnets','Separate account boundaries'],'#9ab6e9')
s+=box(468,150,336,150,'Production VPCs',['Private workload subnets','No default path from Dev'],amber)
s+=box(888,150,264,150,'Corporate network',['Approved hybrid link','DX / VPN as designed'],'#72c8bb')
s+=box(48,395,756,150,'Transit Gateway',['Explicit route-table associations and propagation','Segment production, non-production, and shared access'],amber)
s+=arrow('M216 300V395');s+=arrow('M636 300V395')
s+=arrow('M1020 300V468H804')
s+=box(48,635,336,180,'Inspection / egress VPC',['Network Firewall endpoints','NAT and internet egress','Symmetric stateful routing'],amber)
s+=box(468,635,336,180,'DNS / shared services',['Resolver endpoints and rules','Approved shared dependencies','Private DNS design'],'#72c8bb')
s+=box(888,635,264,180,'AWS endpoints',['Local S3 / DynamoDB','Interface endpoints','Policies and SGs'],'#9ab6e9')
s+=arrow('M216 545V635');s+=arrow('M636 545V635')
s+=arrow('M1020 635V568H1124V338H730V300',line,true)
s+=text(48,875,'Solid lines: routed connectivity subject to policy. Dashed line: private service dependency.',19,muted)
s+=text(48,916,'Gateway endpoints stay in each consuming VPC; they are not shared over Transit Gateway.',20,ink)
s+=text(48,961,'Resource sharing does not create routes, attachments, or application permissions.',20,muted)
s+=end(1110)
await writeFile(`${dir}/network.svg`,s)

s=start('An account is ready when its checks pass','A repeatable path from an approved request to an operable workload environment.',865)
s+=box(48,160,336,160,'1. Request and approve',['Owner, cost center, environment','OU, data class, network profile'])
s+=box(468,160,336,160,'2. Provision / govern',['Control Tower Account Factory','Selected version and baseline'])
s+=arrow('M384 240H468')
s+=box(468,405,336,160,'3. Apply Terraform',['Additional account baseline','Reviewed plan; scoped CI role'],'#9ab6e9')
s+=arrow('M636 320V405')
s+=box(888,405,264,160,'4. Verify evidence',['Access, logs, routes','Findings and restore'],'#72c8bb')
s+=arrow('M804 485H888')
s+=box(48,405,336,160,'5. Handover / operate',['Owners, runbooks, budgets','Access and drift reviews'],amber)
s+=arrow('M1020 565V624H216V565')
s+=text(600,655,'Pass',18,'#72c8bb',700)
s+=arrow('M1020 405V365H636V405',line,true)
s+=text(853,353,'Fail → remediate',18,muted)
s+=text(48,736,'Account creation is one step. Operational acceptance is the finish line.',23,ink,700)
s+=end(865)
await writeFile(`${dir}/account-lifecycle.svg`,s)

s=start('Building an AWS landing zone','A practical walkthrough for a large Indian retail enterprise',630)
s+=text(48,193,'Control Tower. Terraform. Clear ownership.',31,ink,700)
s+=box(48,249,336,170,'Governance',['Organizations / account OUs','Identity Center / SCPs'],amber)
s+=box(432,249,336,170,'Shared foundations',['Network / audit / security','Backup / operations'],'#72c8bb')
s+=box(816,249,336,170,'Workloads',['Separate Dev / UAT / Prod','Primary Region: Mumbai'],'#9ab6e9')
s+=arrow('M384 334H432');s+=arrow('M768 334H816')
s+=text(48,494,'Yash Bhangale',25,ink,700)
s+=text(48,530,'Anonymized implementation guide · Original diagrams',20,muted)
s+=end(630)
await writeFile(`${dir}/cover.svg`,s)
await sharp(Buffer.from(s)).png().toFile(`${dir}/cover.png`)
console.log(`Generated four diagrams and a 1200 × 630 social cover in ${dir}`)
