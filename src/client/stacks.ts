import { getAuthorization } from "./utils"

// @ts-nocheck
declare const file: HTMLInputElement
declare const filename: HTMLParagraphElement
declare const editor: HTMLElement
declare const iconRemoveFile: HTMLElement
declare const notification: HTMLElement



const stacks = {
    browseFile(e: any){
        e.preventDefault()
        file.click()
    },
    deleteFile(){
        file.value = ''
        file.dispatchEvent(new Event('change'))
    },
    closeNotification(){
        if(!notification.classList.contains('hidden')){
            notification.classList.add('hidden')
        }
        notification.classList.remove('bg-red-200','text-red-600','bg-green-200','text-green-600')
    },
    async submitStack(form:any,e: any){
        e.preventDefault()        

        const formData = new FormData(form)      
        try{
            const response = await fetch(`${process.env.API_URL}/stacks`,{
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': getAuthorization()
                }
            })
            const { servicesCreated = {}, error: { json: { message = {}} = {} } } = await response.json()
            if(response.status === 200){
                notification.classList.remove('hidden')
                notification.classList.add('bg-green-200','text-green-600')
                document.getElementById('notification-message').innerHTML = 'A stack foi submetida!'
                // alert('A stack foi submetida!')
            }else{
                notification.classList.remove('hidden')                
                notification.classList.add('bg-red-200','text-red-600')
                document.getElementById('notification-message').innerHTML = message
            }
        }catch(ex){
            alert(String(ex))
        }finally {
            form.reset()
            this.deleteFile()
        }
    }
}

document.addEventListener('DOMContentLoaded',() =>{
    if(typeof file !== 'undefined'){
        file.addEventListener('change',() => {
            console.log(file.files)
            if(file?.files?.length > 0) {
                filename.textContent = file.files[0].name
                // editor.disabled = true
                iconRemoveFile.classList.remove('hidden')
            }else{
                filename.textContent = ''
                // editor.disabled = false
                iconRemoveFile.classList.add('hidden')
            }       
        }, false)
    }
})



export default stacks