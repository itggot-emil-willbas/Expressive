import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register',credentials)
  },
  testChunk (credentials) {
    return Api().post('testChunk',credentials)
  }
}
/* 
AutenticationService.register({
  email:'test@test.com'
  password:'123123'
})
*/