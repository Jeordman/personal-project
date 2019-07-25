insert into users(username, password, first_name, last_name, photo, info)
values($1, $2, $3, $4, $5, 'Write something about yourself')
returning *;