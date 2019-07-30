GOAL POST INTO user_counselor ---------------------- x

insert into user_counselor (user_id, counselor_id, accepted)
values ($1, $2, false);

CHECK IF NOTIFICATION NEEDED---------------------- x

select * from user_counselor 
where counselor_id = $1 
and accepted = false
order by user_counselor_id;
 
REJECT REQUEST---------------------- x

delete from user_counselor
where user_counselor_id = $1;

select * from user_counselor 
where counselor_id = $2
and accepted = false
order by user_counselor_id;

ACCEPT REQUEST---------------------- x

update user_counselor 
set accepted = true
where user_counselor_id = $1;

select *
from user_counselor
where counselor_id = $2
    and accepted = true
order by user_counselor_id;

(when counselor)GET ACCEPTED USERS---------------------- 

select users.*
from users
join user_counselor on (users.user_id = user_counselor.user_id)
where counselor_id = $1
and accepted = true;

(when user)GET ACCEPTED COUNSELORS---------------------- 

select counselors.*
from counselors
join user_counselor on (counselors.counselor_id = user_counselor.counselor_id)
where user_id = $1
and accepted = true;