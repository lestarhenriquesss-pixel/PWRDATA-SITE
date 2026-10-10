(() => {
  'use strict';
  const header=document.getElementById('siteHeader'),links=[...document.querySelectorAll('#mainNav a')],sections=[...document.querySelectorAll('main>section[id]')];let frame=0;
  function paint(){frame=0;header.classList.toggle('is-scrolled',scrollY>72);const line=header.getBoundingClientRect().bottom+85;let active='';for(const section of sections){const rect=section.getBoundingClientRect();if(rect.top<=line&&rect.bottom>line){active='#'+section.id;break}}links.forEach(link=>{if(link.getAttribute('href')===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}
  function requestPaint(){if(!frame)frame=requestAnimationFrame(paint)}addEventListener('scroll',requestPaint,{passive:true});addEventListener('resize',requestPaint,{passive:true});paint();
})();
