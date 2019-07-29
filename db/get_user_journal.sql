select *
from journal
where user_id = $1
order by entry_id;