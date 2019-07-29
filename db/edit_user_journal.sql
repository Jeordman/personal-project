update journal 
set note = $3
where entry_id = $1;

select *
from journal
where user_id = $2
order by entry_id;