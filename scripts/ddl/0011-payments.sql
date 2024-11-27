CREATE TABLE payments (
  id INT NOT NULL AUTO_INCREMENT,
  tickets_id INT NOT NULL,
  client_id INT NOT NULL,
  date DATETIME NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  method ENUM('cash', 'debit_card', 'credit_card', 'pix', 'bank_transfer', 'others') NOT NULL DEFAULT 'cash',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_payments_tickets_id FOREIGN KEY (tickets_id) REFERENCES tickets(id),
  CONSTRAINT fk_payments_client_id FOREIGN KEY (client_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;





