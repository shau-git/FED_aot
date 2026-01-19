CREATE TABLE users(
  user_id             SERIAL        PRIMARY KEY,
  email          VARCHAR(80)   NOT NULL UNIQUE,
  password     VARCHAR(255)  NOT NULL
);


CREATE TABLE likes(
  like_id             SERIAL        PRIMARY KEY,
  user_id          SMALLINT   NOT NULL,
  character_id     SMALLINT   NOT NULL,
 
  CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users (user_id)
);