// Structural checks for submitted documentation and design artifacts; no application tests.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const failures = [];
function requireCheck(ok, message) { if (!ok) failures.push(message); }
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    if (['.git','node_modules','dist'].includes(entry.name)) return [];
    const p = path.join(dir,entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });
}
function headingIds(text) {
  const seen = new Map();
  return [...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map(match => {
    const base = match[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
    const count = seen.get(base)||0; seen.set(base,count+1);
    return count ? base+'-'+count : base;
  });
}
const markdown = walk(root).filter(file=>file.endsWith('.md'));
let links=0;
for(const file of markdown) {
  const body = fs.readFileSync(file,'utf8');
  requireCheck(!body.includes('<<'),path.relative(root,file)+': unresolved draft placeholder');
  for(const match of body.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    links++;
    const [relative,hash] = target.split('#');
    const resolved = relative ? path.resolve(path.dirname(file),relative) : file;
    if(!fs.existsSync(resolved)){failures.push(path.relative(root,file)+' -> missing '+target);continue;}
    if(hash && resolved.endsWith('.md')) requireCheck(headingIds(fs.readFileSync(resolved,'utf8')).includes(hash),path.relative(root,file)+' -> missing anchor '+target);
  }
}
const requirements = fs.readFileSync(path.join(root,'docs/06-requirements.md'),'utf8');
const cases = fs.readFileSync(path.join(root,'tests/README.md'),'utf8');
const expected=[...Array.from({length:19},(_,i)=>'T-'+String(i+1).padStart(2,'0')),'S-01','S-02','S-03','U-01','U-02','U-03','P-01','P-02','C-01','D-01'];
for(const id of expected) {
  requireCheck(cases.includes('| '+id+' |'),'Missing test scenario '+id);
  requireCheck(requirements.includes('| '+id+' |'),'Missing requirement/test mapping '+id);
}
requireCheck((requirements.match(/^\| FR-\d{2} \|/gm)||[]).length===19,'Expected 19 functional requirements');
requireCheck((requirements.match(/^\| NFR-\d{2} \|/gm)||[]).length===10,'Expected 10 non-functional requirements');
const assets=['01-search-results','02-tutor-profile-booking','03-checkout','04-tutor-dashboard','05-admin-verification','06-mobile-search'].map(name=>'prototype/'+name);
const diagrams=['System_Context_Diagram','Component_Diagram','Use_Case_Diagram'];
assets.push(...diagrams.map(name=>'diagrams/exports/'+name+'.drawio'));
for(const base of assets) {
  const svgFile=path.join(root,base+'.svg'),pngFile=path.join(root,base+'.png');
  if(!fs.existsSync(svgFile)||!fs.existsSync(pngFile)){failures.push('Missing SVG/PNG pair '+base);continue;}
  const svg=fs.readFileSync(svgFile,'utf8'),png=fs.readFileSync(pngFile);
  requireCheck(svg.includes('<title>')&&svg.includes('<desc>'),'Missing accessible SVG description '+base);
  requireCheck(png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'Invalid PNG signature '+base);
  const size=svg.match(/<svg[^>]*width="(\d+)" height="(\d+)"/);
  requireCheck(size&&Number(size[1])===png.readUInt32BE(16)&&Number(size[2])===png.readUInt32BE(20),'SVG/PNG dimension mismatch '+base);
}
for(const name of diagrams) {
  const xml=fs.readFileSync(path.join(root,'diagrams',name+'.drawio'),'utf8');
  const ids=new Set([...xml.matchAll(/<mxCell id="([^"]+)"/g)].map(m=>m[1]));
  requireCheck(ids.size>3,'Empty diagram '+name);
  for(const edge of xml.matchAll(/source="([^"]+)" target="([^"]+)"/g)) requireCheck(ids.has(edge[1])&&ids.has(edge[2]),'Dangling diagram endpoint '+name);
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`PASS: ${markdown.length} Markdown files, ${links} local links/anchors, 29 requirement/test mappings, 9 SVG/PNG pairs and 3 draw.io graphs.`);
