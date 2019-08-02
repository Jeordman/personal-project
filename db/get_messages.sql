select id, message
from socket_messages
where room_id = $1