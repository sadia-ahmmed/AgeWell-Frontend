import { IP_ADDRESS, IP_PORT } from "../../../configs"

const invokeFetchNursesService = async () => {
    fetch(`http://${IP_ADDRESS}:${IP_PORT}/api/auth/nurse/get`, {
        method: "GET",
        mode: "cors",
        headers: { 'Content-Type': 'application/json', },
    })
        .then(res => res.json())
        .then(result => {
            return result
        })
        .catch(error => {
            return false
        })
}


export default invokeFetchNursesService