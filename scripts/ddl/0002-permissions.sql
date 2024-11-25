CREATE TABLE permissions (
  id INT NOT NULL AUTO_INCREMENT,
  type enum('menu_client','menu_employee','menu_admin')
  icon VARCHAR(100)
  name VARCHAR(100)
  list_position INT(2) NULL,
  url VARCHAR(100)
  description VARCHAR(100) 
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;