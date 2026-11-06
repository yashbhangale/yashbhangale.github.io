// Original explanatory diagrams and redacted public reference screenshots.
// Run from the repository root: node scripts/generate-karpenter-blog-assets.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const dir='public/blog/images/karpenter-eks'
await mkdir(`${dir}/references`,{recursive:true})
const fg='#e9e4d6',muted='#aebbc4',amber='#ffbd00',teal='#77cbbd',blue='#a9c7f5'
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;')
const text=(x,y,s,size=23,color=fg,bold=false)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${bold?700:400}">${esc(s)}</text>`
const box=(x,y,w,h,title,lines=[],color=amber)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#151e26" stroke="#465562"/><path d="M${x+20} ${y+22}h32" stroke="${color}" stroke-width="3"/>${text(x+20,y+59,title,27,fg,true)}${lines.map((s,i)=>text(x+20,y+96+i*32,s,22,muted)).join('')}`
const arrow=(d,dashed=false)=>`<path d="${d}" fill="none" stroke="#8b9ba7" stroke-width="2.5" ${dashed?'stroke-dasharray="8 7"':''} marker-end="url(#a)"/>`
const head=(title,subtitle,w=1600,h=900)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)} Original reference illustration. No client identifiers.</desc><defs><marker id="a" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#8b9ba7" stroke-width="1.5"/></marker></defs><rect width="100%" height="100%" fill="#0c1116"/><g font-family="Arial, sans-serif">${text(56,76,title,43,fg,true)}${text(56,120,subtitle,23,muted)}`
const foot=(w=1600,h=900)=>`<path d="M56 ${h-70}H${w-56}" stroke="#34414c"/>${text(56,h-32,'Yash Bhangale · Anonymized engineering walkthrough',20,muted)}${text(w-350,h-32,'Original reference illustration',18,muted)}</g></svg>`

let svg=head('From SageMaker to shared GPU serving','Amazon EKS · NVIDIA time-slicing · Prometheus Adapter + HPA · Karpenter')
svg+=text(56,190,'Several models share g5.xlarge workers; HTTP demand drives the scaling loop.',27,fg,true)
svg+=box(56,248,440,176,'HTTP metrics',['Prometheus scrapes model demand','Per-model rate and labels'],blue)
svg+=box(580,248,440,176,'Prometheus Adapter + HPA',['Custom metrics → serving replicas','Pod scaling follows request demand'],teal)
svg+=box(1104,248,440,176,'Karpenter',['Eligible unschedulable pods','Provision another g5.xlarge'])
svg+=arrow('M496 334H580')+arrow('M1020 334H1104')
svg+=box(56,514,440,172,'Usual footprint: 1 node',['Multiple model pods share GPU','Warm replicas / readiness policy'],teal)
svg+=box(580,514,440,172,'Burst capacity: node 2',['More replicas need capacity','Time-slicing on eligible workers'],blue)
svg+=box(1104,514,440,172,'Target ceiling: 3 nodes',['Capacity limits and validation','Not an instant hard-limit promise'],blue)
svg+=arrow('M1324 424V466H800V514')+arrow('M1324 466V514')
svg+=text(56,761,'Reported outcome: approximately 60% lower model-serving bill.',29,amber,true)
svg+=text(56,803,'Combined migration, GPU sharing, request-driven replicas, and node autoscaling.',23,muted)
svg+=foot()
await writeFile(`${dir}/cover.svg`,svg)
await sharp(Buffer.from(svg)).png().toFile(`${dir}/cover.png`)

svg=head('Request demand becomes pod demand, then node demand','The metrics loop and the capacity loop make different decisions.',1600,1100)
svg+=box(56,175,440,165,'HTTP model traffic',['Application exposes request metrics','Model-ready pods serve responses'],blue)
svg+=box(580,175,440,165,'Prometheus + Adapter',['Scrape and calculate request rate','Expose Kubernetes custom metrics'],blue)
svg+=box(1104,175,440,165,'Horizontal Pod Autoscaler',['Compare demand with target','Adjust model Deployment replicas'],teal)
svg+=arrow('M496 258H580')+arrow('M1020 258H1104')
svg+=box(56,470,720,188,'Existing shared GPU capacity',['Scheduler tries CPU, RAM, and shared allocation slots','GPU memory and model readiness need separate checks'],teal)
svg+=box(860,470,684,188,'Karpenter + EC2',['Eligible unschedulable replicas trigger provisioning','g5.xlarge joins → GPU plugin initializes → model loads'])
svg+=arrow('M1324 340V405H416V470')
svg+=text(650,439,'New replica demand',21,muted)
svg+=arrow('M776 565H860')+text(788,542,'Pending',17,amber)
svg+=box(56,796,1488,145,'One usual worker; intended operating range up to three',['Multiple models share each accelerator through NVIDIA time-slicing. HPA does not set the node count directly.'],teal)
svg+=arrow('M1202 658V796')
svg+=foot(1600,1100)
await writeFile(`${dir}/architecture.svg`,svg)

svg=head('Time-slicing shares a GPU; it does not multiply its memory','Illustrative four-allocation example. The client sharing ratio is not disclosed.',1200,900)
svg+=box(56,185,500,355,'Advertised shared allocations',['Pod A requests one allocation','Pod B requests one allocation','Additional eligible model pods','Allocation count is configurable','These are not physical GPU counts'],teal)
svg+=box(644,185,500,355,'One physical accelerator',['All models use the same VRAM','Compute time is shared','No per-allocation memory partition','Concurrent loading must fit','Latency changes with contention'],blue)
svg+=arrow('M556 360H644')
svg+=text(56,625,'g5.xlarge hardware',28,fg,true)
svg+=text(56,673,'1 × NVIDIA A10G · 24 GB GPU memory · 4 vCPUs · 16 GiB host RAM',23,muted)
svg+=text(56,733,'Validate VRAM, host RAM, CPU, and model-ready latency together.',24,amber,true)
svg+=foot(1200,900)
await writeFile(`${dir}/workload-policy.svg`,svg)

svg=head('What a 60% reduction means','Normalized arithmetic illustrating the reported result. Not a billing export.',1200,740)
svg+=text(56,242,'SageMaker baseline index',26,fg,true)
svg+='<rect x="56" y="269" width="1000" height="73" rx="4" fill="#6c7d8c"/>'+text(1080,315,'100',29,fg,true)
svg+=text(56,421,'EKS serving comparison index',26,fg,true)
svg+='<rect x="56" y="448" width="400" height="73" rx="4" fill="#77cbbd"/>'+text(478,494,'40',29,fg,true)
svg+=text(56,602,'(100 − 40) ÷ 100 × 100 = 60% reduction',28,amber,true)
svg+=foot(1200,740)
await writeFile(`${dir}/cost-comparison.svg`,svg)

const page='https://aws.amazon.com/blogs/compute/plan-and-measure-ec2-flexibility-with-amazon-ec2-capacity-manager/'
const cdn='https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2026/11/04/'
const items=[
 {name:'capacity-fulfillment-2026',url:cdn+'ComputeBlog-2823-2.png',masks:[[48,345,101,270]],note:'Workload labels covered. Public source percentages, CPU metrics, and dates retained; not client results.'},
 {name:'capacity-supportability-2026',url:cdn+'ComputeBlog-2823-5.png',masks:[],note:'No client identifiers present. Public CPU-instance choices and example confidence estimates retained; not GPU results.'}
]
const sources=[]
for(const item of items){
 const r=await fetch(item.url);if(!r.ok)throw new Error(`Download failed: ${r.status}`)
 const original=Buffer.from(await r.arrayBuffer());const m=await sharp(original).metadata()
 const overlay=Buffer.from(`<svg width="${m.width}" height="${m.height}">${item.masks.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#151515"/>`).join('')}</svg>`)
 const masked=await sharp(original).composite([{input:overlay}]).png().toBuffer()
 const footer=Buffer.from(`<svg width="${m.width}" height="48"><rect width="100%" height="100%" fill="#f1f3f5"/><g font-family="Arial,sans-serif" font-size="13" fill="#364152"><text x="12" y="19">Public AWS reference (2026) · Identifiers redacted where present</text><text x="12" y="38">Source CPU examples retained · Not client screenshots or evidence of savings</text></g></svg>`)
 const output=await sharp(masked).extend({bottom:48,background:'#f1f3f5'}).composite([{input:footer,top:m.height,left:0}]).png().toBuffer()
 await writeFile(`${dir}/references/${item.name}.png`,output)
 sources.push({...item,page,sourcePublished:'2026-11-04',retrieved:'2026-11-07',sourceSha256:createHash('sha256').update(original).digest('hex'),outputSha256:createHash('sha256').update(output).digest('hex')})
}
await writeFile(`${dir}/references/sources.json`,JSON.stringify(sources,null,2)+'\n')
console.log('Generated cover, three diagrams, and two genuine public AWS reference screenshots.')
