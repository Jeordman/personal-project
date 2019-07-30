delete from user_counselor
where user_counselor_id = $1;

select * from user_counselor 
where counselor_id = $2
and accepted = false
order by user_counselor_id;