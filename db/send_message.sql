insert into socket_messages
    (room_id, message, sender, is_counselor)
values
    ($1, $2, $3, $4)