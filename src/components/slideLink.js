import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import {TimelineLite} from 'gsap'

class pageLink extends React.Component {
  
  exit(exit, node) {
    const el = new TimelineLite({paused: true});
    el.fromTo( node.querySelector('.app'), { position:'fixed', overflow:'hidden', left:'0px', width:'100%', top:window.scrollY*-1}, {  ease:'power2.inOut', duration:exit.length/2})
    return el.play();
  }
  enter(entry, node) {
    const tl = new TimelineLite({paused: true});
    tl.fromTo( node.querySelector('.app'), { y: '100vh', height:'100vh', overflow:'hidden'}, { y: 0, ease:'power2.inOut', duration:entry.length/2})
    tl.from( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:entry.length/3, onComplete:this.afterAnimation})
    return tl.play();
  }
  
  afterAnimation() {
    var app = document.querySelector('.app');
    app.classList.add('released');
  }

  render() {
    const timing = 4
    return (
      <TransitionLink className="link"
      exit={{ length:timing, direction: this.props.direction, trigger: ({ exit, node }) => this.exit(exit, node)}}
      entry={{ length:timing, direction: this.props.direction, trigger: ({ entry, node }) => this.enter(entry, node)}}
      to={this.props.to}>
        {this.props.children}
      </TransitionLink>
    );
  }
} 

export default pageLink

