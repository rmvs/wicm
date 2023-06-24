import { API_ROUTES } from "./constants"
import modal from "./modal"

declare const archive: HTMLInputElement
declare const filename: HTMLParagraphElement
declare const iconRemoveFile: HTMLElement


const signUp = {
    async submitNewUser(form: any, ev: any){
        ev.preventDefault()
        const formData = new FormData(form)
        
        const response:any = await fetch(API_ROUTES.SIGNUP, {
            method: 'POST',
            body: formData
        })
        const { user = undefined, error = undefined } = await response.json()
        if(user){
            modal.open(() => {
                location.href = '/login'
            })            
        }else{
            alert(error)
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