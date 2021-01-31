import {gsap} from 'gsap';
import {getMousePos, getSiblings, lerp} from './utils'

//Grab mouse position and set it to mouse state
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)));


export default class Cursor {
    constructor(el) {
        this.Cursor = el;
        this.Cursor.style.opacity = 0;
        this.Item = document.querySelectorAll('.hero-inner-link-item');
        // this.Hero = document.querySelector('.hero-inner');
        // this.bounds = this.Cursor.getBoundingClientRect();
        this.cursorCnfigs = {
            x: {previous: 0, current: 0, amt: 0.2},
            y: {previous: 0, current: 0, amt: 0.2}
        };
        //    Define mouse move function
        this.onMouseMoveEv = () => {
            this.cursorCnfigs.x.previous = this.cursorCnfigs.x.current = mouse.x;
            this.cursorCnfigs.y.previous = this.cursorCnfigs.y.current = mouse.y;

            //    Set cursor opacity to 1 when hovered on the screen
            gsap.to(this.Cursor, {
                duration: 1,
                ease: "Power3.easeOut",
                opacity: 1,
            })

            //Execute scale
            this.onScaleMouse();


            //    requestAnimationFrame
            requestAnimationFrame(() => this.render())

            //    Cleanup function
            window.removeEventListener('mousemove', this.onMouseMoveEv)

        }
        //    Assign the mouse function
        window.addEventListener('mousemove', this.onMouseMoveEv)
    }

    onScaleMouse = () => {

        this.Item.forEach((link) => {

            if (link.matches(':hover')) {
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            }


            link.addEventListener('mouseenter', () => {
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            })
            //    Scale down when not hover on media
            link.addEventListener('mouseleave', () => {
                this.scaleAnimation(this.Cursor.children[0], 0)
            })

            link.children[1].addEventListener('mouseenter', () => {
                this.scaleAnimation(this.Cursor.children[0], 1.2)
            })

            link.children[1].addEventListener('mouseleave', () => {
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            })

        })
    }

    //Scale animation
    scaleAnimation(el, amt) {
        gsap.to(el, {
            duration: 0.6,
            scale: amt,
            ease: 'Power3.easeOut'
        })
    }

    render() {
        this.cursorCnfigs.x.current = mouse.x;
        this.cursorCnfigs.y.current = mouse.y;

        //    lerp
        for (const key in this.cursorCnfigs) {
            this.cursorCnfigs[key].previous = lerp(
                this.cursorCnfigs[key].previous,
                this.cursorCnfigs[key].current,
                this.cursorCnfigs[key].amt
            )
        }
        //    setting the cursor x and y to our cursor html element
        this.Cursor.style.transform = `
        translateX(${this.cursorCnfigs.x.previous}px) 
        translateY(${this.cursorCnfigs.y.previous}px)
        `;

        requestAnimationFrame(() => this.render())
    }
}
