CREATE TABLE payments (
  id INT NOT NULL AUTO_INCREMENT,
  tickets_id INT NOT NULL,
  method ENUM( 'cash', 'debit_card', 'credit_card', 'pix', 'bank_transfer', 'others') NOT NULL DEFAULT 'cash',
  amount DECIMAL(10, 2) NOT NULL,
  date DATETIME NOT NULL,
  status ENUM('pending', 'paid', 'canceled') NOT NULL DEFAULT 'pending',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  CONSTRAINT fk_payments_tickets_id FOREIGN KEY (tickets_id) REFERENCES tickets (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO payments (tickets_id, method, amount, date, status)
VALUES (1, 'cash', 100.00, '2024-05-21 10:30:00', 'paid');

select * from payments;






