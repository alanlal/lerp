import Cursor from "./cursor";
import DOMScroller from "./domScroller"

const cursorElement = document.querySelector(".cursor")
const boxContainer = document.querySelector(".box-container")

const cursor = new Cursor(cursorElement)
const domScroller = new DOMScroller(boxContainer)