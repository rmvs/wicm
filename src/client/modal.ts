
const modal = {
    onClose: () => {},
    async close(){
        document.querySelector('#modal').classList.add('hidden')               
    },
    async open(onClose?: any){
        document.querySelector('#modal').classList.remove('hidden')
        this.onClose = onClose
    }
}

export default modal