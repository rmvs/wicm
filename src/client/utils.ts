export const getAuthorization = () => `Bearer ${document.cookie.split('=')[1]}`