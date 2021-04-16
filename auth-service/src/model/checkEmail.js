import db from '../db';

const checkEmail = (email) => {

  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM Users WHERE email='${email}';`;

    console.log(query);

    db.query(query, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
    });
    
  });

};

export default checkEmail;