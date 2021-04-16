CREATE TABLE IF NOT EXISTS product (
  pid INTEGER NOT NULL AUTO_INCREMENT,
  sid INTEGER NOT NULL,
  name varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  qty INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  image_url varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  PRIMARY KEY (pid)
);
