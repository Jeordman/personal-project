select users.*, user_counselor.accepted, user_counselor.counselor_id, user_counselor.user_counselor_id
from users
    join user_counselor on (users.user_id = user_counselor.user_id)
where counselor_id = $1
    and accepted = true
order by user_counselor_id;

