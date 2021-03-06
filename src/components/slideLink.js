import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import {TimelineLite} from 'gsap'

class pageLink extends React.Component {
  
  exit(exit, node) {
    document.querySelector('.tl-edges').style.overflowX = 'hidden'
    document.documentElement.style.pointerEvents = 'none'
    document.documentElement.style.overflow = 'hidden'
    const el = new TimelineLite({paused: true});
    el.fromTo( node.querySelector('.app'), { overflowY:'hidden',position:'fixed',  left:'0px', width:'100vw', top:window.scrollY*-1}, {ease:'power2.inOut', duration:exit.length/2});
    return el.play();
  }
  enter(entry, node) {
    const tl = new TimelineLite({paused: true});
    tl.fromTo( node.querySelector('.app'), { y: '95vh', height:'100vh', overflow:'hidden'}, { y: 0, ease:'power2.inOut', duration:entry.length/2})
    tl.from( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:entry.length/3, onComplete:this.afterAnimation})
    tl.fromTo( node.querySelector('.project-byline'), {y:15, opacity:0 }, { opacity:1, y: 0, ease: 'power1.out', duration:entry.length/3}, '-=1')
    return tl.play();
  }
  
  afterAnimation() {
    var app = document.querySelector('.app');
    app.classList.add('released');
    app.style.overflow = 'unset';
    document.documentElement.style.pointerEvents = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.querySelector('.tl-edges').style.overflowX = 'unset'
  }

  render() {
    const timing = 2.5
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

