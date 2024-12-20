CREATE TABLE tickets (
	id INT NOT NULL AUTO_INCREMENT,
	car_parks_id INT NOT NULL,
	vehicles_id INT NOT NULL,
  vehicles_plate VARCHAR(10) NOT NULL,
	vehicles_type_id INT NOT NULL,
	brands_id INT NOT NULL,
  garage_number INT NOT NULL,
	start_time DATETIME NOT NULL,
	finish_time DATETIME,
	duration INT NULL,
	tariffs_id INT NULL,
	client_id INT NOT NULL,
	employee_id INT NOT NULL,
	status ENUM('pending', 'paid', 'canceled') NOT NULL DEFAULT 'pending',
	created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
	updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
	PRIMARY KEY (id),
	CONSTRAINT fk_tickets_car_parks_id FOREIGN KEY (car_parks_id) REFERENCES car_parks(id),
	CONSTRAINT fk_tickets_vehicles_id FOREIGN KEY (vehicles_id) REFERENCES vehicles(id),
  CONSTRAINT fk_tickets_vehicles_plate FOREIGN KEY (vehicles_plate) REFERENCES vehicles(plate),
	CONSTRAINT fk_tickets_vehicles_type_id FOREIGN KEY (vehicles_type_id) REFERENCES vehicles_type(id),
	CONSTRAINT fk_tickets_brands_id FOREIGN KEY (brands_id) REFERENCES brands(id),
	CONSTRAINT fk_tickets_tariffs_id FOREIGN KEY (tariffs_id) REFERENCES tariffs(id),
	CONSTRAINT fk_tickets_client_id FOREIGN KEY (client_id) REFERENCES users(id),
	CONSTRAINT fk_tickets_employee_id FOREIGN KEY (employee_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;