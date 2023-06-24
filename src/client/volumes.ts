import { API_ROUTES } from "./constants"

const volumes = {
    async createVolumesListing(){
        const response = await fetch(API_ROUTES.VOLUMES,{
            method: 'GET'
        })
        const data = await response.json()
        console.log(data)
    }
}

export default volumes