select *
from user_counselor
where counselor_id = $1
    and accepted = false
order by user_counselor_id;