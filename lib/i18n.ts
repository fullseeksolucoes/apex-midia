export const DEFAULT_LOCALE = "pt-BR" as const;

export const copy = {
  brand: {
    name: "Apex Mídias",
    tagline: "Produtora Audiovisual",
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
      headline: "Transformamos imagens em valor.",
      sub: "Filmes e projetos visuais contruídos com direção cinematográfica e identidade visual forte.",
      cta: "Ver portfólio",
      ctaSecondary: "Iniciar projeto",
      scrollCue: "Role",
      playPauseLabel: "Pausar vídeo do reel",
      resumeLabel: "Reproduzir vídeo do reel",
    },
    brands: {
      title: "Clientes que confiaram na nossa visão.",
    },
    about: {
      eyebrow: "Sobre",
      title: "Filmes que posicionam marcas.",
      body: "Equipe especializada em entregar o melhor do audiovisual em cada projeto, visando inovação, qualidade e identidade.",
      bodyExtra:
        "Cada vídeo possui uma história e intenção, na Apex entendemos isso e valorizamos cada detalhe necessário para uma produção impecável.",
      stats: [
        { value: "4+", label: "Anos de Experiência" },
        { value: "200+", label: "Projetos Entregues" },
        { value: "BR/EUA", label: "Atuação Internacional" },
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
      title: "Uma seleção dos nossos projetos.",
      sub: "Filmes, eventos e produções visuais do nosso dia a dia.",
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
      sub: "Trabalhamos com imagens que contam histórias, geram desejo e convertem resultados.",
    },
    manifesto: {
      eyebrow: "Manifesto",
      title: "Filmes bem feitos comunicam diferente.",
      body: [
        "Na Apex, cada projeto é desenvolvido com direção cinematográfica, atenção aos detalhehs e identidade visual forte.",
        "Acreditamos que a forma como uma marca é vista influencia diretamente a forma como ela é percebida.",
      ],
    },
    methodology: {
      eyebrow: "Método",
      title: "Quatro tempos.",
      steps: [
        {
          number: "01",
          title: "Imersão",
          body: "Escutamos as expectativas e dores para contextualizar, mapear e definir a estratégia.",
        },
        {
          number: "02",
          title: "Pré Produção",
          body: "Produção de roteiro e preparação de equipamentos, equipe e alinhamento final.",
        },
        {
          number: "03",
          title: "Produção",
          body: "Hora da ação, equipe focada em cada detalhe buscando capturar o melhor de cada momento.",
        },
        {
          number: "04",
          title: "Pós",
          body: "Processo de montagem, color grading, som e finalização do projeto.",
        },
      ],
    },
    results: {
      eyebrow: "Em números",
      stats: [
        { value: 200, suffix: "+", label: "Filmes entregues" },
        { value: "BR/EUA", suffix: "", label: "Atuação Internacional" },
        { value: 500, suffix: "M", label: "Em Visualizações" },
        { value: 50, suffix: "+", label: "Clientes Satisfeitos" },
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
      title: "Vamos criar algo",
      titleAccent: "memorável.",
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
