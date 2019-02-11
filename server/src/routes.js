module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'Hello Status'
    })
  })
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello World!'
    })
  })
  app.get('/helloWorld', function (req, res) {
    res.send('hello world')
  })
  app.post('/register', (req, res) => {
    res.send({
      message: `Hello ${req.body.email}! Your user was registered. Ha det bra!`
    })
  })
  app.post('/testChunk', (req, res) => {
    res.send({
      message: `Hello ${req.body.testWord}! Your user was registered. Ha det bra!`
    })
  })
}
