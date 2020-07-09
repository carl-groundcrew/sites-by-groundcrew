import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import {TimelineLite} from 'gsap'

class projectLink extends React.Component {
  
  exit(exit, node) {
    
    var offsetY = node.querySelector('.single-project[data-title="'+this.props.project+'"]').offsetTop;

    const el = new TimelineLite({paused: true});
    el.fromTo( node.querySelector('.app'), { overflowY:'hidden',position:'fixed',  left:'0px', width:'100vw', top:window.scrollY*-1}, { top:offsetY*-1, ease:'power2.inOut', duration:1});
    el.to( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:.75}, '-=.75')
    el.to( node.querySelectorAll('.fade-out-left'), { x:-10, opacity:0, ease: 'power1.out', duration:.75}, '-=.75')
    el.to( node.querySelectorAll('.cursor'), { opacity:0, ease: 'power1.out', duration:.75}, '-=.75')
    return el.play();
  }
  enter(entry, node) {
    const tl = new TimelineLite({paused: true});
    tl.fromTo( node.querySelector('.app'), { y: '0', height:'100vh', overflow:'hidden'}, { y: 0, ease:'power2.inOut', duration:entry.length/2})
    tl.from( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:entry.length/3, onComplete:this.afterAnimation})
    tl.fromTo( node.querySelector('.project-byline'), {y:15, opacity:0 }, { opacity:1, y: 0, ease: 'power1.out', duration:.75}, '-=1')
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
    
    return (
      <TransitionLink className="link"
      exit={{zIndex: 3, length:1.5, direction: this.props.direction, trigger: ({ exit, node }) => this.exit(exit, node)}}
      entry={{ zIndex: 2, length:3, delay:1, direction: this.props.direction, trigger: ({ entry, node }) => this.enter(entry, node)}}
      to={this.props.to}>
        {this.props.children}
      </TransitionLink>
    );
  }
} 

export default projectLink

