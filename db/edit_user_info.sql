update users
set first_name = $2, last_name = $3, photo = $4, info = $5
where user_id = $1;

select *
from users
where user_id = $1;