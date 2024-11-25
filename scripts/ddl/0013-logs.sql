CREATE TABLE logs (
  id INT NOT NULL AUTO_INCREMENT,
  vehicles_plate VARCHAR(20) NOT NULL,
  clients_id VARCHAR(100) NOT NULL,
  tickets_start_time DATETIME NOT NULL,
  tickets_finish_time DATETIME NOT NULL,
  payments_status ENUM(' pending', 'paid', 'canceled') NOT NULL DEFAULT 'pending',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
  CONSTRAINT fk_logs_vehicles_plate FOREIGN KEY (vehicles_plate) REFERENCES vehicles (plate),
  CONSTRAINT fk_logs_clients_id FOREIGN KEY (clients_id) REFERENCES users (id),
  CONSTRAINT fk_logs_employee_id FOREIGN KEY (employee_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


