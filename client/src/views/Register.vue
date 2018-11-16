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
  data  () {
    return {
      email:'abc',
      password:'123',
      message:'Byts ut'
    } 
  },
  methods:  {
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
