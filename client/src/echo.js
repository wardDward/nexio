import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;


const echo = new Echo({
  // authEndpoint: "http://api.nexio.test/broadcasting/auth",
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  wssPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
  authorizer: (channel, options) => {
    return {
        authorize: (socketId, callback) => {
            axios.post('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            })
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                callback(true, error);
            });
        }
    };
},

});

export default echo;
