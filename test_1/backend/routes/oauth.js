// http://127.0.0.1:3000/oauth?code=4%2F0AQlEd8x8JLD_CWvZ-84amVuILMFTDI1oCasLM5muWbtnwkuHpIG97iHixrtQMBGuOICwMA&scope=profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=consent

var express = require('express');
var router = express.Router();
// Load environment variables from .env file

const {OAuth2Client} = require('google-auth-library');

async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  console.log('data',data);
}



/* GET home page. */
router.get('/', async function(req, res, next) {

    const code = req.query.code;

    console.log('code is' ,code);
    try {
        const redirectURL = "http://127.0.0.1:3000/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        await getUserData(oAuth2Client.credentials.access_token);
        console.log('lasttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }


    res.redirect(303, 'http://localhost:5173/');
    // res.send({
    //     status: 'success',
    //     message: 'User successfully logged in',
    //     data: {
          
    //       code : code
    //     }

    // })
  


});

module.exports = router;