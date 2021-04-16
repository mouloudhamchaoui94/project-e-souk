import db from '../db';

const authentificate = (email, pass) => {

  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM Users WHERE email='${email}' and pass='${pass}';`;

    console.log(query);

    db.query(query, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
    });
    
  });

};

export default authentificate;