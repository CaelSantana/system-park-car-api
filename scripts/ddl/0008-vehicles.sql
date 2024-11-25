CREATE TABLE vehicles (
	plate VARCHAR(20) NOT NULL,
	vehicles_type_id INT NOT NULL,
	users_id INT NOT NULL,
	brands_id INT NOT NULL,
	created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (plate),
	UNIQUE KEY unq_vehicles_plate (plate),
  CONSTRAINT fk_vehicles_vehicles_type_id FOREIGN KEY (vehicles_type) REFERENCES vehicles_type (id),
	CONSTRAINT fk_vehicles_users_id FOREIGN KEY (users_id) REFERENCES users (id),
	CONSTRAINT fk_vehicles_brands_id FOREIGN KEY (brands_id) REFERENCES brands (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO vehicles (plate, type, users_id, brands_id)
VALUES ('ABC1234', 'small_car', 1, 1),
       ('DEF5678', 'motorcycle', 2, 2),
       ('GHI9012', 'big_car', 3, 3);

SELECT * FROM vehicles;





