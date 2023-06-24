// const { createApp } = Vue

// createApp({
//     data(){
//         return {
//             darkMode: false
//         }
//     },
//     mounted(){
//         this.root = document.documentElement
//     },
//     methods: {
//         setDarkMode(){
//             this.darkMode = !this.darkMode

//         }
//     },
//     watch: {
//         darkMode: {
//             handler: function(){
//                 this.$nextTick(() => {
//                     const theme = this.darkMode ? "dark" : "light"
//                     this.root.style.setProperty('--sider-bg',getComputedStyle(this.root).getPropertyValue(`--sider-background-${theme}`))
//                     this.root.style.setProperty('--header-bg',getComputedStyle(this.root).getPropertyValue(`--header-background-${theme}`))
//                     this.root.style.setProperty('--content-bg',getComputedStyle(this.root).getPropertyValue(`--content-background-${theme}`))
//                     this.root.style.setProperty('--main-content-bg',getComputedStyle(this.root).getPropertyValue(`--main-content-background-${theme}`))
//                     this.root.style.setProperty('--color',getComputedStyle(this.root).getPropertyValue(`--color-${theme}`))


//                     this.root.style.setProperty('--sider-border',getComputedStyle(this.root).getPropertyValue(`--sider-border-${theme}`))
//                     this.root.style.setProperty('--content-border',getComputedStyle(this.root).getPropertyValue(`--content-border-${theme}`))

//                     this.root.style.setProperty('--button-bg-color',getComputedStyle(this.root).getPropertyValue(`--button-bg-color-${theme}`))
//                     this.root.style.setProperty('--button-color',getComputedStyle(this.root).getPropertyValue(`--button-color-${theme}`))
//                     this.root.style.setProperty('--dark-mode-icon-color',getComputedStyle(this.root).getPropertyValue(`--dark-mode-icon-color-${theme}`))
//                     this.root.style.setProperty('--dropdown-bg',getComputedStyle(this.root).getPropertyValue(`--dropdown-bg-color-${theme}`))
//                 })
//             }
//         }
//     }
// }).mount('#app')

(() => {
    // document.querySelector('#dark-mode-lbl').textContent = 'Dark Mode'   
})()

console.log(1)

window.isDarkMode = false;
window.setDarkMode = () => {
    window.isDarkMode = !window.isDarkMode
    const theme = window.isDarkMode ? "dark" : "default"
    document.querySelector('#dark-mode-lbl').textContent = `${window.isDarkMode ? 'Light' : 'Dark'} Mode`
    document.documentElement.style.setProperty('--sider-bg',getComputedStyle(document.documentElement).getPropertyValue(`--sider-background-${theme}`))
    document.documentElement.style.setProperty('--header-bg',getComputedStyle(document.documentElement).getPropertyValue(`--header-background-${theme}`))
    document.documentElement.style.setProperty('--content-bg',getComputedStyle(document.documentElement).getPropertyValue(`--content-background-${theme}`))
    document.documentElement.style.setProperty('--main-content-bg',getComputedStyle(document.documentElement).getPropertyValue(`--main-content-background-${theme}`))
    document.documentElement.style.setProperty('--color',getComputedStyle(document.documentElement).getPropertyValue(`--color-${theme}`))
    document.documentElement.style.setProperty('--sider-border',getComputedStyle(document.documentElement).getPropertyValue(`--sider-border-${theme}`))
    document.documentElement.style.setProperty('--content-border',getComputedStyle(document.documentElement).getPropertyValue(`--content-border-${theme}`))
    document.documentElement.style.setProperty('--button-bg-color',getComputedStyle(document.documentElement).getPropertyValue(`--button-bg-color-${theme}`))
    document.documentElement.style.setProperty('--button-color',getComputedStyle(document.documentElement).getPropertyValue(`--button-color-${theme}`))
    document.documentElement.style.setProperty('--dark-mode-icon-color',getComputedStyle(document.documentElement).getPropertyValue(`--dark-mode-icon-color-${theme}`))
    document.documentElement.style.setProperty('--dropdown-bg',getComputedStyle(document.documentElement).getPropertyValue(`--dropdown-bg-color-${theme}`))
    document.documentElement.style.setProperty('--card-bg',getComputedStyle(document.documentElement).getPropertyValue(`--card-background-${theme}`))
    document.documentElement.style.setProperty('--table-header-bg',getComputedStyle(document.documentElement).getPropertyValue(`--table-header-${theme}`))
}


// window.helloWorld = () => {
//     alert(1)
// }