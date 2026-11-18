# Mugg & Bean Baía Mall

React + TypeScript + Vite. Idioma: português de Moçambique (`pt-MZ`).

```sh
npm install
npm run dev
```

O servidor abre em http://127.0.0.1:3000/Mugg_and_bean-website/. `npm run build` verifica os tipos e gera `build/`; `npm run preview` apresenta a versão de produção.

A publicação no GitHub Pages é feita automaticamente pelo workflow `../.github/workflows/deploy-pages.yml` a cada envio para `main`. Consulte o `README.md` da pasta principal para activar o GitHub Pages.

Edite `src/content.ts` para alterar a ementa e os contactos, `src/App.tsx` para alterar os componentes, e `src/styles.css` para ajustar o design. Fotografias e tipos de letra estão em `public/assets/`. Preços locais confirmados podem ser adicionados ao campo opcional `priceMzn`, em meticais.

As fontes da morada e do telefone estão em `content-sources.md`. A proveniência das imagens está em `asset-sources.json`.
