# Expressive

##  Setup
1.  Skapa Git-hub-repos. Huvudmapp med (client och  server)
2.  Installera Vue med VueCLI i client-mappen

## Setup Express, servergrejer
1. Skapa package.json  
```console
npm init -f
```

2.  Installera nodemon och eslint
```console
npm install nodemon eslint
```

3.  Anpassa package.json. 
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"./node_modules/nodemon/bin/nodemon.js src/app.js --exec 'npm run lint && node'",
    "lint":"./node_modules/.bin/eslint **/*.js"
  },
```
