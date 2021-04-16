import { createUser } from '../model';

const signup = async (req, res, next) => {

  res.set('content-type', 'application/json');

  // Get parameters
  const email = req.query.email;
  const password  = req.query.password;
  let role = req.query.role;

  if (!email || !password || !role) {
    return res.send({
      success: false,
      error: { code: 0, msg: 'NULL PARAMETER' }
    });
  }

  role = parseInt(role);
  let result = null;

  try {

    //Traitements
    result = await createUser(email, password, role);
    
    const idUser = result.insertId;
    
    res.send({
      success: true,
      data: { idUser }
    });

  } catch (e) {
    console.log(e);
    if (!result) {
      return res.send({
        success: false,
        error: { code: 1, msg: 'EMAIL ALREADY EXISTS' }
      });
    }
    return res.send({
      success: false,
      error: { code: 1, msg: 'INTERNAL ERROR' }
    });
  }

}

export default signup;
