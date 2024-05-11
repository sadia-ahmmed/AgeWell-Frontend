import { io } from "socket.io-client";
import { IP_ADDRESS, IP_PORT } from "../../configs";


const socket = io(`http://${IP_ADDRESS}:${IP_PORT}`)

export default socket