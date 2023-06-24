import { API_ROUTES } from "./constants";

declare const main_nav: HTMLDivElement;
declare const dropdown: HTMLDivElement;

document.addEventListener('click',(ev: MouseEvent) => {
    if(typeof main_nav !== 'undefined' && !main_nav.contains(ev.target as any)){
        dropdown.style.display = 'none'
    }
})

const fontSizes = ['text-xs','text-sm','text-lg','text-xl','text-2xl']

const addOrRemoveFontSize = (size: number,lastSize?: number) => {
    if(lastSize !== undefined && document.documentElement.classList.contains(fontSizes[lastSize])){
        document.documentElement.classList.remove(fontSizes[lastSize])
    }
    if(!document.documentElement.classList.contains(fontSizes[size])){
        console.log('settings text to',fontSizes[size])
        document.documentElement.classList.add(fontSizes[size])
    }
    localStorage.setItem('accessibility_font_size',String(size))
}

if(!localStorage.getItem('accessibility_font_size')){
    localStorage.setItem('accessibility_font_size','1')
}

let lastFontSize: number = undefined

addOrRemoveFontSize(Number(localStorage.getItem('accessibility_font_size')))

if(localStorage.getItem('accessibility_dark_mode') === 'true'){
    document.documentElement.classList.add('dark')
}else if(localStorage.getItem('accessibility_dark_mode') === 'false'){
    document.documentElement.classList.remove('dark')
}

const navBar = {
    currentFontSize: Number(localStorage.getItem('accessibility_font_size')),
    toggleDropDownMenu(){
        dropdown.style.display = dropdown.style.display?.length === 0 || dropdown.style.display === 'none' ? 'block' : 'none'
    },
    hoverElement(elm: HTMLElement,ev: Event){
        if(ev.type === 'mouseout'){
            elm.classList.remove('bg-gray-100')
        }else{
            if(!elm.classList.contains('bg-gray-100')){
                elm.classList.add('bg-gray-100')
            }
        }                
    },
    async fetchNavBar(){
        return await fetch(API_ROUTES.NAVBAR,{
            method: 'GET'
        })
    },
    toggleMobileMenu(elm: HTMLElement){
        if(document.querySelector('#mobile-dropdown-items').classList.contains('hidden')){            
            document.querySelector('#mobile-dropdown-items').classList.remove('hidden')
            document.querySelector('#mobile-dropdown-items').classList.add('block')
        }else{
            document.querySelector('#mobile-dropdown-items').classList.remove('block')
            document.querySelector('#mobile-dropdown-items').classList.add('hidden')
        }

        if(elm.querySelector('#icon-menu-closed').classList.contains('block')){
            elm.querySelector('#icon-menu-closed').classList.remove('block')
            elm.querySelector('#icon-menu-closed').classList.add('hidden')
            elm.querySelector('#icon-menu-opened').classList.remove('hidden')
            elm.querySelector('#icon-menu-opened').classList.add('block')
        }else if(elm.querySelector('#icon-menu-opened').classList.contains('block')){
            elm.querySelector('#icon-menu-opened').classList.remove('block')
            elm.querySelector('#icon-menu-opened').classList.add('hidden')
            elm.querySelector('#icon-menu-closed').classList.remove('hidden')
            elm.querySelector('#icon-menu-closed').classList.add('block')
        }
    },
    toggleNightMode(){
        if(document.documentElement.classList.contains('dark')){
            document.documentElement.classList.remove('dark')
            localStorage.setItem('accessibility_dark_mode',"false")
        }else{
            document.documentElement.classList.add('dark')
            localStorage.setItem('accessibility_dark_mode',"true")
        }
    },
    increaseFontSize(){
        if((this.currentFontSize + 1) < fontSizes.length){            
            lastFontSize = this.currentFontSize
            this.currentFontSize++            
            addOrRemoveFontSize(this.currentFontSize, lastFontSize)
        }
    },
    decreaseFontSize(){
        if(this.currentFontSize > 0){
            lastFontSize = this.currentFontSize
            this.currentFontSize--;
            addOrRemoveFontSize(this.currentFontSize, lastFontSize)
        }        
    }
}


export default navBar