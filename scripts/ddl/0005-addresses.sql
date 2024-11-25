CREATE TABLE addresses (
	id INT NOT NULL AUTO_INCREMENT,
	users_id INT NOT NULL,
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
  CONSTRAINT fk_addresses_users_id FOREIGN KEY (users_id) REFERENCES users (id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO addresses (users_id, zip_code, street, number, complement, district, city, state) VALUES
	(1, '12345678', 'Rua Exemplo', '123', 'Apto 101', 'Centro', 'Cidade Exemplo', 'Estado Exemplo'),
	(2, '87654321', 'Avenida Teste', '456', 'Sala 201', 'Bairro Teste', 'Outra Cidade', 'Outro Estado'),
	(3, '11112222', 'Praça Principal', '789', NULL, 'Centro', 'Cidade Principal', 'Estado Principal');

select * from addresses;