CREATE TABLE brands (
  id INT NOT NULL AUTO_INCREMENT,
  vehicles_type_id INT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  name  VARCHAR(100) NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_brands_vehicles_type_id FOREIGN KEY (vehicles_type_id) REFERENCES vehicles_type (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;