import { gsap } from 'gsap';
import { lerp, getMousePos } from './utils';

// Track the mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

export default class Cursor {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.el.style.opacity = 0;

        this.bounds = this.DOM.el.getBoundingClientRect();

        this.renderStyles = {
            tx: { previous: 0, current: 0, amt: 0.2 },
            ty: { previous: 0, current: 0, amt: 0.2 }
        };

        this.onMouseMoveEv = () => {
            gsap.to(this.DOM.el, { duration: 0.9, ease: 'Power3.easeOut', opacity: 1 });
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    render() {

        this.renderStyles.tx.current = mouse.x - this.bounds.width / 2
        this.renderStyles.ty.current = mouse.y - this.bounds.height / 2

        for (let key in this.renderStyles) {
            this.renderStyles[key].previous = lerp(this.renderStyles[key].previous, this.renderStyles[key].current, this.renderStyles[key].amt);
        }
        this.DOM.el.style.transform = `translateX(${this.renderStyles.tx.previous}px) translateY(${this.renderStyles.ty.previous}px)`
        requestAnimationFrame(() => this.render());
    }

}