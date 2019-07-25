update counselors 
set first_name = $2, last_name = $3, photo= $4, info = $5
where counselor_id = $1;

select * from counselors
where counselor_id = $1;