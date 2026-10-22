(() => {
  'use strict';
  const recipient=['diego.henriques','pwrdata.com.br'].join('@');
  const channels={email:'mailto:'+recipient,instagram:null,facebook:null,whatsapp:null,linkedin:null};
  window.PWRContact={recipient,channels};
  const channelHint=document.getElementById('channelHint');let channelOpener=null;
  document.querySelectorAll('[data-channel]').forEach(el=>{const url=channels[el.dataset.channel];if(url){if(el.tagName==='A')el.href=url;else el.addEventListener('click',()=>{location.href=url});return}el.addEventListener('click',()=>{channelOpener=el;channelHint.hidden=false;document.getElementById('closeChannelHint').focus({preventScroll:true})})});
  function closeChannel(){channelHint.hidden=true;if(channelOpener)channelOpener.focus({preventScroll:true})}
  document.getElementById('closeChannelHint').addEventListener('click',closeChannel);channelHint.querySelector('a').addEventListener('click',()=>channelHint.hidden=true);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!channelHint.hidden)closeChannel()});

  const root=document.documentElement,system=matchMedia('(prefers-color-scheme:dark)');
  const themeButton=document.getElementById('themeToggle'),themeSelect=document.getElementById('readingTheme');
  function paintTheme(preference){
    root.dataset.themePreference=preference;
    root.dataset.pwrTheme=preference==='auto'?(system.matches?'dark':'light'):preference;
    document.querySelectorAll('main [data-pwr-theme]:not(.solution-index)').forEach(section=>{section.dataset.lightTheme ||= section.dataset.pwrTheme;section.dataset.pwrTheme=root.dataset.pwrTheme==='dark'?'dark':section.dataset.lightTheme});
    document.querySelectorAll('[data-reading-theme]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.readingTheme===preference)));
    themeButton.setAttribute('aria-label',root.dataset.pwrTheme==='dark'?'Ativar tema claro':'Ativar tema escuro');
    themeButton.setAttribute('aria-pressed',String(root.dataset.pwrTheme==='dark'));
    themeSelect.value=preference;
    document.querySelector('meta[name="theme-color"]').content=root.dataset.pwrTheme==='dark'?'#14161b':'#ffffff';
    document.querySelectorAll('img.logo-light,img.logo-dark').forEach(image=>{const local=image.closest('[data-pwr-theme]')||root;image.dataset.logoVisible=String(image.classList.contains('logo-dark')===(local.dataset.pwrTheme==='dark'))});
    try{localStorage.setItem('pwr-site-theme',preference)}catch{}
    dispatchEvent(new Event('pwr:theme-change'));
  }
  themeButton.addEventListener('click',()=>paintTheme(root.dataset.pwrTheme==='dark'?'light':'dark'));
  themeSelect.addEventListener('change',()=>paintTheme(themeSelect.value));
  system.addEventListener('change',()=>{if(root.dataset.themePreference==='auto')paintTheme('auto')});
  paintTheme(root.dataset.themePreference||'dark');
  const header=document.getElementById('siteHeader'),menu=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
  const glyph=name=>`<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/ui-icons.svg#${name}"/></svg>`;
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');menu.innerHTML=glyph('menu')}
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');menu.innerHTML=glyph(open?'x':'menu')});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
  document.addEventListener('pwr:reading-open',closeMenu);
  const links=[...nav.querySelectorAll('a')],sections=[...document.querySelectorAll('main>section[id]')];let frame=0;
  const solutionIndex=document.querySelector('.solution-index'),solutionSections=[...document.querySelectorAll('.solution-entry')];
  function paintSolutionIndex(){
    if(!solutionIndex||!solutionSections.length)return;
    const rect=solutionIndex.getBoundingClientRect(),line=rect.top+rect.height/2;
    solutionIndex.classList.toggle('is-after-solutions',solutionSections.at(-1).getBoundingClientRect().bottom<=rect.bottom);
    let active=solutionSections[0];for(const section of solutionSections){if(section.getBoundingClientRect().top<=line)active=section;else break}
    solutionIndex.dataset.pwrTheme=active.dataset.pwrTheme||root.dataset.pwrTheme;
    solutionIndex.querySelectorAll('a').forEach(link=>{if(link.hash==='#'+active.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
  }
  function paint(){frame=0;header.classList.toggle('over-hero',!!document.querySelector('.hero')&&scrollY<72);const back=document.getElementById('backTop');if(back)back.hidden=scrollY<=240;header.classList.toggle('is-scrolled',scrollY>72);let section='';const line=header.getBoundingClientRect().bottom+85;for(const item of sections){const r=item.getBoundingClientRect();if(r.top<=line&&r.bottom>line){section='#'+item.id;break}}links.forEach(link=>{const url=new URL(link.href),same=url.pathname===location.pathname;if(same&&((url.hash&&url.hash===section)||(!url.hash&&location.pathname!=='/')))link.setAttribute('aria-current',url.hash?'location':'page');else link.removeAttribute('aria-current')})}
  function refresh(){paint();paintSolutionIndex()}
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(refresh)},{passive:true});
  addEventListener('resize',refresh,{passive:true});addEventListener('pwr:theme-change',refresh);addEventListener('pwr:reading-change',refresh);refresh();
  const signature=document.querySelector('.footer-signature');if(signature)new IntersectionObserver(entries=>{if(entries[0].isIntersecting)signature.classList.add('is-written')},{threshold:.2}).observe(signature);
})();
