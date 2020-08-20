import { lerp } from "./utils";


let docscroll = 0;

window.addEventListener('scroll', function (e) {
    docscroll = window.pageYOffset || document.documentElement.scrollTop
})


let body = document.body

export default class DomScroller {
    constructor(el) {
        this.DOM = { el: el }
        this.renderedStyles = {
            positionY: {
                current: 0,
                previous: 0,
                easeAmount: 0.2,
                setScrollValue: () => docscroll
            }
        }
        this.setSize()
        this.init()
        requestAnimationFrame(() => this.render())
    }
    init() {
        for (let key in this.renderedStyles) {
            this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setScrollValue()
        }
    }
    setSize() {
        body.style.height
            = `${this.DOM.el.scrollHeight + 100}px`
    }
    render() {

        for (let key in this.renderedStyles) {
            this.renderedStyles[key].current = this.renderedStyles[key].setScrollValue()
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].easeAmount)
        }


        this.DOM.el.style.transform = `translateY(${-1 * this.renderedStyles.positionY.previous}px) translateX(0)`

        requestAnimationFrame(() => this.render())
    }
}