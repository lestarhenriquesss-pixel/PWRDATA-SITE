(() => {
  'use strict';
  const $=id=>document.getElementById(id),root=document.documentElement,panel=$('readingDialog'),buttons=[$('openReading'),...document.querySelectorAll('[data-open-reading]')];
  const size=$('readingSize'),contrast=$('readingContrast'),motion=$('readingMotion'),sizes=['100','112','125','150'];
  let preferences={size:'100',contrast:false,paused:false},opener=buttons[0],pausedAnimations=[],lastPaused=null;
  const native=typeof panel.showPopover==='function';if(!native)panel.hidden=true;
  try{const saved=JSON.parse(localStorage.getItem('pwr-reading')||'null');if(saved)preferences={size:sizes.includes(saved.size)?saved.size:'100',contrast:saved.contrast===true,paused:saved.paused===true}}catch{}
  function apply(){
    root.style.fontSize=preferences.size+'%';root.classList.toggle('high-contrast',preferences.contrast);root.classList.toggle('motion-paused',preferences.paused);
    window.PWRMotionPaused=preferences.paused;size.value=preferences.size;contrast.checked=preferences.contrast;motion.checked=preferences.paused;
    $('readingSizeValue').textContent=preferences.size+'%';$('readingSmaller').disabled=preferences.size===sizes[0];$('readingLarger').disabled=preferences.size===sizes.at(-1);
    if(preferences.paused&&lastPaused!==true){pausedAnimations=document.getAnimations().filter(a=>a.playState==='running');pausedAnimations.forEach(a=>a.pause());window.gsap?.globalTimeline.pause()}
    else if(!preferences.paused&&lastPaused===true){pausedAnimations.forEach(a=>{if(a.playState==='paused')a.play()});pausedAnimations=[];window.gsap?.globalTimeline.resume()}
    lastPaused=preferences.paused;
    try{localStorage.setItem('pwr-reading',JSON.stringify(preferences))}catch{}
    dispatchEvent(new Event('pwr:reading-change'));dispatchEvent(new Event('pwr:motion-change'));
  }
  function isOpen(){return native?panel.matches(':popover-open'):!panel.hidden}
  function position(){if(!isOpen())return;const rect=opener.getBoundingClientRect(),height=panel.offsetHeight;panel.style.right=Math.max(16,Math.min(innerWidth-rect.right,innerWidth-panel.offsetWidth-16))+'px';let top=rect.bottom+10;if(top+height>innerHeight-16)top=Math.max(16,rect.top-height-10);panel.style.top=top+'px'}
  function sync(){buttons.forEach(b=>b.setAttribute('aria-expanded',String(isOpen())));if(isOpen())position()}
  function close(restore=false){if(native){if(isOpen())panel.hidePopover()}else panel.hidden=true;sync();if(restore)opener.focus({preventScroll:true})}
  buttons.forEach(button=>{button.setAttribute('aria-controls','readingDialog');button.setAttribute('aria-expanded','false');button.addEventListener('click',()=>{if(isOpen()&&opener===button){close(true);return}opener=button;if(native){if(!isOpen())panel.showPopover({source:opener})}else panel.hidden=false;document.dispatchEvent(new Event('pwr:reading-open'));sync()})});
  panel.addEventListener('toggle',sync);panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true)}});
  if(!native)document.addEventListener('pointerdown',event=>{if(isOpen()&&!panel.contains(event.target)&&!buttons.some(b=>b.contains(event.target)))close()});
  $('closeReading').addEventListener('click',()=>close(true));
  document.querySelectorAll('[data-reading-theme]').forEach(button=>button.addEventListener('click',()=>{$('readingTheme').value=button.dataset.readingTheme;$('readingTheme').dispatchEvent(new Event('change'));position()}));
  size.addEventListener('change',()=>{preferences.size=sizes.includes(size.value)?size.value:'100';apply();position()});
  for(const [id,direction] of [['readingSmaller',-1],['readingLarger',1]])$(id).addEventListener('click',()=>{size.value=sizes[Math.max(0,Math.min(sizes.length-1,sizes.indexOf(preferences.size)+direction))];size.dispatchEvent(new Event('change'))});
  contrast.addEventListener('change',()=>{preferences.contrast=contrast.checked;apply()});motion.addEventListener('change',()=>{preferences.paused=motion.checked;apply()});
  const synth=window.speechSynthesis,speak=$('readingSpeak'),status=$('readingSpeechStatus');let speaking=false,speechToken=0,utterance=null;
  function clearHighlight(){document.querySelectorAll('[data-reading-active]').forEach(el=>el.removeAttribute('data-reading-active'))}
  function stopSpeech(message='O trecho lido fica destacado.'){speechToken++;speaking=false;synth?.cancel();clearHighlight();speak.querySelector('span').textContent='Ouvir';speak.setAttribute('aria-pressed','false');status.textContent=message;utterance=null}
  function beginSpeech(){
    if(!synth||!window.SpeechSynthesisUtterance){status.textContent='A leitura em voz alta não está disponível neste navegador.';return}
    const candidates=[...document.querySelectorAll('main h1,main h2,main h3,main p,main li')].filter(el=>el.getClientRects().length&&!el.closest('dialog,[hidden],[aria-hidden="true"]')&&el.textContent.trim());
    if(!candidates.length)return;stopSpeech();speaking=true;const token=speechToken;speak.querySelector('span').textContent='Parar';speak.setAttribute('aria-pressed','true');
    function read(index){
      if(token!==speechToken)return;if(index>=candidates.length){stopSpeech('Leitura concluída.');return}
      const node=candidates[index];clearHighlight();node.dataset.readingActive='true';node.scrollIntoView({block:'center',behavior:preferences.paused||matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
      utterance=new SpeechSynthesisUtterance(node.textContent.trim());utterance.lang='pt-BR';const voice=synth.getVoices().find(v=>/^pt[-_]BR$/i.test(v.lang))||synth.getVoices().find(v=>v.lang.startsWith('pt'));if(voice)utterance.voice=voice;
      utterance.onstart=()=>{status.textContent='Lendo o trecho destacado.'};utterance.onend=()=>{if(token===speechToken)read(index+1)};
      utterance.onerror=event=>{if(token===speechToken&&event.error!=='canceled'&&event.error!=='interrupted')stopSpeech('A voz não está disponível. Você pode continuar lendo a página.')};synth.speak(utterance);
    }read(0);
  }
  speak.addEventListener('click',()=>speaking?stopSpeech():beginSpeech());if(!synth||!window.SpeechSynthesisUtterance){speak.disabled=true;status.textContent='Leitura em voz alta indisponível neste navegador.'}
  $('readingReset').addEventListener('click',()=>{stopSpeech();preferences={size:'100',contrast:false,paused:false};$('readingTheme').value='auto';$('readingTheme').dispatchEvent(new Event('change'));apply();position()});
  addEventListener('pagehide',()=>{if(speaking)stopSpeech()});addEventListener('resize',position,{passive:true});apply();
})();
