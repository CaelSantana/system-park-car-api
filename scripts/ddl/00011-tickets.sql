CREATE TABLE tickets (
  id INT NOT NULL AUTO_INCREMENT,
  car_parks_id INT NOT NULL,
  garage_number INT NOT NULL,
  brands_id INT NOT NULL,
  vehicles_plate varchar(20) NOT NULL,
  start_time DATETIME NOT NULL,
  finish_time DATETIME NOT NULL,
  duration TIME NOT NULL,
  tariffs_id INT NOT NULL,
  client_id INT NOT NULL,
  employee_id INT NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_tickets_car_parks_id FOREIGN KEY (car_parks_id) REFERENCES car_parks(id),
  CONSTRAINT fk_tickets_brands_id FOREIGN KEY (brands_id) REFERENCES brands(id),
  CONSTRAINT fk_tickets_vehicles_plate FOREIGN KEY (vehicles_plate) REFERENCES vehicles(plate),
  CONSTRAINT fk_tickets_tariffs_id FOREIGN KEY (tariffs_id) REFERENCES tariffs(id),
  CONSTRAINT fk_tickets_client_id FOREIGN KEY (client_id) REFERENCES users(id),
  CONSTRAINT fk_tickets_employee_id FOREIGN KEY (employee_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tickets (car_parks_id, garage_number, brands_id, vehicles_plate, start_time, finish_time, duration, tariffs_id, client_id, employee_id)
VALUES (1, 1, 1, 'ABC1234', '2024-05-21 08:00:00', '2024-05-21 10:00:00', '02:00:00', 9, 1, 1 );

select * from tickets;
