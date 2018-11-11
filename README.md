# Expressive

##  Setup
1.  Skapa Git-hub-repos. Huvudmapp med (client och  server)
2.  Installera Vue med VueCLI i client-mappen

## Setup Express, servergrejer
1. Skapa package.json  
```console
npm init -f
```

2.  Installera nodemon och eslint. Nodemon kollar ändringar i app.js och startar om servern.
```console
npm install nodemon eslint
```

3.  Anpassa package.json. 
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"./node_modules/nodemon/bin/nodemon.js src/app.js --exec 'npm run lint && node'",
    "lint": "./node_modules/.bin/eslint src/*.js"
   //OBS! INTE: "lint":"./node_modules/.bin/eslint **/*.js"
  },
```

4.  Kör es-lint så en config-fil skapas. Välj standard och js som val
```console
node ./node_modules/eslint/bin/eslint.js --init
```

5.  Installera node-dependencies till express-servern.
```console
npm install --save express body-parser cors morgan
```
--save lägger till den under dependencies i package.json.
Cors handlar om cross-origin-problematik. 
Morgan är bra för att skriva ut loggar.
Body-parser tar hand om JSON-data enkelt.

## Börja bygga app.js

1.  Lägg till (require) node-paketen i app.js:
```javascript
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
```
"require" dyker ner i respektive node-modul och letar efter main-filen (main förklaras i respektive package.json)

2.  Bygg upp controllern
```javascript
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081)
```

3.  Kör i chrome eller POSTMAN-app/extension:
```console
http://localhost:8081/status
```
Svaret kommer som JSON-objekt.

## Lite arbete i client-mappen

1.  Installera axios i client för att tala skicka requests till backend
```console
npm install --save axios
```

2.  I client-mappens src-mapp, skapa en mapp "services".Skapa där en fil Api.js (en connector som kan användas med back-end. För att nå olika end points)
```javascript
import axios from 'axios'

//exportera en "connector"
export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
```

3.  Skapa i samma mapp en fil AuthenticationServices.js. Används för att hitting the endpoint som vi ska bygga.



