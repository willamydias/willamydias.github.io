# Plano de Implementação: willamy-homepage.md

> **Status:** Aprovado em Brainstorming (Fase 1) | Pronto para Execução (Fase 2)  
> **Repositório:** [willamydias.github.io](https://github.com/willamydias/willamydias.github.io)  
> **Deploy:** [https://willamydias.github.io/](https://willamydias.github.io/)  
> **Design Read:** *Personal portfolio & engineering showcase for researchers, recruiters, and technical peers, with a Linear/Vercel-style technical dark minimalist language, semantic HTML5, pure CSS custom properties, and dynamic GitHub API integration.*

---

## 1. Resumo e Decisões do Brainstorming

| Dimensão | Decisão Definida |
|---|---|
| **Posicionamento** | Especialista em Dados, Inteligência Artificial & Pesquisa (destaque para mestrado, modelos preditivos, visão computacional e engenharia aplicada) |
| **Estética Visual** | Dark Mode Técnico & Minimalista (paleta profunda `#090d16`/`#0f172a`, bordas sutis `#1e293b`, acentos ciano/esmeralda `#06b6d4`/`#10b981`, tipografia Inter/Geist, microinterações refinadas) |
| **Dials (Frontend Design)** | `DESIGN_VARIANCE: 6` \| `MOTION_INTENSITY: 4` \| `VISUAL_DENSITY: 6` |
| **Seções Principais** | 1. Hero com Bio & Badges de Especialidade<br>2. Projetos em Destaque (curadoria de alto impacto)<br>3. Explorador de Repositórios (filtro dinâmico via GitHub API + fallback offline)<br>4. Trajetória & Pesquisa (Mestrado, Publicações e Linhas de Estudo)<br>5. Contato & Presença Digital |
| **Arquitetura Técnica** | Arquitetura estática pura (HTML5 Semântico + CSS Moderno + Vanilla JS assíncrono). Zero overhead de build, carregamento instantâneo no GitHub Pages. |

---

## 2. Estrutura de Arquivos

```
c:\Projetos\willamydias.github.io\
├── index.html                 # Página principal estruturada e semântica
├── assets/
│   ├── css/
│   │   └── style.css          # Design system com tokens CSS, dark mode, tipografia e responsividade
│   ├── js/
│   │   └── main.js            # Lógica assíncrona da API do GitHub, busca, filtros e animações
│   └── images/
│       └── avatar.png         # Foto / Avatar do perfil (ou carregado via GitHub)
├── CNAME (opcional)           # Para domínio customizado futuro
└── README.md                  # Documentação do repositório
```

---

## 3. Tarefas de Implementação

### Tarefa 1: Conexão e Sincronização Git (Concluída)
- **Status:** [x] Concluído
- **Agente:** `devops-engineer`
- **Ação:** Inicializado repositório local em `c:\Projetos\willamydias.github.io`, vinculado ao remote `origin` (`https://github.com/willamydias/willamydias.github.io.git`), configurada rastreabilidade com a branch `main`.

---

### Tarefa 2: Design System e Folha de Estilos (`assets/css/style.css`)
- **Agente:** `frontend-specialist`
- **Skills:** `@[frontend-design]`, `@[web-design-guidelines]`
- **Prioridade:** P0
- **Dependências:** Nenhuma
- **Input:** Especificações do Dark Mode Minimalista (tokens de cor, escala tipográfica, sombras e grid).
- **Output:** Arquivo `style.css` completo, sem dependências de frameworks pesados, com suporte a acessibilidade (WCAG AA) e responsividade mobile-first.
- **Verify:** Validação de contraste de cores, ausência de overflow horizontal e suporte a `prefers-reduced-motion`.

---

### Tarefa 3: Estrutura Semântica e Conteúdo (`index.html`)
- **Agente:** `frontend-specialist`
- **Skills:** `@[frontend-design]`, `@[seo-fundamentals]`
- **Prioridade:** P0
- **Dependências:** Tarefa 2
- **Input:** Lista curada de projetos:
  - `350-layout-compositions`: Guia Visual Bilíngue de Composição (Python)
  - `photohelper`: CLI Rust para processamento de fotos RAW com IA
  - `painel-caixa`: Aplicação Web analítica moderna (TypeScript/Vercel)
  - `Stock-Prediction-Models`: Modelos preditivos de Machine Learning & Deep Learning
  - `mestrado`: Pesquisa e algoritmos desenvolvidos nas disciplinas de pós-graduação
  - `cloudflare-tailscale-devmesh`: Infraestrutura segura de desenvolvimento em malha
- **Output:** `index.html` completo com meta tags Open Graph, tags semânticas (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`), botões de ação e links diretos.
- **Verify:** Estrutura HTML5 válida, headings hierárquicos `h1` -> `h2` -> `h3`, links funcionais.

---

### Tarefa 4: Integração Dinâmica da API do GitHub (`assets/js/main.js`)
- **Agente:** `frontend-specialist`
- **Skills:** `@[clean-code]`, `@[web-design-guidelines]`
- **Prioridade:** P1
- **Dependências:** Tarefa 3
- **Input:** Endpoint `https://api.github.com/users/willamydias/repos?per_page=100`.
- **Output:** `main.js` com:
  - Consumo assíncrono com tratamento de erro e rate limit
  - Fallback automático com dados estáticos embutidos caso a API esteja indisponível
  - Campo de busca instantânea (pesquisa por nome, descrição ou linguagem)
  - Filtro por tags (Python, TypeScript, Rust, Jupyter Notebook, etc.)
  - Contadores de estrelas e forks sincronizados
- **Verify:** Busca funcionando sem atraso percebido (debounce de 150ms), renderização de cards fluida.

---

### Tarefa 5: Deploy e Verificação no GitHub Pages
- **Agente:** `devops-engineer`
- **Skills:** `@[verification-before-completion]`, `@[git-pushing]`
- **Prioridade:** P2
- **Dependências:** Tarefas 2, 3 e 4
- **Input:** Arquivos locais testados e validados.
- **Output:** Commit convencional, push para a branch `main` no GitHub e verificação do status da página em `https://willamydias.github.io/`.
- **Verify:** Página respondendo HTTP 200 no GitHub Pages, sem erros no console do navegador.

---

## 4. Checklist de Qualidade e Diretrizes

- [ ] **Acessibilidade:** Elementos interativos com foco visível, contraste em conformidade com WCAG 2.1 AA.
- [ ] **Performance:** Carregamento imediato sem render-blocking resources desnecessários.
- [ ] **SEO & Meta:** Open Graph completo (`og:title`, `og:description`, `og:image`, `twitter:card`).
- [ ] **Humanizer:** Textos naturais, diretos e objetivos, sem termos corporativos clichês de IA.
- [ ] **Mobile First:** Totalmente adaptado para smartphones, tablets e telas ultrawide.
