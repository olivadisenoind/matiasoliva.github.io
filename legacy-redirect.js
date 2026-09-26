(() => {
  const path = location.pathname;
  const indexedLocale = path.match(/^\/(pt|en)\/index\.html$/)?.[1];
  const isLegacyEntry = path === '/' || path === '/index.html' || Boolean(indexedLocale);
  if (!isLegacyEntry) return;

  const parameters = new URLSearchParams(location.search);
  const queryLocale = parameters.get('lang')?.toLowerCase();
  const locale = queryLocale === 'pt' || queryLocale === 'en' || queryLocale === 'es'
    ? queryLocale
    : indexedLocale ?? 'es';
  parameters.delete('lang');

  const localePaths = {
    es: { home: '/', projects: '/proyectos/', manifesto: '/manifiesto/' },
    pt: { home: '/pt/', projects: '/pt/projetos/', manifesto: '/pt/manifesto/' },
    en: { home: '/en/', projects: '/en/projects/', manifesto: '/en/manifesto/' },
  };
  const routes = localePaths[locale];
  const project = {
    '#proj-p1': 'capullo',
    '#proj-p2': 'cianoback',
    '#proj-p3': 'ordna',
  }[location.hash];
  const readerAnchors = new Set(['#reader', '#readerTitle', '#readerChapters', '#readerBody']);
  const editionAnchors = new Set(['#pagesViewer', '#pvTitle', '#pvCur', '#pvTot', '#pvProg', '#pvIndex', '#pvScroll']);
  const projectArchiveAnchors = new Set([
    '#proj-p4', '#projGrid', '#projPanel', '#projStore', '#lightbox', '#lbImg', '#lbStage', '#lbTitle',
  ]);
  const homeAnchors = new Set(['#top', '#manifiesto', '#enfoque', '#practica', '#proyectos', '#contacto']);
  const homeAnchorAliases = {
    '#burger': '#top',
    '#mobileMenu': '#top',
    '#yr': '#contacto',
  };

  let destination;
  if (project) destination = `${routes.projects}${project}/`;
  else if (readerAnchors.has(location.hash)) destination = `${routes.home}#manifiesto`;
  else if (editionAnchors.has(location.hash)) destination = `${routes.manifesto}#edicion`;
  else if (location.hash === '#proj-p4') destination = `${routes.projects}#project-04`;
  else if (projectArchiveAnchors.has(location.hash)) destination = routes.projects;
  else if (homeAnchors.has(location.hash)) destination = `${routes.home}${location.hash}`;
  else if (homeAnchorAliases[location.hash]) destination = `${routes.home}${homeAnchorAliases[location.hash]}`;
  else destination = `${routes.home}${location.hash}`;

  const remainingQuery = parameters.toString();
  if (remainingQuery) {
    const hashPosition = destination.indexOf('#');
    destination = hashPosition >= 0
      ? `${destination.slice(0, hashPosition)}?${remainingQuery}${destination.slice(hashPosition)}`
      : `${destination}?${remainingQuery}`;
  }

  const current = `${location.pathname}${location.search}${location.hash}`;
  if (destination !== current) location.replace(destination);
})();
