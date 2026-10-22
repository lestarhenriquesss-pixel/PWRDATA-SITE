(() => {
  'use strict';
  const $=id=>document.getElementById(id),reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
  const engine=window.gsap;
  if(engine&&window.CustomEase){engine.registerPlugin(window.CustomEase);window.CustomEase.create('pwrOut','.23,1,.32,1');}
  const animations=new Map();
  function enter(container,instant=false){
    const previous=animations.get(container);if(previous)previous.kill();animations.delete(container);
    const nodes=[...container.querySelectorAll('.scene-node')];if(!nodes.length)return;
    if(!engine||reduced.matches||instant||document.hidden||window.PWRMotionPaused){if(engine)engine.set(nodes,{clearProps:'transform,opacity'});return}
    const timeline=engine.timeline({onComplete:()=>{if(animations.get(container)===timeline)animations.delete(container)}});
    timeline.fromTo(nodes,{opacity:.12,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)',duration:.44,stagger:.045,ease:'pwrOut',clearProps:'transform,opacity'});
    animations.set(container,timeline);
  }
  window.PWRMotion={enter};
  document.querySelectorAll('[data-offer-scene]').forEach(el=>el.innerHTML=window.PWRScenes.offer(el.dataset.offerScene));

  const stage=$('architectureStage'),stack=$('layerStack'),panel=$('architecturePanel'),choices=[...document.querySelectorAll('[data-layer]')],floors=[...document.querySelectorAll('[data-floor]')];
  const layers={
    cloud:{label:'Arquitetura e operação',title:'Uma base para a próxima versão.',text:'Ambientes, acesso e publicação sustentam o produto enquanto ele evolui.'},
    data:{label:'Dados',title:'Informação que faz sentido.',text:'Fontes e regras dão contexto aos indicadores que sua empresa usa para decidir.'},
    integration:{label:'Integrações',title:'Uma operação que continua.',text:'Um evento no produto segue para os sistemas certos, com regras e acompanhamento.'},
    experience:{label:'Experiência',title:'O produto encontra as pessoas.',text:'Jornada, identidade e interface tornam a criação clara para quem vai usar.'}
  };
  let selected=null,archAnimation=null,origin=null;
  function indicators(key){choices.forEach(el=>{el.setAttribute('aria-expanded',String(el.dataset.layer===key));el.classList.toggle('selected',el.dataset.layer===key)});floors.forEach(el=>el.setAttribute('aria-expanded',String(el.dataset.floor===key)))}
  function stopArch(){if(archAnimation){archAnimation.kill();archAnimation=null}}
  function settleMotion(){
    animations.forEach((animation,container)=>{animation.kill();if(engine)engine.set(container.querySelectorAll('.scene-node'),{clearProps:'transform,opacity'})});
    animations.clear();stopArch();
    if(engine){engine.set(stack,{opacity:selected?0:1,transform:'none'});engine.set(panel,{opacity:selected?1:0,transform:selected||reduced.matches?'none':'translateY(12px) scale(.96)'})}
    panel.hidden=!selected;panel.inert=!selected;stack.inert=Boolean(selected);
  }
  function closeArchitecture(keyboard=false,restore=false){if(!selected)return;const last=selected;selected=null;indicators(null);stage.classList.remove('is-open');panel.inert=true;stack.inert=false;stack.removeAttribute('aria-hidden');if(engine){stopArch();if(keyboard||reduced.matches){engine.set(panel,{opacity:0,transform:'translateY(12px) scale(.96)'});engine.set(stack,{opacity:1,transform:'scale(1)'});panel.hidden=true}else{archAnimation=engine.timeline({onComplete:()=>{if(!selected)panel.hidden=true}}).to(panel,{opacity:0,transform:'translateY(12px) scale(.96)',duration:.22,ease:'pwrOut'},0).to(stack,{opacity:1,transform:'scale(1)',duration:.38,ease:'pwrOut'},0)}}else{panel.hidden=true;stack.style.opacity='1'}if(restore)(origin||choices.find(el=>el.dataset.layer===last)).focus({preventScroll:!keyboard})}
  function openArchitecture(key,trigger,keyboard=false){if(selected===key){closeArchitecture(keyboard);return}const o=layers[key];if(!o)return;const alreadyOpen=Boolean(selected);selected=key;origin=trigger;indicators(key);stage.classList.add('is-open');$('architecturePanelLabel').textContent=o.label;$('architecturePanelTitle').textContent=o.title;$('architecturePanelText').textContent=o.text;$('architectureDetail').dataset.detail='layer-'+key;$('architectureDiagram').innerHTML=window.PWRScenes.architecture(key);panel.hidden=false;panel.inert=false;stack.inert=true;stack.setAttribute('aria-hidden','true');stopArch();if(engine){if(keyboard||reduced.matches){engine.set(stack,{opacity:0,transform:'scale(.92)'});engine.set(panel,{opacity:1,transform:'none'})}else{archAnimation=engine.timeline().to(stack,{opacity:0,transform:'scale(.92)',duration:.32,ease:'pwrOut'},0).to(panel,{opacity:1,transform:'translateY(0) scale(1)',duration:.44,ease:'pwrOut'},alreadyOpen?0:.06)}}else{stack.style.opacity='0';panel.style.opacity='1';panel.style.transform='none'}enter($('architectureDiagram'),keyboard);if(keyboard||trigger?.matches('[data-floor]'))$('architectureToggle').focus({preventScroll:true})}
  choices.forEach(el=>{el.addEventListener('click',event=>openArchitecture(el.dataset.layer,el,event.detail===0));el.addEventListener('pointerenter',()=>{if(fine.matches&&!selected)stage.dataset.preview=el.dataset.layer});el.addEventListener('pointerleave',()=>delete stage.dataset.preview);el.addEventListener('focus',()=>{if(!selected)stage.dataset.preview=el.dataset.layer});el.addEventListener('blur',()=>delete stage.dataset.preview)});
  floors.forEach(el=>el.addEventListener('click',event=>openArchitecture(el.dataset.floor,el,event.detail===0)));
  function frameArchitecture(event){if(selected&&matchMedia('(max-width:800px)').matches)stage.scrollIntoView({block:'center',behavior:event.detail===0||reduced.matches?'auto':'smooth'})}
  [...choices,...floors].forEach(el=>el.addEventListener('click',frameArchitecture));
  $('architectureToggle').addEventListener('click',event=>closeArchitecture(event.detail===0,true));
  panel.addEventListener('click',event=>{if(event.target===panel||event.target.closest('.architecture-diagram'))closeArchitecture(event.detail===0,true)});
  $('arquitetura').addEventListener('keydown',event=>{if(event.key==='Escape'&&selected){event.preventDefault();closeArchitecture(true,true)}});

  const phases={
    understand:{label:'O ponto de partida',title:'Uma pergunta. <br>Uma direção.',text:'Ouvimos sua ideia e entendemos o que precisa mudar para quem vai usar.',output:'Objetivo, pessoas e prioridades.'},
    design:{label:'O desenho da criação',title:'A intenção <br>ganha estrutura.',text:'Jornada, identidade e arquitetura viram um desenho que você consegue avaliar.',output:'Experiência, conexões e plano.'},
    build:{label:'As partes ganham função',title:'O desenho <br>começa a funcionar.',text:'Construímos interface, regras e conexões. Cada entrega passa por validação.',output:'Produto, integração e testes.'},
    evolve:{label:'A criação em movimento',title:'No ar. <br>E pronta para evoluir.',text:'Publicamos, acompanhamos o uso e combinamos os próximos passos.',output:'Operação, cuidado e evolução.'}
  };
  const phaseTabs=[...document.querySelectorAll('[data-phase]')];let phase=null,phaseHover=null;
  function cancelPhaseHover(){if(phaseHover!==null)clearTimeout(phaseHover);phaseHover=null}
  function selectPhase(key,instant=false){cancelPhaseHover();if(phase===key)return;const o=phases[key];if(!o)return;phase=key;phaseTabs.forEach(tab=>{const active=tab.dataset.phase===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});$('makingPanel').setAttribute('aria-labelledby','phase-'+key);$('makingPanel').dataset.phase=key;$('makingLabel').textContent=o.label;$('makingTitle').innerHTML=o.title;$('makingText').textContent=o.text;$('makingOutput').textContent=o.output;$('makingDetail').dataset.detail='step-'+key;$('makingArt').innerHTML=window.PWRScenes.process(key);enter($('makingArt'),instant)}
  phaseTabs.forEach(tab=>{
    tab.addEventListener('click',event=>selectPhase(tab.dataset.phase,event.detail===0));
    tab.addEventListener('pointerenter',()=>{
      cancelPhaseHover();if(!fine.matches||document.hidden)return;
      phaseHover=setTimeout(()=>{
        phaseHover=null;if(!fine.matches||document.hidden||!tab.isConnected)return;
        const rect=tab.getBoundingClientRect();if(rect.bottom<=0||rect.top>=innerHeight)return;
        selectPhase(tab.dataset.phase);
      },110);
    });
    tab.addEventListener('pointerleave',cancelPhaseHover);
    tab.addEventListener('focus',cancelPhaseHover);
    tab.addEventListener('keydown',event=>{
      cancelPhaseHover();if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();const i=phaseTabs.indexOf(tab),next=event.key==='Home'?0:event.key==='End'?phaseTabs.length-1:(i+(event.key==='ArrowRight'?1:phaseTabs.length-1))%phaseTabs.length;
      selectPhase(phaseTabs[next].dataset.phase,true);phaseTabs[next].focus();
    });
  });selectPhase('understand',true);

  const questions=[...document.querySelectorAll('.contact-questions details')];questions.forEach(details=>details.addEventListener('toggle',()=>{if(details.open)questions.forEach(other=>{if(other!==details)other.open=false})}));
  const reveals=[...document.querySelectorAll('.reveal')];document.body.classList.add('js-ready');const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');revealObserver.unobserve(entry.target)}}),{threshold:.06});reveals.forEach(el=>revealObserver.observe(el));
  const lightSection=$('arquitetura');
  new IntersectionObserver(entries=>lightSection.classList.toggle('light-active',entries[0].isIntersecting),{threshold:0}).observe(lightSection);
  function watchPreference(query,callback){if(query.addEventListener)query.addEventListener('change',callback);else query.addListener?.(callback)}
  watchPreference(reduced,()=>{
    cancelPhaseHover();if(reduced.matches)settleMotion();else if(!selected&&engine)engine.set(panel,{clearProps:'transform'});
  });
  watchPreference(fine,()=>{cancelPhaseHover();if(!fine.matches)delete stage.dataset.preview});
  addEventListener('pwr:motion-change',()=>{if(window.PWRMotionPaused)settleMotion()});
  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('tab-sleeping',document.hidden);
    if(document.hidden){cancelPhaseHover();settleMotion()}
  });
  const cardObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('scene-live',entry.isIntersecting)),{threshold:.15});document.querySelectorAll('.creation-card,.making-board').forEach(el=>cardObserver.observe(el));
})();
