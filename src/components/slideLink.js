import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import gsap from 'gsap'

class pageLink extends React.Component {
  exit(exit, node) {
    if(exit.direction==='left') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { position:'fixed', overflow:'hidden', left:'0px', width:'100%', top:window.scrollY*-1},
        { x: '100vw', ease: 'power2.inOut', duration:exit.length, },
      )
    } else if(exit.direction==='right') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { position:'fixed', overflow:'hidden', left:'0px', width:'100%', top:window.scrollY*-1},
        { x: '-100vw', ease: 'power2.inOut', duration:exit.length, },
      )
    } else if(exit.direction==='up') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { position:'fixed', overflow:'hidden', left:'0px', width:'100%', top:window.scrollY*-1},
        { y: '100vh', ease: 'power2.inOut', duration:exit.length, },
      )
    } else if(exit.direction==='down') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { position:'fixed', overflow:'hidden', left:'0px', width:'100%', top:window.scrollY*-1},
        { y: '-100vh', ease: 'power2.inOut', duration:exit.length, },
      )
    }
  }

  enter(entry, node) {
    if(entry.direction==='left') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { x: '-100vw', overflow:'hidden', height:'100vh', background:'#fff'},
        { x:0, ease:'power2.inOut', overflow:'auto', duration:entry.length},
      )
    } else if(entry.direction==='right') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { x: '100vw', overflow:'hidden', height:'100vh', background:'#fff'},
        { x:0, ease:'power2.inOut', overflow:'auto', duration:entry.length},
      )
    } else if(entry.direction==='up') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { y: '-100vh', overflow:'hidden', height:'100vh', background:'#fff'},
        { y:0, ease:'power2.inOut', overflow:'auto', duration:entry.length},
      )
    } else if(entry.direction==='down') {
      return gsap.fromTo(
        node.querySelector('.app'),
        { y: '100vh', overflow:'hidden', height:'100vh', background:'#fff'},
        { y:0, ease:'power2.inOut', overflow:'auto', duration:entry.length},
      )
    }
  }
  render() {
    return (
      <TransitionLink style={{boxShadow: `none`, textDecoration: `none`, color: `inherit` }}
      exit={{ length:1.5, direction: this.props.direction, trigger: ({ exit, node }) => this.exit(exit, node)}}
      entry={{ length:1.5, direction: this.props.direction, trigger: ({ entry, node }) => this.enter(entry, node)}}
      to={this.props.to}>
        {this.props.children}
      </TransitionLink>
    );
  }
} 

export default pageLink

