const config = require('./aad-config.json');
const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const app = express();
const port = process.env.PORT || '53002';
app.set('port', port);

const bearerOptions = {
    identityMetadata: config.aadMetadata,
    clientID: config.aadClientId,
    audience: config.aadClientId,
    validateIssuer: false
};
passport.use(new BearerStrategy(bearerOptions,
  function(token, done) {
      console.log("a");
      if (token.roles && token.roles.includes(config.aadRole)) {
          return done(null, token.roles);
      }
      return done(null,false);
  }  
));

app.get('/aad', passport.authenticate('oauth-bearer', {session: false}), (req, res) => {
    res.end("Call success with AAD auth!");
});

app.listen(port,"localhost", () => {
    console.log(`Start server at ${port}`);
});