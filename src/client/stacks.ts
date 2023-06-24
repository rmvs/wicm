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
    }
}

document.addEventListener('DOMContentLoaded',() =>{
    if(typeof file !== 'undefined'){
        file.addEventListener('change',() => {
            console.log(file.files)
            if(file?.files?.length > 0) {
                filename.textContent = file.files[0].name
                editor.disabled = true
                iconRemoveFile.classList.remove('hidden')
            }else{
                filename.textContent = ''
                editor.disabled = false
                iconRemoveFile.classList.add('hidden')
            }       
        }, false)
    }
})



export default stacks