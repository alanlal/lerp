import { lerp } from "./utils";
import eventEmitter from "./eventEmitter";

let body = document.body

export default class DomScroller {

    constructor(el) {
        this.DOM = { el: el }
        this.eventEmitter = eventEmitter


        this.docscroll = 0;

        this.renderedStyles = {
            positionY: {
                current: 0,
                previous: 0,
                easeAmount: 0.1,
                setScrollValue: () => this.docscroll
            }
        }

        this.setSize()
        this.eventEmitter.on('RESIZE', () => this.setSize())


        this.init()
        requestAnimationFrame(() => this.render())
    }
    init() {

        this.eventEmitter.on('SCROLL_POSITION_CHANGED', (docscroll) => {
            this.docscroll = docscroll
        })

        for (let key in this.renderedStyles) {
            this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setScrollValue()
        }
    }


    setSize() {
        body.style.height = `${this.DOM.el.scrollHeight + 100}px`
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