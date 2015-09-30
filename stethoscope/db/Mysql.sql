USE stethoscope;
DROP DATABASE stethoscope;
CREATE DATABASE stethoscope;
USE stethoscope;

CREATE TABLE servers
(
    id INT NOT NULL AUTO_INCREMENT,
    ip VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),

    UNIQUE (ip)
) ENGINE=InnoDB;

CREATE TABLE cpus
(
    id INT NOT NULL AUTO_INCREMENT,
    server_id INT NOT NULL,
    percent FLOAT NOT NULL,
    date DATETIME NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (server_id)
        REFERENCES servers(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE mems
(
    id INT NOT NULL AUTO_INCREMENT,
    server_id INT NOT NULL,
    free INT NOT NULL,
    used INT NOT NULL,
    date DATETIME NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (server_id)
        REFERENCES servers(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE nets
(
    id INT NOT NULL AUTO_INCREMENT,
    server_id INT NOT NULL,
    rx INT NOT NULL,
    tx INT NOT NULL,
    date DATETIME NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (server_id)
        REFERENCES servers(id)
        ON DELETE CASCADE

) ENGINE=InnoDB;
