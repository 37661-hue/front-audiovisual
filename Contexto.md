# Contexto do Projeto - CineEquip Web (Frontend)

## 1. Visão Geral e Objetivo
Interface web limpa, moderna e responsiva construída em HTML5, CSS3 e JavaScript Vanilla (sem frameworks) para visualização do catálogo de equipamentos audiovisuais. O frontend consome a API REST via `fetch`, apresentando os equipamentos em cards com fotos de alta qualidade, marca, modelo e valores formatados no padrão monetário brasileiro (R$).

## 2. Tecnologias Utilizadas
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Vanilla CSS com variáveis de design system, layout em Grid/Flexbox responsivo, tema escuro cinematográfico (estilo estúdio/cinema) e microanimações
- **JavaScript**: Vanilla ES6+ usando Fetch API assíncrona
- **Deploy**: Vercel (Hospedagem estática)
- **Controle de Versão**: Git & GitHub

## 3. Estrutura de Pastas e Arquivos
```
/frontend
  ├── index.html        # Página principal com estrutura de cabeçalho, catálogo e estados
  ├── style.css         # Design system, tema escuro estúdio/cinema, grid responsivo e cards
  ├── script.js         # Lógica de consumo da API (API_URL no topo), renderização e estados
  ├── vercel.json       # Configurações de rotas e headers para a Vercel
  ├── .gitignore        # Arquivos ignorados pelo Git
  ├── Roadmap.md        # Checklist detalhado de desenvolvimento
  └── Contexto.md       # Estado atual, decisões e documentação viva
```

## 4. Decisões de Design e UX
- **Tema Visual**: Estúdio de Cinema / Audiovisual Dark Mode. Fundo preto profundo (`#0b0c10`), cartões em ardósia escura (`#141721`), bordas sutis (`#222738`), tipografia limpa (Inter/system-ui) e detalhes em acento dourado/âmbar (`#e5a93c`) e ciano de gravação (`#00e5ff`).
- **Estados da Interface**:
  - *Carregamento*: Grid de esqueletos animados (shimmer) que evitam pulos de layout (CLS).
  - *Vazio*: Mensagem ilustrada e amigável quando nenhum equipamento está registrado.
  - *Erro*: Cartão de erro com feedback visual explicativo e botão para tentar novamente.
- **Configuração Centralizada**: Uma única constante `API_URL` no topo do `script.js` facilita a troca entre ambiente local e produção.

## 5. Status do Projeto
- **O que já foi feito**:
  - Estrutura de pastas criada.
  - Inicialização do repositório Git local.
  - Criação do `Roadmap.md`, `Contexto.md` e `.gitignore`.
  - Estruturação semântica do `index.html` com tema estúdio/cinema, cabeçalho, barra de busca, estados de carregamento (skeletons), lista vazia, erro e container de catálogo.
  - Estilização completa no `style.css` com design system cinematográfico (cores escuras, dourado/âmbar, ciano e vermelho tally), cards responsivos com efeitos hover, shimmer skeleton animation e tipografia profissional.
  - Implementação da lógica em JavaScript puro em `script.js`: consumo da API via `fetch`, constante única `API_URL` no topo, tratamento completo de estados (loading, erro, vazio, catálogo), busca em tempo real e formatação em Real brasileiro (R$).
  - Configuração de deploy estático em `vercel.json`.
- **O que falta**:
  - Testes locais integrados com a API backend.
  - Deploy na Vercel e repositório no GitHub.

## 6. Links e Informações de Produção
- **Repositório GitHub**: (Aguardando criação/configuração)
- **URL da Vercel (Produção)**: (Aguardando deploy)
