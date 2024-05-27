// Включить скролл
export const turnOnPageScroll = () => {
    window.document.documentElement.classList.remove('no-scroll');
    window.document.body.classList.remove('no-scroll');
}

// Выключить скролл
export const turnOffPageScroll = () => {
    window.document.documentElement.classList.add('no-scroll');
    window.document.body.classList.add('no-scroll');
}