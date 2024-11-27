CREATE TABLE vehicles_type (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(100) NOT NULL,
  type_name VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;