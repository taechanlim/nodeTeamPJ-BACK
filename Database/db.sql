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
    point int DEFAULT 0 not null,
    PRIMARY KEY (nickname,userid)
);

CREATE TABLE user_img (
    ui_idx INT PRIMARY KEY AUTO_INCREMENT,
    nickname varchar(15) null,
    img varchar(100) NOT NULL,
    FOREIGN KEY (nickname) REFERENCES user (nickname)
);

CREATE TABLE board(
    b_userid varchar(15) not null,
    idx int auto_increment not null,
    cate_name varchar(20) not null,
    subject varchar(50) not null,
    content text not null,
    thumbnail varchar(30) null,
    img varchar(200) null,
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    hit int DEFAULT 0 not null,
    likes int DEFAULT 0 not null,
    nickname varchar(15) null,
    PRIMARY KEY (idx,cate_name),
    FOREIGN KEY (nickname) REFERENCES user (nickname)
);

CREATE TABLE comment (
    c_userid VARCHAR(30) NOT NULL
    comment_idx INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(32) NOT NULL,
    idx INT NOT NULL,
    content TEXT NOT NULL,
    recommend INT NOT NULL DEFAULT 0, 
    date timestamp DEFAULT CURRENT_TIMESTAMP not null,
    FOREIGN KEY (nickname) REFERENCES user (nickname),
    FOREIGN KEY (idx) REFERENCES board (idx)
);
CREATE TABLE category (
    cate_idx INT PRIMARY KEY AUTO_INCREMENT,
    cate_name VARCHAR(32) NOT NULL
);

CREATE TABLE subcategory (
    subcate_idx INT PRIMARY KEY AUTO_INCREMENT,
    cate_idx INT NOT NULL,
    subcate_name VARCHAR(32) NOT NULL,
    FOREIGN KEY (cate_idx) REFERENCES category (cate_idx)
);

CREATE TABLE likes ( 
    like_idx INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(30) NOT NULL,
    idx INT NOT NULL,
    like_num INT NOT NULL DEFAULT 0,
    dislike_num INT NOT NULL DEFAULT 0,
    like_check INT NOT NULL DEFAULT 0,
    FOREIGN KEY (nickname) REFERENCES user (nickname),
    FOREIGN KEY (idx) REFERENCES board (idx)
);

CREATE TABLE HashTag(
    tag_id INT PRIMARY KEY,
    keywords varchar(20) NOT NULL,
    bid INT NOT NULL
);

CREATE TABLE scrap(
    scrap_idx INT PRIMARY KEY AUTO_INCREMENT,
    s_userid VARCHAR(30) NOT NULL,
    bid INT NOT NULL
);
