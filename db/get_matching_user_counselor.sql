select *
from user_counselor
where user_id = $1
    and counselor_id = $2
    and accepted = true;