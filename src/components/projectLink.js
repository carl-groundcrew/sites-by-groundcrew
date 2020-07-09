import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import {TimelineLite} from 'gsap'

class projectLink extends React.Component {
  
  exit(exit, node) {
    //document.querySelector('.tl-edges').style.overflowX = 'hidden'
    //document.documentElement.style.pointerEvents = 'none'
    //document.documentElement.style.overflow = 'hidden'
    //node.querySelector('.app').style.overflowY = 'hidden'
    //node.querySelector('.app').style.fixed = 'fixed'
    //node.querySelector('.app').style.top = window.scrollY*-1
    
    var offsetY = node.querySelector('.single-project[data-title="'+this.props.project+'"]').offsetTop;

    //window.scroll({
    //  top: offsetY,
    //  behavior: 'smooth'
    //});

    const el = new TimelineLite({paused: true});
    el.fromTo( node.querySelector('.app'), { overflowY:'hidden',position:'fixed',  left:'0px', width:'100vw', top:window.scrollY*-1}, { top:offsetY*-1, ease:'power2.inOut', duration:1});
    el.to( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:1}, '-=1')
    return el.play();
  }
  enter(entry, node) {
    const tl = new TimelineLite({paused: true});
    tl.fromTo( node.querySelector('.app'), { y: '0', height:'100vh', overflow:'hidden'}, { y: 0, ease:'power2.inOut', duration:entry.length/2})
    tl.from( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:entry.length/3, onComplete:this.afterAnimation})
    tl.fromTo( node.querySelector('.project-byline'), {y:15, opacity:0 }, { opacity:1, y: 0, ease: 'power1.out', duration:entry.length/3}, '-='+entry.length/3)
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
      entry={{ zIndex: 2, length:5, delay:1, direction: this.props.direction, trigger: ({ entry, node }) => this.enter(entry, node)}}
      to={this.props.to}>
        {this.props.children}
      </TransitionLink>
    );
  }
} 

export default projectLink

