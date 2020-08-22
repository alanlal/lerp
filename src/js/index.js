import Cursor from "./cursor";
import DOMScroller from "./domScroller"
import eventEmitter from "./eventEmitter";

const cursorElement = document.querySelector(".cursor")
const boxContainer = document.querySelector(".box-container")

window.addEventListener('resize', () => {
    eventEmitter.emit('RESIZE')
})

window.addEventListener('scroll', () => {
    let docscroll = window.pageYOffset || document.documentElement.scrollTop
    eventEmitter.emit('SCROLL_POSITION_CHANGED', docscroll)
})


const cursor = new Cursor(cursorElement)
const domScroller = new DOMScroller(boxContainer)