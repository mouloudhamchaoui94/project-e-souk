CREATE TABLE IF NOT EXISTS seller (
  sid INTEGER NOT NULL AUTO_INCREMENT,
  fstname varchar(255) NOT NULL,
  famname varchar(255) NOT NULL,
  birthday varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  iban varchar(255) NOT NULL,
  code_entreprise varchar(255) NOT NULL,
  PRIMARY KEY (sid)
);
