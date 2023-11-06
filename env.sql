 create table board(
 id INT(11) NOT NULL AUTO_INCREMENT, 
 title VARCHAR(255) NOT NULL, 
 content TEXT NOT NULL, 
 author VARCHAR(20) NOT NULL, 
 view_count INT(11) default 1, 
 date TIMESTAMP default CURRENT_TIMESTAMP, 
 primary key (id)
 )