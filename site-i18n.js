/* Bind original sources once: switching languages never translates a translation. */
(() => {
  const catalog = window.PortfolioCatalog, selector = document.getElementById('portfolio-language');
  if (!catalog || !selector) return;
  const key = 'stefanie-portfolio-language', supported = ['zh-CN','zh-TW','en'];
  const normalize = text => text.replace(/\s+/g,' ').trim();
  const textBindings = new WeakMap(), attributeBindings = new WeakMap();
  const rows = new Map(Object.entries(catalog.text));
  for (const row of Object.values(catalog.text)) for (const value of row) if (!rows.has(normalize(value))) rows.set(normalize(value),row);
  let lang = 'zh-CN', observer, queued = false;
  const index = () => supported.indexOf(lang);
  const rowFor = text => rows.get(normalize(text));
  const t = (source, parameters = {}) => {
    const row = catalog.ui[source] || rowFor(String(source));
    let value = row ? row[index()] : String(source);
    for (const [name,content] of Object.entries(parameters)) value = value.replaceAll('{'+name+'}',content);
    return value;
  };
  const ignored = el => !el || el.closest('script,style,template,svg,[translate="no"],[data-i18n]');
  const observe = () => observer?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['alt','aria-label','title','placeholder']});
  const translate = (root = document.body) => {
    observer?.disconnect();
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const row=catalog.ui[el.dataset.i18n];
      if(row && el.textContent!==row[index()]) el.textContent=row[index()];
    });
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())) {
      if(ignored(node.parentElement)||!normalize(node.data)) continue;
      let binding=textBindings.get(node);
      if(!binding||node.data!==binding.last) {
        const row=rowFor(node.data); if(!row) continue;
        binding={row,prefix:node.data.match(/^\s*/)[0],suffix:node.data.match(/\s*$/)[0]};
        textBindings.set(node,binding);
      }
      const value=binding.prefix+binding.row[index()]+binding.suffix;
      if(node.data!==value) node.data=value;
      binding.last=value;
    }
    root.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach(el => {
      if(el.closest('[translate="no"],svg')) return;
      let bindings=attributeBindings.get(el);
      if(!bindings) attributeBindings.set(el,bindings={});
      for(const attr of ['alt','aria-label','title','placeholder']) {
        const source=el.getAttribute(attr); if(!source) continue;
        let binding=bindings[attr];
        if(!binding||source!==binding.last) { const row=rowFor(source); if(!row) continue; binding=bindings[attr]={row}; }
        const value=binding.row[index()]; if(source!==value) el.setAttribute(attr,value); binding.last=value;
      }
    });
    root.querySelectorAll('[data-reading-language]').forEach(el => { el.hidden=el.dataset.readingLanguage==='en'?lang!=='en':lang==='en'; });
    observe();
  };
  const page=location.pathname.split('/').pop();
  const seo={
    'case-fogatti.html':['seo.fogattiTitle','seo.fogattiDesc'],
    'case-empstorm.html':['seo.empstormTitle','seo.empstormDesc'],
    'case-data-system.html':['seo.dataTitle','seo.dataDesc'],
    'case-ai-tool.html':['seo.aiTitle','seo.aiDesc']
  };
  const setMetadata=() => {
    const entry=seo[page]||['seo.homeTitle','seo.homeDesc'];
    document.title=t(entry[0]);
    for(const [attr,name,content] of [['name','description',t(entry[1])],['property','og:title',document.title],['property','og:description',t(entry[1])]]) {
      let el=document.head.querySelector(`meta[${attr}="${name}"]`);
      if(!el){el=document.createElement('meta');el.setAttribute(attr,name);document.head.append(el);} el.content=content;
    }
  };
  const setLanguage=(next,preserve=true) => {
    if(!supported.includes(next)) next='zh-CN';
    const locked=document.body.style.position==='fixed';
    const anchor=preserve&&!locked&&[...document.querySelectorAll('main section,main .hero-context')].find(el=>{const r=el.getBoundingClientRect();return r.bottom>120&&r.top<innerHeight;});
    const offset=anchor ? anchor.getBoundingClientRect().top : 0, y=scrollY;
    lang=next; document.documentElement.lang=next; selector.value=next;
    translate(); setMetadata();
    try{localStorage.setItem(key,next);}catch{}
    document.dispatchEvent(new CustomEvent('portfolio:languagechange',{detail:{language:next}}));
    if(preserve&&!locked) requestAnimationFrame(()=>window.scrollTo({top:anchor?scrollY+anchor.getBoundingClientRect().top-offset:y,behavior:'instant'}));
  };
  window.PortfolioI18n={t,translate,setLanguage,get language(){return lang;}};
  let saved;try{saved=localStorage.getItem(key);}catch{}
  setLanguage(saved||document.documentElement.lang,false);
  selector.addEventListener('change',()=>setLanguage(selector.value));
  window.addEventListener('storage',event=>{if(event.key===key&&event.newValue!==lang)setLanguage(event.newValue);});
  observer=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;translate();});});
  observe();
  window.addEventListener('pagehide',()=>observer.disconnect());
  window.addEventListener('pageshow',observe);
})();
