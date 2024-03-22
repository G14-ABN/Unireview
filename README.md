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
    ├── models/
    ├── routes/
    ├── node_modules/
    ├── index.js
    ├── conn.js
    ├── .env (required, not included)
    └── package.json
```

# Installazione e avvio
## Backend

Dependencies:

`npm init -y`

`npm i express mongoose dotenv cors nodemon express-async-errors swagger-ui-express yamljs`

How to run:

`npm start`

### `.env` configuration:

Please, create a `.env` file in the `backend` folder with the following content:

```
ATLAS_URI="mongodb+srv://<USER>:<PASSWORD>@unireview.wzmoezy.mongodb.net/?retryWrites=true&w=majority"
PORT=8080
DB_NAME="unireview"
```

## Frontend

How to install:

`npx create-next-app frontend`

How to run:

`next start`
