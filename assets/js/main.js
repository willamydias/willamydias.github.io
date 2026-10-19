/**
 * main.js - Dynamic GitHub Integration & Explorer
 * willamydias.github.io
 */

// Fallback snapshot of public repositories to ensure instant offline & rate-limit-safe render
const FALLBACK_REPOSITORIES = [
  {
    name: "350-layout-compositions",
    description: "350 种排版 · 分类图鉴 / 350 Tipos de Layout · Guia Visual de Composição (Bilíngue PT-BR & ZH-CN)",
    language: "Python",
    html_url: "https://github.com/willamydias/350-layout-compositions",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  },
  {
    name: "photohelper",
    description: "Cross-platform Rust CLI for AI-powered Canon RAW processing: culling, denoise, sharpen, develop (XMP sidecars), and JPEG export.",
    language: "Rust",
    html_url: "https://github.com/willamydias/photohelper",
    stargazers_count: 0,
    forks_count: 0,
    fork: true
  },
  {
    name: "painel-caixa",
    description: "Painel analítico e operacional moderno construído com TypeScript e Next.js/React, com deploy em produção.",
    language: "TypeScript",
    html_url: "https://github.com/willamydias/painel-caixa",
    homepage: "https://painel-caixa-ashen.vercel.app",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  },
  {
    name: "Stock-Prediction-Models",
    description: "Machine learning and deep learning models for Stock forecasting including trading algorithms, LSTM and simulations.",
    language: "Jupyter Notebook",
    html_url: "https://github.com/willamydias/Stock-Prediction-Models",
    stargazers_count: 0,
    forks_count: 0,
    fork: true
  },
  {
    name: "cloudflare-tailscale-devmesh",
    description: "Infraestrutura de desenvolvimento distribuído com malha segura integrada via Cloudflare Workers e Tailscale.",
    language: "TypeScript",
    html_url: "https://github.com/willamydias/cloudflare-tailscale-devmesh",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  },
  {
    name: "mestrado",
    description: "Códigos, implementações algorítmicas e pesquisas aplicadas desenvolvidas para as disciplinas do mestrado.",
    language: "Jupyter Notebook",
    html_url: "https://github.com/willamydias/mestrado",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  },
  {
    name: "flask-redis-docker",
    description: "Arquitetura conteinerizada em Docker com Flask e cache Redis para processamento distribuído.",
    language: "Python",
    html_url: "https://github.com/willamydias/flask-redis-docker",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  },
  {
    name: "n8n-workflows",
    description: "Acervo e automações de fluxos de integração complexos e orquestração de microsserviços via n8n.",
    language: "JSON",
    html_url: "https://github.com/willamydias/n8n-workflows",
    stargazers_count: 0,
    forks_count: 0,
    fork: true
  },
  {
    name: "sv-docker-n8n-self-hosting",
    description: "Configuração self-hosted para implantação de pipelines de dados n8n via Docker Compose.",
    language: "Shell",
    html_url: "https://github.com/willamydias/sv-docker-n8n-self-hosting",
    stargazers_count: 0,
    forks_count: 0,
    fork: true
  },
  {
    name: "MamedeMap",
    description: "Extensão analítica de geolocalização e inteligência espacial para QlikView 12.",
    language: "JavaScript",
    html_url: "https://github.com/willamydias/MamedeMap",
    stargazers_count: 0,
    forks_count: 0,
    fork: false
  }
];

let allRepositories = [...FALLBACK_REPOSITORIES];
let selectedLanguage = "all";
let searchQuery = "";

// Map language to CSS color dot
function getLanguageColorClass(language) {
  if (!language) return "default";
  const lang = language.toLowerCase();
  if (lang.includes("python")) return "python";
  if (lang.includes("typescript")) return "typescript";
  if (lang.includes("rust")) return "rust";
  if (lang.includes("jupyter")) return "jupyter";
  return "default";
}

// Render repositories into the DOM
function renderRepositories() {
  const container = document.getElementById("repos-container");
  const countElement = document.getElementById("repo-count");
  if (!container) return;

  const filtered = allRepositories.filter((repo) => {
    // Exclude the profile repository itself from general listing if desired, or keep it
    if (repo.name === "willamydias.github.io") return false;

    // Filter by language
    if (selectedLanguage !== "all") {
      if (!repo.language || repo.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
        return false;
      }
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const inName = repo.name.toLowerCase().includes(q);
      const inDesc = repo.description ? repo.description.toLowerCase().includes(q) : false;
      const inLang = repo.language ? repo.language.toLowerCase().includes(q) : false;
      return inName || inDesc || inLang;
    }

    return true;
  });

  if (countElement) {
    countElement.textContent = `Exibindo ${filtered.length} repositório(s)`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-family: var(--font-mono);">
        Nenhum repositório encontrado com os filtros atuais.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((repo) => {
      const langClass = getLanguageColorClass(repo.language);
      const langName = repo.language || "Geral";
      const desc = repo.description || "Repositório público de engenharia e código-fonte.";
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;

      return `
        <article class="repo-card">
          <div class="repo-header">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name" title="Abrir ${repo.name} no GitHub">
              ${repo.name}
            </a>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted);">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
          <p class="repo-description">${desc}</p>
          <div class="repo-footer">
            <span class="tech-lang">
              <span class="lang-dot ${langClass}"></span>
              <span>${langName}</span>
            </span>
            <div class="repo-stats">
              <span class="stat-item" title="Stars">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${stars}
              </span>
              <span class="stat-item" title="Forks">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="6" y1="3" x2="6" y2="15"></line>
                  <circle cx="18" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M18 9a9 9 0 0 1-9 9"></path>
                </svg>
                ${forks}
              </span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Fetch live repositories from GitHub Public API
async function fetchLiveRepositories() {
  try {
    const res = await fetch("https://api.github.com/users/willamydias/repos?per_page=100&sort=updated");
    if (!res.ok) {
      console.warn("GitHub API rate limit or status:", res.status);
      return;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      allRepositories = data;
      renderRepositories();
    }
  } catch (err) {
    console.info("Using embedded offline cache for repositories.", err);
  }
}

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initial render with fallback data
  renderRepositories();

  // Fetch live updates in background
  fetchLiveRepositories();

  // Search input with debounce
  const searchInput = document.getElementById("repo-search");
  if (searchInput) {
    const handleSearch = debounce((e) => {
      searchQuery = e.target.value;
      renderRepositories();
    }, 150);

    searchInput.addEventListener("input", handleSearch);
  }

  // Filter button clicks
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedLanguage = btn.getAttribute("data-lang") || "all";
      renderRepositories();
    });
  });
});
