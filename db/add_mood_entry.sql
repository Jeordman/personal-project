insert into mood_tracker(user_id, date, mood)
values( $1, $2, $3 )
returning *;