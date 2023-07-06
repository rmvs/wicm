export const getAuthorization = () => {
    return `Bearer ${document.cookie.split('; ').find(r => r.startsWith('accessToken=')).split('=')[1]}`
}