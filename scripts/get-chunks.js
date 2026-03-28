#!/usr/bin/env node
// Usage: node scripts/get-chunks.js "Software Engineer" "Product Manager"
// Outputs the top matching transcript chunks as plain text for use in generation.

"use strict";

const fs = require("fs");
const path = require("path");

const [,, fromRole, toRole] = process.argv;
if (!fromRole || !toRole) { console.error("Usage: node get-chunks.js <from> <to>"); process.exit(1); }

const corpus = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/corpus.json"), "utf-8"));

const STOP = new Set(["a","an","the","and","or","of","in","at","by","for","with","on","as","it","is","be","do","to","this","that","was","are","from","has","had","have","will","would","could","should","may","can","not","but","i","my","we","you","he","she","they"]);
const NOISE = new Set(["senior","junior","lead","staff","principal","head","director","vp","associate","manager","executive","chief","svp","evp","founding","interim","global","regional"]);
const EXP = {product:["pm","roadmap","prioriti","strateg","stakeholder","discovery"],engineer:["technolog","architect","system","infrastructur","code","softwar"],software:["engineer","code","technolog","developer","backend","frontend"],market:["growth","acqui","brand","channel","funnel","campaign","demand"],data:["analyt","metric","insight","sql","experiment","dashboard"],founder:["startup","ventur","fundrais","cofound","pitch","investor","compani"],design:["ux","research","usabl","user","wireframe","prototype"],sales:["revenue","close","pipeline","quota","crm","prospect","deal"],oper:["process","effici","scale","execut","workflow","ops"],consult:["client","strateg","framework","deliverable","advise"],manag:["team","hire","lead","report","perform"],financ:["cfo","budget","forecast","investor","model"],growth:["acqui","retent","activ","conver","funnel","experiment","market"],ux:["design","research","usabl","user","interview"],cto:["technolog","engineer","architect","system"],ceo:["founder","strateg","compani","leadership","vision"],analyt:["data","metric","sql","insight","experiment"],research:["user","interview","insight","data","qualit"],strateg:["product","compani","market","vision","roadmap"]};

function stem(w){if(w.length>6&&w.endsWith("ment"))return w.slice(0,-4);if(w.length>6&&w.endsWith("tion"))return w.slice(0,-4);if(w.length>6&&w.endsWith("ing"))return w.slice(0,-3);if(w.length>5&&w.endsWith("ers"))return w.slice(0,-3);if(w.length>5&&w.endsWith("ies"))return w.slice(0,-3)+"y";if(w.length>5&&w.endsWith("er"))return w.slice(0,-2);if(w.length>4&&w.endsWith("s")&&!w.endsWith("ss"))return w.slice(0,-1);return w;}
function kw(role){const s=new Set();for(const w of role.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w=>w.length>=3)){if(!STOP.has(w)&&!NOISE.has(w))s.add(stem(w));}return Array.from(s);}
function expand(stems){const e=new Set(stems);for(const s of stems)for(const[k,v]of Object.entries(EXP))if(k.startsWith(s)||s.startsWith(k))for(const r of v)e.add(r);return Array.from(e);}

const cs=expand(kw(fromRole)), ts=expand(kw(toRole));
const wm=new Map();
for(const s of cs)wm.set(s,Math.max(wm.get(s)||0,1.0));
for(const s of ts)wm.set(s,Math.max(wm.get(s)||0,1.5));

const scored=corpus.map(e=>{
  const toks=e.text.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>=3);
  if(!toks.length)return{...e,score:0};
  const freq=new Map();for(const t of toks)freq.set(t,(freq.get(t)||0)+1);
  let sc=0,ch=0,th=0;
  for(const[term,w]of wm.entries()){let c=0;for(const[tok,n]of freq.entries())if(tok.startsWith(term))c+=n;if(c>0){sc+=(c/toks.length)*w;if(cs.includes(term))ch++;if(ts.includes(term))th++;}}
  const ttoks=`${e.title} ${e.guest}`.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>=3);
  const tf=new Map();for(const t of ttoks)tf.set(t,(tf.get(t)||0)+1);
  let ts2=0;for(const[term,w]of wm.entries()){let c=0;for(const[tok,n]of tf.entries())if(tok.startsWith(term))c+=n;if(c>0)ts2+=(c/Math.max(ttoks.length,1))*w*5;}
  let score=sc+ts2;if(ch>0&&th>0)score*=1.4;if(e.sparse)score*=0.5;
  return{...e,score};
}).filter(e=>e.score>=0.001).sort((a,b)=>b.score-a.score).slice(0,12);

const MAX=3000;
console.log(`TRANSITION: ${fromRole} → ${toRole}\n`);
console.log(`${scored.length} relevant episodes found.\n`);
for(const ep of scored){
  const text=ep.text.length>MAX?ep.text.slice(0,MAX)+"...":ep.text;
  console.log(`=== ${ep.title}${ep.guest?` | Guest: ${ep.guest}`:""} ===`);
  console.log(text);
  console.log();
}
