export const DEFAULT_LOCALE = "pt-BR" as const;

export const copy = {
  brand: {
    name: "Apex Mídias",
    tagline: "Estúdio cinematográfico de imagem em movimento.",
    domain: "apexmidias.com",
  },
  nav: {
    sobre: "Sobre",
    portfolio: "Portfólio",
    contato: "Contato",
    cta: "Iniciar projeto",
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  home: {
    hero: {
      eyebrow: "APEX · MMXXVI",
      headline: "Transformamos imagens em impacto.",
      sub: "Direção, produção e pós cinematográfica para marcas que falam baixo e ressoam alto.",
      cta: "Ver portfólio",
      ctaSecondary: "Iniciar projeto",
      scrollCue: "Role",
      playPauseLabel: "Pausar vídeo do reel",
      resumeLabel: "Reproduzir vídeo do reel",
    },
    brands: {
      eyebrow: "Colaborações",
      title: "Marcas que confiaram na nossa visão.",
    },
    about: {
      eyebrow: "Sobre",
      title: "Cinema como linguagem comercial.",
      body: "Um coletivo enxuto de diretores, produtores e finalizadores dedicados a campanhas, filmes de marca e narrativas editoriais de alto valor de produção.",
      bodyExtra:
        "Every frame is built with intention — combining storytelling, atmosphere and visual precision to create films that feel timeless and emotionally grounded.",
      stats: [
        { value: "8+", label: "Anos de Experiência" },
        { value: "120+", label: "Projetos Entregues" },
        { value: "15", label: "Parceiros Criativos" },
      ],
      cta: "Conhecer o estúdio",
    },
    selectedWork: {
      eyebrow: "Selecionados",
      title: "Trabalho recente.",
      cta: "Explorar portfólio",
    },
    finalCta: {
      eyebrow: "Próximo capítulo",
      title: "Vamos criar algo memorável.",
      cta: "Iniciar conversa",
    },
  },
  portfolio: {
    intro: {
      eyebrow: "Portfólio",
      title: "Filmes, campanhas e fragmentos.",
      sub: "Uma seleção curatorial — direção, produção e pós-produção.",
    },
    filters: {
      all: "Tudo",
      brand: "Marca",
      fashion: "Moda",
      shortFilm: "Curta",
      commercial: "Comercial",
      music: "Música",
    },
    detail: {
      back: "Voltar ao portfólio",
      brief: "Brief",
      credits: "Ficha técnica",
      relatedTitle: "Outros projetos",
      role: "Função",
      year: "Ano",
      client: "Cliente",
      category: "Categoria",
    },
  },
  sobre: {
    hero: {
      eyebrow: "Estúdio",
      title: "Imagens que carregam intenção.",
      sub: "Trabalhamos no espaço entre cinema, moda e branding — onde a imagem precisa funcionar como narrativa e como objeto.",
    },
    manifesto: {
      eyebrow: "Manifesto",
      title: "Menos elementos. Mais impacto.",
      body: [
        "Acreditamos em silêncio. Em planos longos. Em luz que constrói lugar antes de revelar pessoa. Em decupagem que respeita o ritmo do espectador.",
        "Cada filme que assinamos passa por uma diretoria criativa única — um ponto de vista autoral, defendido até a entrega final. Não fazemos volume. Fazemos memória.",
      ],
    },
    methodology: {
      eyebrow: "Método",
      title: "Quatro tempos.",
      steps: [
        {
          number: "01",
          title: "Imersão",
          body: "Escuta atenta da marca, do contexto e do público. Mapeamento de referências e tensão criativa.",
        },
        {
          number: "02",
          title: "Direção",
          body: "Tratamento autoral, decupagem visual, casting e definição de paleta cinematográfica.",
        },
        {
          number: "03",
          title: "Produção",
          body: "Equipe enxuta, foco no que entra em quadro. Cada decisão de set responde ao tratamento.",
        },
        {
          number: "04",
          title: "Pós",
          body: "Montagem, color, som e finalização sob a mesma diretoria — coerência da primeira à última frame.",
        },
      ],
    },
    results: {
      eyebrow: "Em números",
      stats: [
        { value: 120, suffix: "+", label: "Filmes entregues" },
        { value: 38, suffix: "", label: "Marcas atendidas" },
        { value: 14, suffix: "", label: "Premiações" },
        { value: 9, suffix: "", label: "Países" },
      ],
    },
    gallery: {
      eyebrow: "Fragmentos",
      title: "Frames do processo.",
    },
    cta: {
      title: "Vamos conversar sobre o seu próximo filme.",
      action: "Iniciar projeto",
    },
  },
  contato: {
    hero: {
      eyebrow: "Contato",
      title: "Vamos criar algo memorável.",
      sub: "Conte sobre o projeto. Respondemos em até 48 horas úteis.",
    },
    form: {
      name: "Nome",
      email: "E-mail",
      company: "Empresa",
      projectType: "Tipo de projeto",
      message: "Mensagem",
      messagePlaceholder: "Sobre o filme, prazo e referências…",
      submit: "Enviar",
      submitting: "Enviando…",
      successTitle: "Mensagem recebida.",
      successBody: "Entraremos em contato em breve. Obrigado pela confiança.",
      errorTitle: "Não foi possível enviar.",
      errorBody:
        "Tente novamente em instantes ou escreva diretamente para contato@apexmidias.com.",
      required: "Campo obrigatório",
      invalidEmail: "Informe um e-mail válido",
      types: {
        brand: "Filme de marca",
        commercial: "Comercial",
        fashion: "Moda",
        music: "Música",
        documentary: "Documentário",
        other: "Outro",
      },
    },
    whatsapp: {
      title: "Prefere falar agora?",
      cta: "Conversar no WhatsApp",
    },
    direct: {
      label: "Direto",
      email: "contato@apexmidias.com",
      phone: "+55 11 9 0000 0000",
    },
  },
  footer: {
    rights: "Todos os direitos reservados.",
    builtBy: "Desenvolvido por",
    social: {
      instagram: "Instagram",
      vimeo: "Vimeo",
      linkedin: "LinkedIn",
      behance: "Behance",
    },
  },
  a11y: {
    sectionHero: "Reel principal",
    sectionBrands: "Marcas e colaboradores",
    sectionAbout: "Sobre o estúdio",
    sectionSelected: "Projetos selecionados",
    sectionFinalCta: "Chamada final",
    sectionPortfolio: "Lista de projetos",
    sectionProjectHero: "Apresentação do projeto",
    sectionProjectIntro: "Brief e ficha técnica",
    sectionProjectGallery: "Galeria do projeto",
    sectionRelated: "Outros projetos",
    sectionManifesto: "Manifesto",
    sectionMethodology: "Metodologia",
    sectionResults: "Resultados",
    sectionGallery: "Galeria editorial",
    sectionContactForm: "Formulário de contato",
    sectionWhatsapp: "Contato direto via WhatsApp",
  },
} as const;

export type Copy = typeof copy;

export function t<K extends keyof Copy>(key: K): Copy[K] {
  return copy[key];
}
