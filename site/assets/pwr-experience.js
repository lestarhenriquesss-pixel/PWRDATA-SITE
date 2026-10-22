(() => {
  'use strict';
  const $=id=>document.getElementById(id),root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  // Extend the existing local contact contract, with no new transport or automatic send.
  window.PWR.offers.ai={label:'IA aplicada',context:'Assistentes e agentes com os seus dados, permissões e custos definidos no projeto.'};
  const initialInterest=new URL(location.href).searchParams.get('interesse');if(['embedded','commerce','dashboards','custom','integration','cloud','consulting','ai'].includes(initialInterest))window.PWR.selectInterest(initialInterest);
  const explorer=$('architectureExplorer');let explorerOpener=null;
  $('openArchitecture').addEventListener('click',event=>{explorerOpener=event.currentTarget;explorer.showModal();$('closeArchitectureExplorer').focus({preventScroll:true})});
  $('closeArchitectureExplorer').addEventListener('click',()=>explorer.close());
  explorer.addEventListener('close',()=>explorerOpener?.focus({preventScroll:true}));

  const examples={
    operations:{label:'Operações',question:'Como está a produção este mês?',answer:'Estamos 8% abaixo da meta. A planta 2 concentra a queda.',insight:'Paradas na linha 3, entre os dias 9 e 14, explicam a maior parte da diferença.',kpis:[['Produção','41,2 mil t','8% abaixo da meta'],['Planta 2','−15%','Principal ponto de atenção'],['Estoque','18 dias','Dentro da meta']],title:'Produção por mês',unit:'mil toneladas',bars:[80,84,76,90,85,70],values:[45,46,44,47,46,41]},
    sales:{label:'Comercial',question:'Onde estão as oportunidades de venda?',answer:'A receita cresceu 12% no exemplo. O canal digital concentra o avanço.',insight:'O mix de vendas mudou. A combinação de canal e ticket ajuda a entender de onde veio o crescimento.',kpis:[['Receita','R$ 1,24 mi','12% de crescimento'],['Canal digital','+24%','Maior avanço do período'],['Ticket médio','R$ 286','6% acima do período anterior']],title:'Receita por mês',unit:'R$ mil',bars:[49,58,54,72,81,94],values:[820,970,900,1100,1190,1240]},
    finance:{label:'Financeiro',question:'O que mudou no resultado financeiro?',answer:'A margem do exemplo chegou a 18,4%. Custos menores explicam parte da melhora.',insight:'A leitura reúne receita, custos e resultado. O financeiro consegue investigar a mudança no mesmo contexto.',kpis:[['Margem','18,4%','2,1 pontos acima'],['Custos','−6%','Redução no período'],['Caixa','R$ 420 mil','Visão de disponibilidade']],title:'Resultado por mês',unit:'R$ mil',bars:[42,51,48,62,75,89],values:[112,136,128,165,200,229]}
  };
  const demo=$('canvasDemo');let area='operations',demoAnimations=[];
  function renderDemo(key,keyboard=false){
    const data=examples[key];if(!data)return;
    area=key;demo.dataset.area=key;
    const fields={demoAreaLabel:data.label,demoQuestion:data.question,demoAnswer:data.answer,demoInsight:data.insight,demoChartTitle:data.title,demoChartUnit:data.unit};
    for(const [id,value] of Object.entries(fields))$(id).textContent=value;
    data.kpis.forEach((k,i)=>{['Label','Value','Note'].forEach((part,j)=>$('kpi'+part+(i+1)).textContent=k[j])});
    const bars=[...$('demoBars').querySelectorAll('i')];data.bars.forEach((height,i)=>bars[i].style.setProperty('--bar',height+'%'));
    $('demoBars').setAttribute('aria-label',data.title+', abril a setembro: '+data.values.join(', ')+'. Dados ilustrativos.');
    document.querySelectorAll('[data-demo-area]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.demoArea===key)));
    $('demoNotice').textContent='Exemplo interativo do produto. Sem consulta a dados reais.';
    demoAnimations.forEach(animation=>animation.cancel());demoAnimations=[];
    if(!reduced.matches&&!window.PWRMotionPaused&&!keyboard){
      [...demo.querySelectorAll('.demo-answer,.demo-insight,.demo-kpi')].forEach((node,i)=>demoAnimations.push(node.animate([{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:440,delay:i*55,easing:'cubic-bezier(.23,1,.32,1)'})));
      bars.forEach((bar,i)=>demoAnimations.push(bar.animate([{transform:'scaleY(.05)'},{transform:'scaleY(1)'}],{duration:700,delay:80+i*55,easing:'cubic-bezier(.23,1,.32,1)'})));
    }
  }
  document.querySelectorAll('[data-demo-area]').forEach(button=>button.addEventListener('click',event=>renderDemo(button.dataset.demoArea,event.detail===0)));
  $('canvasQuestionForm').addEventListener('submit',event=>{
    event.preventDefault();const query=$('canvasQuestionInput').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    let key=/produ|estoque|planta|operac/.test(query)?'operations':/vend|receita|comerc|canal|ticket/.test(query)?'sales':/financ|margem|custo|caixa|resultado/.test(query)?'finance':null;
    if(!key){$('demoNotice').textContent='Esta prévia usa perguntas de exemplo. Experimente produção, vendas ou financeiro.';return}
    renderDemo(key);$('canvasQuestionInput').value='';
  });
  new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!demo.dataset.introduced){demo.dataset.introduced='true';renderDemo(area)}},{threshold:.35}).observe(demo);

  // Keep the approved arc, with native reading hold and no cropped card window.
  const why=$('por-que-pwr'),viewport=$('whyViewport'),track=$('whyTrack'),cards=[...track.children];
  let manual=null,frame=0,whyVisible=false,arcIndex=0;
  function arcMode(){const sticky=innerWidth>=1000&&innerHeight>=800&&!reduced.matches&&parseFloat(getComputedStyle(root).fontSize)<=18;why.dataset.arcMode=sticky?'sticky':'list';return sticky}
  function drawArc(){
    frame=0;if(!arcMode()){track.style.transform='none';cards.forEach(card=>card.style.transform='none');return}
    const rect=why.getBoundingClientRect(),top=$('siteHeader').getBoundingClientRect().bottom+12,hold=120;
    const distance=Math.max(1,why.offsetHeight-why.firstElementChild.offsetHeight-hold),progress=Math.max(0,Math.min(1,(top-rect.top-hold)/distance));
    const index=manual===null?(window.PWRMotionPaused?arcIndex:progress*(cards.length-1)):manual,width=cards[0].offsetWidth,gap=24;
    arcIndex=index;if(viewport.scrollLeft)viewport.scrollLeft=0;track.style.transform='translateX('+(viewport.clientWidth/2-width/2-index*(width+gap))+'px)';
    cards.forEach((card,i)=>{const d=i-index;card.style.transform='translateY('+Math.min(95,d*d*28)+'px) rotate('+(d*5)+'deg)'});
  }
  function scheduleArc(){if(!frame&&whyVisible)frame=requestAnimationFrame(drawArc)}
  function stepArc(delta){if(!arcMode()){viewport.scrollBy({left:delta*(cards[0].offsetWidth+24),behavior:reduced.matches||window.PWRMotionPaused?'instant':'smooth'});return}manual=Math.max(0,Math.min(cards.length-1,(manual===null?Math.round(arcIndex):manual)+delta));drawArc()}
  $('whyPrev').addEventListener('click',()=>stepArc(-1));$('whyNext').addEventListener('click',()=>stepArc(1));
  viewport.addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();if(event.key==='Home'||event.key==='End'){manual=event.key==='Home'?0:cards.length-1;drawArc();viewport.scrollTo({left:event.key==='Home'?0:viewport.scrollWidth,behavior:'instant'})}else stepArc(event.key==='ArrowRight'?1:-1)}});
  new IntersectionObserver(entries=>{whyVisible=entries[0].isIntersecting;if(whyVisible)scheduleArc();else manual=null},{rootMargin:'100px'}).observe(why);
  addEventListener('scroll',()=>{manual=null;scheduleArc()},{passive:true});addEventListener('resize',drawArc,{passive:true});addEventListener('pwr:reading-change',()=>{manual=null;drawArc()});document.fonts.ready.then(drawArc);arcMode();
  reduced.addEventListener('change',()=>{demoAnimations.forEach(animation=>animation.cancel());drawArc()});

  const ecosystem=$('ecossistema'),logoField=ecosystem.querySelector('.ecosystem-logos'),slots=[...ecosystem.querySelectorAll('[data-ecosystem-slot]')];
  let fieldVisible=false,fieldFrame=0,slotMetrics=[];
  const clamp=value=>Math.max(0,Math.min(1,value)),smooth=value=>value*value*(3-2*value);
  function settleEcosystem(){slots.forEach(slot=>{slot.style.transform='translate3d(-50%,0,0)';slot.style.opacity='1'})}
  function drawEcosystem(){
    fieldFrame=0;if(reduced.matches||window.PWRMotionPaused){settleEcosystem();return}
    if(document.hidden||!fieldVisible)return;
    const origin=logoField.getBoundingClientRect().top,header=$('siteHeader').getBoundingClientRect().bottom,mobile=innerWidth<=800;
    const values=slotMetrics.map(({slot,top,size,side})=>{
      const center=origin+top+size/2,enter=smooth(clamp((innerHeight*1.04-center)/(innerHeight*.20))),exit=smooth(clamp((header+size/2+16-center)/(size+80)));
      const missing=1-enter,x=mobile?0:side*(missing*Math.min(100,innerWidth*.055)+exit*55),y=missing*40-exit*28;
      return {slot,x,y,rotation:mobile?0:side*(missing*5-exit*3),scale:1-missing*.045-exit*.025,opacity:enter*(1-exit)};
    });
    values.forEach(({slot,x,y,rotation,scale,opacity})=>{slot.style.transform=`translate3d(calc(-50% + ${x.toFixed(2)}px),${y.toFixed(2)}px,0) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(4)})`;slot.style.opacity=opacity.toFixed(4)});
  }
  function scheduleEcosystem(){if(!fieldFrame&&(fieldVisible||reduced.matches||window.PWRMotionPaused))fieldFrame=requestAnimationFrame(drawEcosystem)}
  function measureEcosystem(){slotMetrics=slots.map(slot=>({slot,top:slot.offsetTop,size:slot.offsetHeight,side:parseFloat(slot.style.getPropertyValue('--slot-x'))<50?-1:1}));scheduleEcosystem()}
  new IntersectionObserver(entries=>{fieldVisible=entries[0].isIntersecting;scheduleEcosystem()},{rootMargin:'160px'}).observe(ecosystem);
  addEventListener('scroll',scheduleEcosystem,{passive:true});addEventListener('resize',measureEcosystem,{passive:true});
  addEventListener('pwr:reading-change',measureEcosystem);addEventListener('pwr:motion-change',scheduleEcosystem);reduced.addEventListener('change',scheduleEcosystem);
  document.addEventListener('visibilitychange',scheduleEcosystem);document.fonts.ready.then(measureEcosystem);measureEcosystem();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('experience-visible',entry.isIntersecting)),{threshold:.12});
  document.querySelectorAll('.experience-region').forEach(section=>observer.observe(section));
  document.addEventListener('visibilitychange',()=>document.body.classList.toggle('experience-sleeping',document.hidden));
})();
