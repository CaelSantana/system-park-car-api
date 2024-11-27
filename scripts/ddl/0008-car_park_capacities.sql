CREATE TABLE car_park_capacities (
	id INT NOT NULL AUTO_INCREMENT,
	car_parks_id INT NOT NULL,
	vehicles_type_id INT NOT NULL,
	capacity INT NOT NULL,
	created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id),
	UNIQUE (car_parks_id, vehicles_type_id),
	CONSTRAINT fk_car_park_capacities_car_parks_id FOREIGN KEY (car_parks_id) REFERENCES car_parks(id),
	CONSTRAINT fk_car_park_capacities_vehicles_type_id FOREIGN KEY (vehicles_type_id) REFERENCES vehicles_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;