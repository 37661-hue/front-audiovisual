# Roadmap do Frontend - CineEquip Web

Checklist de desenvolvimento e entrega da interface web para equipamentos audiovisuais.

- [x] Etapa 1: Planejamento inicial, repositório Git e arquivos de documentação (`Roadmap.md`, `Contexto.md`, `.gitignore`)
- [x] Etapa 2: Estruturação semântica HTML (`index.html`) com tema de estúdio cinematográfico/audiovisual
- [x] Etapa 3: Estilização moderna CSS (`style.css`) com paleta escura, cards modernos, animações, estados responsivos e design de alta fidelidade
- [x] Etapa 4: Implementação da lógica em JavaScript puro (`script.js`):
  - [x] Definição da constante `API_URL` central no topo
  - [x] Tratamento de estado de carregamento (Skeleton loaders animados)
  - [x] Tratamento de estado de lista vazia (Empty state temático)
  - [x] Tratamento de estado de erro de rede ou servidor com botão de reconexão
  - [x] Renderização dinâmica dos cards com formatação de preço em R$ (Real brasileiro)
  - [x] Formatação de dados e tratamento de imagens com fallback
- [ ] Etapa 5: Testes locais da interface consumindo a API local do Backend
- [x] Etapa 6: Configuração de publicação para Vercel (`vercel.json`)
- [ ] Etapa 7: Criação e sincronização contínua com repositório no GitHub
- [ ] Etapa 8: Deploy do Frontend na Vercel
- [ ] Etapa 9: Ajuste da constante `API_URL` para o endereço de produção da API e teste final
