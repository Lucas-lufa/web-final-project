const initApp = () => {
    const hamburgerBth = document.getElementById('mobile-nav')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
    }

    hamburgerBth.addEventListener('click', toggleMenu)
    mobileMenu.addEventListener('click',toggleMenu)
}

document.addEventListener("DOMContentLoaded", initApp)