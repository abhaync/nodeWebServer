const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to log to server.log');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Hello User and Welcome to the Site'
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  })
});

app.get('/bad', (req,res) => {
  res.send({
    errMsg: 'Unable to process request'
  })
})

app.listen(port,() => {
  console.log(`Server running on port 3000 ...`);
});
