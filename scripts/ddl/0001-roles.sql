CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
	access_type ENUM('external', 'internal') NOT NULL,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(100) NOT NULL,
	created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (access_type, name, description) VALUES 
('external', 'ROLE_USER', 'Cliente'),
('internal', 'ROLE_EMPLOYEE', 'Manobrista'),
('internal', 'ROLE_MASTER', 'Admin Master');

select * from roles;