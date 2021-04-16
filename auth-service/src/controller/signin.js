import jwt from 'jsonwebtoken';
import { authentificate } from '../model';
import { privateKey } from '../constants';

const signin = async (req, res, next) => {

  res.set('content-type', 'application/json');

  // Get parameters
  const email = req.query.email;
  const password  = req.query.password;

  if (!email || !password) {
    return res.send({
      success: false,
      error: { code: 0, msg: 'NULL PARAMETER' }
    });
  }

  try {

    //Traitements
    let result = await authentificate(email, password);
    const user = Object.values(JSON.parse(JSON.stringify(result)));

    if (user.length == 0) {
      return res.send({
        success: false,
        error: { code: 2, msg: 'INCORRECT CREDENTIALS' }
      });
    }

    //console.log(user[0]);

    let token = jwt.sign(user[0], privateKey);

    res.send({
      success: true,
      data: {
        token
      }
    });

  } catch (e) {
    //console.log(e);
    return res.send({
      success: false,
      error: { code: 1, msg: 'INTERNAL ERROR' }
    });
  }

}
  
export default signin;