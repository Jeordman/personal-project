update user_counselor 
set accepted = true
where user_counselor_id = $1;

select *
from user_counselor
where counselor_id = $2
    and accepted = true
order by user_counselor_id;