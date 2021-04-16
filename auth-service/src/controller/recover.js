import jwt from 'jsonwebtoken';
import { setPassword } from '../model';

const recover = async (req, res, next) => {

  res.set('content-type', 'application/json');

  // Get parameters
  const token = req.query.jwt;
  const password = req.query.password;

  if (!token || !password) {
    return res.send({
      success: false,
      error: { code: 0, msg: 'NULL PARAMETER' }
    });
  }

  let decoded = null;

  try {

    // Decode jwt
    decoded = jwt.decode(token, {complete: true});

    let result = await setPassword(decoded.payload.email, password);

    if (result.changedRows == 0) {
      return res.send({
        success: false,
        error: { code: 4, msg: 'EMAIL ERROR' }
      });
    }

    return res.send({
      success: true
    });

  } catch (e) {
    console.log(e);
    if (!decoded) {
      return res.send({
        success: false,
        error: { code: 5, msg: 'INVALID TOKEN' }
      });
    }
    return res.send({
      success: false,
      error: { code: 1, msg: 'INTERNAL ERROR' }
    });
  }

}

export default recover;