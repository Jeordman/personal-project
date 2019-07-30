insert into journal
    (user_id, date, mood, note)
values( $1, $2, $3, $4)
returning *;