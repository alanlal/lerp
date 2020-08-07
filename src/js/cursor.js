import { getMousePos, lerp } from "./utils"
import gsap from "gsap/gsap-core"



let mouse = { x: 0, y: 0 }
window.addEventListener("mousemove", ev => mouse = getMousePos(ev))


export default class Cursor {
    constructor(el) {
        this.DOM = { el: el }
        this.bounds = this.DOM.el.getBoundingClientRect()

        this.renderStyles = {
            tx: {
                current: 0, previous: 0, amt: 0
            },
            ty: {
                current: 0, previous: 0, amt: 0
            }
        }

        this.onMouseMove = () => {
            this.renderStyles.tx.previous = this.renderStyles.tx.previous = mouse.x - this.bounds.width / 2
            this.renderStyles.ty.current = this.renderStyles.ty.previous = mouse.y - this.bounds.height / 2

            gsap.to(this.DOM.el, { duration: 0.9, ease: 'Power3.easeOut' })

            requestAnimationFrame(() => this.render())
            window.removeEventListener('mousemove', this.onMouseMove)
        }

        window.addEventListener('mousemove', this.onMouseMove.bind(this))
    }

    render() {

        this.renderStyles.tx.current = mouse.x - this.bounds.width / 2
        this.renderStyles.tx.current = mouse.y - this.bounds.height / 2

        for (let key in this.renderStyles) {
            this.renderStyles[key].previous = lerp(this.renderStyles[key].previous, this.renderStyles[key].current, this.renderStyles[key].amt)
        }

        this.DOM.el.style.transform = `translateX(${this.renderStyles.tx.previous}px) translateY(${this.renderStyles.ty.previous}px)`
        requestAnimationFrame(() => this.render())
    }

}