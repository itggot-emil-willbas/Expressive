import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register',credentials)
  }
}
/* 
AutenticationService.register({
  email:'test@test.com'
  password:'123123'
})
*/