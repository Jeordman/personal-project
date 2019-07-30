select counselors.*
from counselors
    join user_counselor on (counselors.counselor_id = user_counselor.counselor_id)
where user_id = $1
    and accepted = true;