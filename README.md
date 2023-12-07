# Unireview

In questa repository è possibile trovare tutto il materiale relativo al progetto Unireview, sviluppato per il corso di Ingegneria del Software dell'Università degli Studi di Trento.

Nella cartella docs è possibile trovare la documentazione del progetto, mentre nella cartella source è possibile trovare il codice sorgente.

## Struttura del progetto
```
source/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── global.css
│   ├── public/
│   ├── node_modules/
│   └── package.json
└── backend/
    ├── routes/
    ├── node_modules/
    ├── index.mjs
    └── package.json
```

## Installazione e avvio
### Backend

How to install:

`npm npm init -y`

`npm install express`

`npm install mongoose`

`npm install dotenv`

`npm install cors`

`npm install nodemon`

`npm install express-async-errors`

How to run:

`node server.js`

### Frontend

How to install:

`npx create-next-app frontend`

How to run:

`npm run dev`