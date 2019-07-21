insert into users(username, password, first_name, last_name, photo)
values($1, $2, $3, $4, $5)
returning *;