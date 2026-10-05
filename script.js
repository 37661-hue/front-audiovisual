/**
 * =============================================================================
 * CineEquip - Frontend JavaScript
 * Gerenciamento e Exibição de Equipamentos Audiovisuais
 * =============================================================================
 */

// 1. CONFIGURAÇÃO DA API
// Altere para a URL de produção após o deploy na Vercel
const API_URL = "https://backend-audiovisual.vercel.app/api/equipamentos";

// 2. ELEMENTOS DO DOM
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const emptyState = document.getElementById("empty-state");
const catalogSection = document.getElementById("catalog-section");
const equipamentosGrid = document.getElementById("equipamentos-grid");

const errorMessageText = document.getElementById("error-message-text");
const emptyStateText = document.getElementById("empty-state-text");
const equipmentCountText = document.getElementById("equipment-count-text");

const btnRefresh = document.getElementById("btn-refresh");
const btnRetry = document.getElementById("btn-retry");
const searchInput = document.getElementById("search-input");

// 3. ESTADO LOCAL DA APLICAÇÃO
let todosEquipamentos = [];

/**
 * Formata um número como moeda brasileira (Real - R$)
 * @param {number} valor
 * @returns {string} Exemplo: "R$ 15.990,00"
 */
function formatarMoeda(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    return "R$ 0,00";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

/**
 * Controla a visibilidade dos estados da tela
 * @param {'loading' | 'error' | 'empty' | 'catalog'} estado
 */
function definirEstado(estado) {
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  emptyState.classList.add("hidden");
  catalogSection.classList.add("hidden");

  switch (estado) {
    case "loading":
      loadingState.classList.remove("hidden");
      equipmentCountText.textContent = "Carregando catálogo...";
      break;
    case "error":
      errorState.classList.remove("hidden");
      equipmentCountText.textContent = "Offline / Erro";
      break;
    case "empty":
      emptyState.classList.remove("hidden");
      equipmentCountText.textContent = "0 Equipamentos";
      break;
    case "catalog":
      catalogSection.classList.remove("hidden");
      break;
  }
}

/**
 * Cria o elemento HTML de um Card de Equipamento
 * @param {Object} equipamento
 * @returns {HTMLElement}
 */
function criarCardEquipamento(equipamento) {
  const card = document.createElement("article");
  card.className = "equipamento-card";
  card.setAttribute("data-id", equipamento._id || "");

  // Mídia / Foto com tratamento de erro
  const mediaContainer = document.createElement("div");
  mediaContainer.className = "card-media";

  const img = document.createElement("img");
  img.className = "card-image";
  img.src = equipamento.foto;
  img.alt = `${equipamento.marca} - ${equipamento.modelo}`;
  img.loading = "lazy";

  // Fallback caso a imagem quebre
  img.onerror = function () {
    this.onerror = null;
    this.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80";
  };

  const brandBadge = document.createElement("span");
  brandBadge.className = "brand-badge";
  brandBadge.textContent = equipamento.marca;

  mediaContainer.appendChild(img);
  mediaContainer.appendChild(brandBadge);

  // Conteúdo do Card
  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = equipamento.modelo;
  title.title = `${equipamento.marca} ${equipamento.modelo}`;

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const priceLabel = document.createElement("span");
  priceLabel.className = "price-label";
  priceLabel.textContent = "Valor Estimado";

  const priceValue = document.createElement("span");
  priceValue.className = "price-value";
  priceValue.textContent = formatarMoeda(equipamento.preco);

  footer.appendChild(priceLabel);
  footer.appendChild(priceValue);

  content.appendChild(title);
  content.appendChild(footer);

  card.appendChild(mediaContainer);
  card.appendChild(content);

  return card;
}

/**
 * Renderiza uma lista de equipamentos no grid
 * @param {Array} lista
 */
function renderizarEquipamentos(lista) {
  equipamentosGrid.innerHTML = "";

  if (!lista || lista.length === 0) {
    definirEstado("empty");
    return;
  }

  const fragment = document.createDocumentFragment();
  lista.forEach((item) => {
    const card = criarCardEquipamento(item);
    fragment.appendChild(card);
  });

  equipamentosGrid.appendChild(fragment);
  definirEstado("catalog");

  // Atualiza contador no cabeçalho
  const total = lista.length;
  equipmentCountText.textContent = `${total} ${total === 1 ? "Equipamento" : "Equipamentos"}`;
}

/**
 * Aplica o filtro de busca local (por marca ou modelo)
 */
function filtrarEquipamentos() {
  const termo = searchInput.value.trim().toLowerCase();

  if (!termo) {
    renderizarEquipamentos(todosEquipamentos);
    return;
  }

  const filtrados = todosEquipamentos.filter((item) => {
    const marca = (item.marca || "").toLowerCase();
    const modelo = (item.modelo || "").toLowerCase();
    return marca.includes(termo) || modelo.includes(termo);
  });

  if (filtrados.length === 0) {
    emptyStateText.textContent = `Nenhum equipamento encontrado para o termo "${termo}".`;
    definirEstado("empty");
  } else {
    renderizarEquipamentos(filtrados);
  }
}

/**
 * Busca a lista de equipamentos da API REST
 */
async function buscarEquipamentos() {
  definirEstado("loading");

  try {
    const resposta = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
      throw new Error("A resposta da API não retornou uma lista válida.");
    }

    todosEquipamentos = dados;

    // Se houver busca digitada, mantém o filtro ativo
    if (searchInput.value.trim()) {
      filtrarEquipamentos();
    } else {
      renderizarEquipamentos(todosEquipamentos);
    }
  } catch (erro) {
    console.error("Falha ao carregar equipamentos:", erro);
    errorMessageText.textContent = `Não foi possível comunicar com a API (${API_URL}). Detalhes: ${erro.message}`;
    definirEstado("error");
  }
}

// 4. EVENT LISTENERS
btnRefresh.addEventListener("click", () => {
  buscarEquipamentos();
});

btnRetry.addEventListener("click", () => {
  buscarEquipamentos();
});

searchInput.addEventListener("input", () => {
  filtrarEquipamentos();
});

// 5. INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  buscarEquipamentos();
});
