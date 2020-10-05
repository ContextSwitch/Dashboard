CREATE TABLE `document` (
  `documentId` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) DEFAULT NULL,
  `documentType` varchar(32),
  `documentName` varchar(64),
  `documentUrl` varchar(512),
  `content` longtext,
  `documentFeedUrl` varchar(512),
  PRIMARY KEY (`documentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `item` (
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) DEFAULT NULL,
  `itemTitle` varchar(32),
  `itemUrl` varchar(512),
  `documentId` int,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create user 'dashboard_user'@'localhost' identified by 'StormCloud3';
GRANT ALL PRIVILEGES ON * . * TO 'dashboard_user'@'localhost';
