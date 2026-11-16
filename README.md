# Mugg & Bean Baía Mall

Website em português de Moçambique, desenvolvido com **React, TypeScript e Vite**. Mantém o design a preto e branco e as fotografias da marca.

Na pasta principal, execute `npm run setup` e `npm run dev`. Abra **http://127.0.0.1:3000**. Para verificar os tipos, execute `npm run typecheck`; para gerar a versão de produção, `npm run build`.

Os ficheiros editáveis estão em `mugg-and-bean/`:

- `src/App.tsx`: componentes, estrutura e interacções.
- `src/content.ts`: pratos, descrições, contactos, morada e ligações. Adicione `priceMzn` a um prato apenas quando tiver um preço local confirmado; a apresentação usa meticais e a localização `pt-MZ`.
- `src/Icons.tsx`: ícones SVG tipados.
- `src/styles.css`: estilos e regras para telemóveis.
- `public/assets/`: fotografias, logótipo e tipos de letra locais.
- `index.html`: idioma, título e metadados.

`dist/` é gerado pelo Vite. Faça alterações em `src/`, `public/` ou no `index.html` da pasta do projecto.

A localização é **Baía Mall, Av. da Marginal, Bairro Triunfo, Maputo, Moçambique**. O site inclui telefone e percursos no Google Maps. Consulte `mugg-and-bean/content-sources.md` para as fontes.

Fotografias e sugestões de pratos vêm da biblioteca oficial da marca, incluindo uma imagem republicada do Instagram. Preços e disponibilidade devem ser confirmados na loja. A galeria liga ao perfil pedido e não é uma ligação em tempo real ao Instagram.

[Ver website](https://mugg-and-bean-coffee-table.vastchair514.chatgpt.site)
