CREATE TABLE car_parks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) DEFAULT NULL,
  capacity INT NOT NULL,
  zip_code VARCHAR(8) NOT NULL,
	street VARCHAR(255) NOT NULL,
	number VARCHAR(255) NOT NULL,
	complement VARCHAR(255) NULL,
	district VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO car_parks (name, phone, capacity, zip_code, street, number, complement, district, city, state)
VALUES ('Unidade matriz', '(11) 99999-9999', 84, '12345678', 'Rua Exemplo', '123', 'Apto 101', 'Centro', 'Cidade Exemplo', 'Estado Exemplo');

select * from car_parks