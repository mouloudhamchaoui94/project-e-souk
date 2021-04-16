import db from '../db';

const createUser = (email, pass, role) => {

  return new Promise((resolve, reject) => {

    const query = `INSERT INTO Users (email,pass,role) VALUES ('${email}','${pass}',${role})`;

    console.log(query);

    db.query(query, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
    });
    
  });

};

export default createUser;