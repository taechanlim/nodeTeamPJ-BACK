-- CREATE database teamPJ;
-- use teamPJ;

CREATE TABLE user(
    userid varchar(15) not null,
    userpw varchar(15) not null,
    profile_img varchar(30) null,
    username varchar(15) not null,
    nickname varchar(15) not null,
    address varchar(30) not null,
    gender char(1) not null,
    telephone int(15) null,
    phonenumber int(15) not null,
    email varchar(20) not null,
    introduce varchar(100) not null,
    level int(1) DEFAULT 1 not null,
    active int(1) DEFAULT 1 not null,
    point int,
    PRIMARY KEY (nickname,userid)
);

CREATE TABLE board(
    idx int auto_increment,
    cate_name varchar(20) not null,
    subject varchar(50) not null,
    content text not null,
    thumbnail varchar(30) null,
    img varchar(200) null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int not null,
    likes int not null,
    nickname varchar(15) null,
    PRIMARY KEY (idx,cate_name),
    FOREIGN KEY (nickname) REFERENCES user (nickname)
);