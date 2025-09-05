const $ = (s) => document.querySelector(s);
const y = new Date().getFullYear();
if ($('#y')) $('#y').textContent = y;

async function loadProjects(){
  const res = await fetch('/data/projects.json', {cache:'no-store'});
  const items = await res.json();
  const wrap = $('#projects');
  wrap.innerHTML = items.map(renderCard).join('');
}
function esc(s){ return (s??'').replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m])); }
function renderCard(p){
  return `
  <article class="card" aria-labelledby="${esc(p.id)}-h">
    <h3 id="${esc(p.id)}-h">${esc(p.title)}</h3>
    <p class="desc">${esc(p.subtitle)}</p>
    <div class="badges">${p.stack.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
    <div class="links">
      ${p.demo?`<a class="btn" href="${esc(p.demo)}" target="_blank" rel="noopener">Live Demo</a>`:''}
      ${p.repo?`<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">Code</a>`:''}
      ${p.case?`<a class="btn" href="${esc(p.case)}">Case Study</a>`:''}
    </div>
  </article>`;
}
loadProjects();
