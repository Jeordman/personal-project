select users.*
from users
    join user_counselor on (users.user_id = user_counselor.user_id)
where counselor_id = $1
    and accepted = false
order by user_counselor_id;