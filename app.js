const CLIENTID = '654975932592-h7muampc39g60qb6dpt0s28pbvohrki8.apps.googleusercontent.com'
const SECRET = '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'
const REFRESH_TOKEN= '1//04hsql4pNBqbuCgYIARAAGAQSNwF-L9Ir-rD5o5rcBNxKSUSo7IWuldA08ov0gHKsJ9J1R-1VKt6f-GwN1eyhJFuu5_WJ1g1qdxU'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const google  = require('googleapis');
const nodemailer = require('nodemailer')
require('dotenv').config(); // Load environment variables from info.env
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.post('/contact',(req,res)=>{
const usermail = req.body.email
const usertxt = req.body.txt

if(usermail && usertxt){
    console.log(usermail)
    console.log(usertxt)
    sendMail(usermail,usertxt)
    res.render('response')
}
else{
    console.log(usermail)
    console.log(usertxt)
}

})

async function sendMail (usermail ,txt){
    const ou2aClient = new google.Auth.OAuth2Client(CLIENTID,SECRET,REDIRECT_URL)
     ou2aClient.setCredentials({refresh_token:REFRESH_TOKEN})
     const access_token =  await ou2aClient.getAccessToken()
     const transport=  nodemailer.createTransport(({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:'outlookemailanotherone@gmail.com',
            clientId:CLIENTID,
            clientSecret:SECRET,
            refreshToken:REFRESH_TOKEN,
            acessToken:access_token
        }
        }))

        transport.sendMail(({
            from:` Potential  Client <${usermail}>`,
            to: `outlookemailanotherone@gmail.com`,
            subject:'Client',
         html:txt + ` \n from ${usermail}`
        }))
        .then((res)=>{
            console.log(res)
        })
    

}

app.listen(3000, () => {
    console.log('server satrted') 
});

