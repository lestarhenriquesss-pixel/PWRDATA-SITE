(() => {
  'use strict';

  const C = { light: 'var(--scene-ink)', amber: 'var(--scene-accent)', orange: 'var(--brand)', base: 'var(--scene-base)', line: 'var(--scene-line)' };
  let serial = 0;

  const text = (x, y, value, size = 18, color = C.light, anchor = 'middle') =>
    `<text x="${x}" y="${y}" fill="${color}" font-family="Inter, sans-serif" font-size="${size}" font-weight="500" text-anchor="${anchor}">${value}</text>`;
  const path = (d, color = C.line, width = 2, extra = '') =>
    `<path class="scene-path" d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const dot = (x, y, r = 4, color = C.amber) =>
    `<circle class="scene-node" cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  const mark = (x, y, size = 42, color = C.amber) =>
    `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 62 66" style="color:${color}" aria-hidden="true"><use href="assets/icons.svg#mark"/></svg>`;
  const panel = (id, x, y, w, h, radius = 12, extra = '') =>
    `<g class="scene-node" ${extra}><rect x="${x + 3}" y="${y + 7}" width="${w}" height="${h}" rx="${radius}" fill="${C.base}" opacity=".9"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.4"/></g>`;
  const glow = (id, x, y, rx, ry) =>
    `<ellipse class="scene-glow" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#${id}-light)"/>`;

  function svg(name, width, height, draw) {
    const id = 'pwr-scene-' + (++serial);
    return `<svg class="scene-svg scene-${name}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}-material" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.base}"/><stop offset="1" stop-color="${C.base}"/></linearGradient><linearGradient id="${id}-accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.amber}"/><stop offset="1" stop-color="${C.orange}"/></linearGradient><radialGradient id="${id}-light"><stop stop-color="${C.orange}" stop-opacity=".22"/><stop offset="1" stop-color="${C.orange}" stop-opacity="0"/></radialGradient></defs>${draw(id)}</svg>`;
  }

  const offers = {
    embedded: id => `${glow(id, 144, 113, 150, 106)}
      ${path('M166 118H218M218 62V172M218 62H286M218 118H286M218 172H286', C.line, 2.5)}
      ${path('M166 118H218V62H286', C.amber, 2.5)}
      ${panel(id, 40, 62, 126, 116, 18)}
      <path class="scene-node" d="M55 65H151V75H55Z" fill="${C.light}" opacity=".1"/>
      ${mark(79, 93, 48)}
      ${panel(id, 286, 44, 80, 36, 9)}${panel(id, 286, 100, 80, 36, 9)}${panel(id, 286, 156, 80, 36, 9)}
      ${path('M302 62H350M302 118H350M302 174H350', C.light, 2, 'opacity=".48"')}
      ${dot(218, 118, 5)}${dot(286, 62, 4)}
      ${text(103, 210, 'Portal', 17)}${text(219, 210, 'Acesso', 16, C.amber)}${text(326, 220, 'Públicos', 17)}`,

    commerce: id => `${glow(id, 97, 105, 126, 105)}
      ${path('M140 116C160 116 162 113 180 113M244 116C267 116 275 120 294 120', C.line, 2.5)}
      ${path('M140 116C160 116 162 113 180 113', C.amber, 2.5)}
      <g class="scene-node"><path d="M48 85H139V156H48Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/><path d="M42 84L57 57H130L145 84V96C139 103 130 103 124 96C118 103 109 103 103 96C97 103 88 103 82 96C76 103 67 103 61 96C55 103 47 102 42 96Z" fill="url(#${id}-accent)"/><path d="M66 117H121V156H66Z" fill="${C.base}" stroke="${C.light}" stroke-opacity=".2"/><path d="M48 164H139" stroke="${C.line}" stroke-width="3" stroke-linecap="round"/></g>
      <g class="scene-node" transform="rotate(7 213 116)"><rect x="180" y="82" width="64" height="72" rx="8" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/><path d="M180 102H244M213 82V102" fill="none" stroke="${C.amber}" stroke-width="2"/><path d="M196 126H228M196 137H216" stroke="${C.light}" stroke-opacity=".42" stroke-width="2" stroke-linecap="round"/></g>
      <g class="scene-node"><path d="M294 71L334 53L374 71L334 89Z" fill="url(#${id}-material)" stroke="${C.line}"/><path d="M294 98L334 116L374 98V112L334 130L294 112Z" fill="${C.line}" fill-opacity=".45" stroke="${C.line}"/><path d="M294 139L334 157L374 139V153L334 171L294 153Z" fill="${C.base}" stroke="${C.line}"/>${path('M295 71L334 89L373 71', C.amber, 2)}</g>
      ${dot(162, 115, 4)}${dot(270, 117, 4, C.light)}
      ${text(94, 209, 'Loja', 17)}${text(212, 209, 'Pedido', 17)}${text(334, 209, 'Gestão', 17)}`,

    dashboards: id => `${glow(id, 293, 109, 140, 106)}
      ${path('M42 49V181H377', C.line, 1.5, 'opacity=".7"')}
      ${path('M42 84H377M42 128H377', C.line, 1, 'opacity=".26"')}
      <g class="scene-node"><rect x="67" y="127" width="19" height="54" rx="5" fill="${C.line}"/><rect x="96" y="94" width="19" height="87" rx="5" fill="url(#${id}-material)"/><rect x="125" y="72" width="19" height="109" rx="5" fill="url(#${id}-accent)"/></g>
      <path class="scene-glow" d="M178 163C204 158 208 100 239 116S278 155 305 91S349 95 377 53V181H178Z" fill="${C.orange}" opacity=".08"/>
      ${path('M178 163C204 158 208 100 239 116S278 155 305 91S349 95 377 53', C.amber, 3)}
      ${path('M178 118C217 128 223 144 251 120S317 143 377 112', C.light, 1.5, 'opacity=".34"')}
      ${dot(239, 116, 5)}${dot(305, 91, 5)}${dot(377, 53, 5)}
      ${text(104, 216, 'Indicadores', 17)}${text(291, 216, 'Leitura', 17)}`
  };

  const architectureScenes = {
    cloud: id => `${glow(id, 273, 139, 238, 132)}
      <g class="scene-node"><path d="M28 153L132 115L222 153L118 192Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/><path d="M28 153V168L118 207L222 168V153L118 192Z" fill="${C.base}" stroke="${C.line}"/><path d="M47 132L132 101L201 132L116 163Z" fill="url(#${id}-material)" stroke="${C.line}"/><path d="M65 112L132 87L183 112L116 137Z" fill="url(#${id}-material)" stroke="${C.amber}" stroke-opacity=".8"/></g>
      ${path('M200 133H247M329 133H388M287 182V216H438V181', C.line, 2.5)}
      ${path('M200 133H247M329 133H388', C.amber, 2.5)}
      ${panel(id, 247, 91, 82, 91, 16)}${mark(264, 112, 48)}
      <g class="scene-node"><circle cx="437" cy="133" r="49" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/>${path('M409 135L428 152L465 115', C.amber, 3)}</g>
      ${dot(287, 216, 4)}${dot(388, 133, 4)}
      ${text(125, 247, 'Ambiente')}${text(287, 70, 'Aplicação')}${text(437, 247, 'Entrega')}`,

    data: id => `${glow(id, 280, 144, 214, 126)}
      ${panel(id, 39, 61, 73, 38, 9)}${panel(id, 39, 121, 73, 38, 9)}${panel(id, 39, 181, 73, 38, 9)}
      ${path('M55 80H95M55 140H95M55 200H95', C.light, 2, 'opacity=".32"')}
      ${path('M112 80C170 80 180 141 229 141M112 140H229M112 200C170 200 180 141 229 141', C.line, 2)}
      ${path('M112 80C170 80 180 141 229 141', C.amber, 2.5)}
      <g class="scene-node"><path d="M280 87L331 141L280 195L229 141Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/>${path('M253 142L271 158L306 120', C.amber, 3)}</g>
      ${path('M331 141H365', C.amber, 2.5)}
      <g class="scene-node"><path d="M372 185V91M372 185H522" fill="none" stroke="${C.line}" stroke-width="1.5"/><path class="scene-glow" d="M376 171C404 164 401 114 429 132S470 157 489 113 508 126 520 96V185H376Z" fill="${C.orange}" opacity=".1"/>${path('M376 171C404 164 401 114 429 132S470 157 489 113 508 126 520 96', C.amber, 3)}${dot(429, 132, 4)}${dot(489, 113, 4)}</g>
      ${text(76, 256, 'Fontes')}${text(280, 256, 'Regras')}${text(447, 256, 'Leitura')}`,

    integration: id => `${glow(id, 282, 139, 202, 134)}
      <g class="scene-node"><path d="M42 96H135L151 112V185H42Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/><path d="M135 96V112H151" fill="none" stroke="${C.amber}" stroke-width="2"/>${path('M62 130H127M62 149H116M62 168H93', C.light, 2, 'opacity=".35"')}</g>
      ${path('M151 141H228M332 141H379V72H419M379 141H419M379 141V210H419', C.line, 2.5)}
      ${path('M151 141H228M332 141H419', C.amber, 2.5)}
      <g class="scene-node"><path d="M254 97H306L332 141L306 185H254L228 141Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/>${path('M257 141L274 155L304 125', C.amber, 3)}</g>
      ${panel(id, 419, 49, 99, 45, 10)}${panel(id, 419, 118, 99, 45, 10)}${panel(id, 419, 187, 99, 45, 10)}
      ${path('M439 72H498M439 141H498M439 210H498', C.light, 2, 'opacity=".32"')}
      ${dot(379, 141, 5)}${dot(419, 141, 4)}
      ${text(96, 260, 'Origem')}${text(280, 260, 'Validação')}${text(467, 260, 'Destinos')}`,

    experience: id => `${glow(id, 291, 144, 236, 130)}
      ${path('M34 164C52 164 54 105 77 105S105 178 132 178 148 133 185 133', C.line, 3)}
      ${path('M34 164C52 164 54 105 77 105S105 178 132 178', C.amber, 2.5)}
      ${dot(34, 164, 5)}${dot(77, 105, 5)}${dot(132, 178, 5)}
      ${panel(id, 202, 76, 129, 125, 20)}
      <g class="scene-node"><path d="M224 97H307V108H224Z" fill="${C.light}" opacity=".16"/><path d="M224 122H259V172H224Z" fill="${C.line}" opacity=".65"/><path d="M271 122H307V143H271Z" fill="url(#${id}-accent)"/><path d="M271 154H307V172H271Z" fill="${C.line}" opacity=".5"/></g>
      ${path('M185 133H202M331 140H407', C.line, 2.5)}
      ${path('M331 140H407', C.amber, 2.5)}
      <g class="scene-node"><path d="M450 87L493 112V166L450 191L407 166V112Z" fill="url(#${id}-material)" stroke="${C.line}" stroke-width="1.5"/>${mark(429, 116, 44)}</g>
      ${text(103, 256, 'Jornada')}${text(267, 256, 'Interface')}${text(450, 256, 'Aplicação')}`
  };

  const processViews = {
    understand: '<div class="process-kicker">Ouvimos antes de desenhar.</div><div class="process-prompt scene-node">O que precisa mudar?</div><div class="process-brief"><div class="scene-node"><span>Quem vai usar</span><strong>Pessoas e contexto</strong></div><div class="scene-node"><span>O que importa</span><strong>Objetivos e prioridades</strong></div><div class="scene-node"><span>Por onde começar</span><strong>Um primeiro recorte</strong></div></div><div class="process-result scene-node">Uma direção que podemos construir juntos.</div>',
    design: '<div class="process-kicker">O caminho fica visível.</div><div class="process-wireframe scene-node"><div class="wireframe-header"><i></i><i></i><i></i><span>Experiência em desenho</span></div><div class="wireframe-layout"><div class="wireframe-side"><b></b><b></b><b></b></div><div class="wireframe-main"><span>Uma jornada clara</span><div class="wireframe-blocks"><i></i><i></i><i></i></div><div class="wireframe-flow"><span>Entrada</span><i></i><span>Decisão</span><i></i><span>Resultado</span></div></div></div></div><div class="process-result scene-node">Interface, fluxos e arquitetura na mesma direção.</div>',
    build: '<div class="process-kicker">As partes passam a trabalhar juntas.</div><div class="process-app scene-node"><div class="wireframe-header"><i></i><i></i><i></i><span>Uma versão para validar</span></div><div class="app-deliveries"><div><span>Experiência</span><strong>Interface construída</strong><i></i></div><div><span>Conexões</span><strong>Dados e regras integrados</strong><i></i></div><div><span>Qualidade</span><strong>Jornadas em validação</strong><i></i></div></div></div><div class="process-result scene-node">Uma entrega que você consegue ver e avaliar.</div>',
    evolve: '<div class="process-kicker">A criação encontra o uso real.</div><div class="release-flow"><div class="scene-node"><span class="release-dot"></span><div><small>Publicação</small><strong>A entrega entra em operação.</strong></div></div><div class="scene-node"><span class="release-dot"></span><div><small>Acompanhamento</small><strong>O uso orienta os ajustes.</strong></div></div><div class="scene-node"><span class="release-dot"></span><div><small>Próximo ciclo</small><strong>A próxima melhoria ganha prioridade.</strong></div></div></div><div class="process-result scene-node">Publicar abre o caminho para continuar.</div>'
  };

  function offer(kind = 'embedded') {
    if (!offers[kind]) kind = 'embedded';
    return svg('offer-' + kind, 420, 230, offers[kind]);
  }
  function architecture(kind = 'cloud') {
    if (!architectureScenes[kind]) kind = 'cloud';
    return svg('architecture-' + kind, 560, 280, architectureScenes[kind]);
  }
  function process(phase = 'understand') {
    if (!processViews[phase]) phase = 'understand';
    return '<div class="process-scene process-'+phase+'">'+processViews[phase]+'</div>';
  }
  function modal(kind = 'custom') {
    if (kind.startsWith('step-')) return process(kind.slice(5));
    if (kind.startsWith('layer-')) return architecture(kind.slice(6));
    if (offers[kind]) return offer(kind);
    const map = { custom: 'experience', product: 'experience', consulting: 'data', cloud: 'cloud', integration: 'integration', data: 'data', experience: 'experience' };
    return architecture(map[kind] || 'experience');
  }

  window.PWRScenes = { offer, architecture, process, modal };
})();
