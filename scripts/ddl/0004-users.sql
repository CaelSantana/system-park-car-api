CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	roles_id INT NOT NULL,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	cpf VARCHAR(14) DEFAULT NULL,
	password VARCHAR(100) NULL,
	birth DATETIME NULL,
	phone VARCHAR(15) DEFAULT NULL,
	created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id),
	UNIQUE KEY unq_users_cpf (cpf),
	UNIQUE KEY unq_users_email (email),
	CONSTRAINT fk_users_roles FOREIGN KEY (roles_id) REFERENCES roles (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (roles_id, full_name, email, cpf, password, birth, phone) VALUES
(1, 'John Doe', 'john.doe@example.com', '123.456.789-00', '123456', '1985-05-20 00:00:00', '(11) 99999-9999'),
(2, 'João Manobra', 'joao.manobra@example.com', '123.456.789-01', '123456', '1985-05-20 00:00:00', '(11) 99999-9999'),
(3, 'Cael Santana', 'cael.santana@example.com', '123.456.789-02', '123456', '1985-05-20 00:00:00', '(11) 99999-9999');

select * from users;