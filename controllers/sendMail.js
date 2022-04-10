const nodemailer = require('nodemailer');
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';


const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2
(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
module.exports.sendEmail = (to,user_name,url)=>{
    oauth2Client.setCredentials({
        refresh_token:MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret:MAILING_SERVICE_CLIENT_SECRET,
            refreshToken:MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    });

    const mailOptions = {
        from: `Grabitt ${SENDER_EMAIL_ADDRESS}`,
        to: to,
        subject:`🔑 Reset Password`,
        html:`<div style="width:60%;margin:auto;font-family:'Poppins';">
        <h1 style = "font-family: 'merriweather'; color: #5463ff; font-style: italic;">Grabitt</h1>
        
        <h2>Hi, ${user_name}</h2>
        <p style = "color:gray;">Forgot your password? Let&rsquo;s set up a new one!</p>
        <p style="color:black; font-weight:bold">Click this link: </p>
        ${url}
        
        <p style = "color:gray;">If you didn&rsquo;t mean to reset your password, you can disregard this email and nothing will change.</p>
      </div>`
    }

    smtpTransport.sendMail(mailOptions,(err,info)=>{
        if(err)
        {
            console.log(err.message);
            return;
        }
        console.log(info);
        return;
    })
}