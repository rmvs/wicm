import { getAuthorization } from "./utils"

const service = {
    async fetchService(id: any){
        const response = await fetch(`${process.env.API_URL}/services/${id}`,{
            headers: {
                'Authorization': getAuthorization()
            }
        })
        const { service = {} } = await response.json()
        document.getElementById('service-description').innerHTML = JSON.stringify(service)
    }
}

export default service