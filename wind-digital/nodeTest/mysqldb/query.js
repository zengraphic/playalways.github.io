CREATE SCHEMA windDigitalLinks;

USE node_mysql;

CREATE TABLE `windDigitalLinks`.`links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `link_title` VARCHAR(245) NULL,
  `link_url` VARCHAR(745) NULL,
  `link_color` VARCHAR(245) NULL,
  PRIMARY KEY (`id`));


INSERT INTO windDigitalLinks (link_title,link_url,link_color)
VALUES ('Ferie','https://docs.google.com/spreadsheets/d/1UDNGxeO9Cgbzs_jQONeFHCLEHeZ_-shfFJANh9APJS4/edit?pref=2&pli=1#gid=1784562006','red')
,('Allocazioni','https://docs.google.com/spreadsheets/d/1V4no6t1VydCDNSMZHIWkONBks0GiPZo3fr2M0pgagE4/edit?ts=582ef897%23gid%3D600449670#gid=804002849','green')
,('Restyle','https://playalways.github.io','orange');

SELECT * FROM artists;