/* Il faut autoriser les applications non-sécurisées à se connecter sur GMAIL */

import nodemailer from 'nodemailer';
import { checkEmail } from '../model';

const askRecover = async (req, res, next) => {

  res.set('content-type', 'application/json');

  // Get parameters
  const email = req.query.email;

  if (!email) {
    return res.send({
      success: false,
      error: { code: 0, msg: 'NULL PARAMETER' }
    });
  }

  try {

    //Traitements
    let result = await checkEmail(email);
    const user = Object.values(JSON.parse(JSON.stringify(result)));

    if (user.length == 0) {
      return res.send({
        success: false,
        error: { code: 2, msg: 'EMAIL DOESN\'T EXISTS' }
      });
    }

    // Envoyer un email à l'utilisateur //
    // *********************************//
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'findyourevent2020@gmail.com', // generated ethereal user
        pass: 'pc3r2020', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'findyourevent2020@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    res.send({
      success: true
    });

  } catch (e) {
    console.log(e);
    return res.send({
      success: false,
      error: { code: 1, msg: 'INTERNAL ERROR' }
    });
  }

}

export default askRecover;