import axios from 'axios'

//exportera en "connector"
export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}