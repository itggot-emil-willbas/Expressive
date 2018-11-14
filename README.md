# Expressive

### Utifrån [denna film](https://www.youtube.com/watch?v=Fa4cRMaTDUI&t=)

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

```javascript
import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register',credentials)
  }
}
```
Nu kan vi göra en POST-request
```javascript
AutenticationService.register({
  email:'test@test.com'
  password:'123123'
})
*/
```

## Tillbaks till app.js

1. Skapa en ny route för att registrera:

```javascript
app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}! Your user was registered. Ha det bra!`
  })
})
```

2. Kör endpointen i Postman, skicka med raw JSON
```JSON
{
	"email":"emil@test.com"
}
```

##  Client, skapa register-component, utöka Vue-router

1.  Lägg till en ny route som heter route

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
```

2.  Skapa HTML-markup i ny komponent Register.vue för ett formulär bind data med v-model

```javascript
<template>
  <div class="register">
<h1>Register</h1>
<input 
  type="email"
  name="email"
  v-model="email"
  placeholder="email"/>
<br>
<input 
  type="password"
  name="password"
  v-model="password"
  placeholder="password"/>
    
  <br/>
  <button>Register</button>
  </div>


</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'register',
  data  () {
    return {
      email:'abc',
      password:'123'
    } 
  },
  components: {
    
  }
}
</script>
```

2.  I Register.vue: Lägg till en watch för datan "email" och testa det.

```javascript
export default {
  name: 'register',
  data  () {
    return {
      email:'abc',
      password:'123'
    } 
  },
  watch: {
    email (value) {
      console.log(`Nu är email-värdet ${value}`)
    }
  },
  components: {
    
  }
}
```

3.  I samma komponent (Register.vue), testa att lägg till en timeout när komponenten "mountas" (visas) på sidan.
```javascript
export default {
  name: 'register',
  data  () {
    return {
      email:'abc',
      password:'123'
    } 
  },
  watch: {
    email (value) {
      console.log(`Nu är email-värdet ${value}`)
    }
  },
  mounted ()  {
    setTimeout(() => {
      this.email = "Hello World!"
    },2000)
  },
  components: {
    
  }
}
</script>
```
4.  Vi tar bort watch och mounted och lägger till en register-metod som är kopplad till knappen
```html
  <button @click="register">Register</button>
  </div>

</template>

```


```javascript
<script>

export default {
  name: 'register',
  data  () {
    return {
      email:'abc',
      password:'123'
    } 
  },
  methods:  {
    register () {
      console.log('You have registered',this.email, this.password)
    }
  }
}
</script>
```

## Nu knyts allt ihop

1.  Vi importerar AuthenticationSevice-objektet. En asyncron metod skickar en POST med datan till en (via AuthenticationService). Vi loggar resultatet.


```javascript
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data  () {
    return {
      email:'abc',
      password:'123'
    } 
  },
  methods:  {
    async register () {
      const response =  await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>
```

![Test](./Screenshot.jpg)












