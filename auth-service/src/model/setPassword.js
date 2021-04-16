import db from '../db';

const setPassword = (email, pass) => {

  return new Promise((resolve, reject) => {

    const query = `UPDATE Users SET pass='${pass}' WHERE email='${email}'`;

    console.log(query);

    db.query(query, (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
    
  });

};

export default setPassword;