import { API_ROUTES } from "./constants"
import modal from "./modal"

declare const archive: HTMLInputElement
declare const filename: HTMLParagraphElement
declare const iconRemoveFile: HTMLElement


const signUp = {
    async submitNewUser(form: any, ev: any){
        ev.preventDefault()
        const formData = new FormData(form)
        
        try{
            const response:any = await fetch(`${process.env.API_URL}/signup`, {
                method: 'POST',
                body: JSON.stringify({ login: formData.get('username'), password: formData.get('password') }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            const { user = undefined, error = undefined } = await response.json()
            if(user){
                modal.open(() => {
                    location.href = '/login'
                })            
            }else{
                throw error
            }
        }catch(ex){
            alert(ex)
        }
    },
    browseFile(e: any){
        e.preventDefault()
        archive.click()
    },
    deleteFile(){
        archive.value = ''
        archive.dispatchEvent(new Event('change'))
    },
}

document.addEventListener('DOMContentLoaded',() =>{
    if(typeof archive !== 'undefined'){
        archive.addEventListener('change',() => {
            console.log(archive.files)
            if(archive?.files?.length > 0) {
                filename.textContent = archive.files[0].name
                iconRemoveFile.classList.remove('hidden')
            }else{
                filename.textContent = ''
                iconRemoveFile.classList.add('hidden')
            }       
        }, false)
    }
})

export default signUp