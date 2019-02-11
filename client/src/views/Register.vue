<template>
  <div class="register">
<h1>Register</h1>
<h2>{{message}}</h2>
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
  <button @click="register">Register</button>
  <button @click="test">Test</button>
  </div>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data () {
    return {
      email:'abc',
      password:'123',
      message:'Byts ut'
    } 
  },
  watch: {
    email (value) {
      console.log('email has changed',value)
    }
  },
  methods:  {
    //async, await: Bättre än promises. Den kallar register-endpointen med payload email, password. Väntar sedan på svar innan den loggar...
    async register () {
      const response =  await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
      this.message = response.data.message
      this.$router.push({
        name: 'about'
      })
    },
    async test () {
      const testResponse =  await AuthenticationService.testChunk({
        email: this.email,
        password: this.password,
        testWord:'Apa'
      })
      console.log(testResponse.data)
    }
  }
}
</script>
