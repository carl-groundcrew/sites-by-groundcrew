import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import gsap from 'gsap'

class projectLink extends React.Component {

  exit(exit, node) {

    var offsetY = node.querySelector('.single-project[data-title="'+this.props.project+'"]').offsetTop;
     
    window.scroll({
      top: offsetY,
      behavior: 'smooth'
    });

    const tl = gsap.timeline({paused: true});
    tl.to( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:exit.length/3, delay:exit.length/3})
    tl.to( node.querySelector('.fade-out-right'), { x:10, opacity:0, ease: 'power1.out', duration:exit.length/3}, '-='+exit.length/3)
    tl.to( node.querySelector('.fade-out-left'), { x:-10, opacity:0, ease: 'power1.out', duration:exit.length/3}, '-='+exit.length/3)
    tl.to( node.querySelectorAll('.app'), { opacity: 0, ease: 'power1.out', duration:exit.length/3})
    return tl.play();
  }

  enter(entry, node) {
    document.body.classList.remove('no-scroll');
    const tl = gsap.timeline({paused: true});
    tl.from( node.querySelector('.app'), { opacity: 0, ease: 'power1.in',duration:entry.length/2})
    tl.from( node.querySelectorAll('.header-component'), { x: -50, ease: 'power1.out', duration:entry.length/3})
    tl.fromTo( node.querySelector('.fade-in-left'), {x:10, opacity:0 }, { opacity:1, x: 0, ease: 'power1.out', duration:entry.length/3}, '-='+entry.length/3)
    tl.fromTo( node.querySelector('.project-byline'), {y:15, opacity:0 }, { opacity:1, y: 0, ease: 'power1.out', duration:entry.length/3}, '-='+entry.length/3)
    return tl.play();
  }

  render() {

    const timing = 1.75;

    const arrow = ()=>{
      if(this.props.arrow){
        return <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.068 9.35366H0V0H0.436893V8.87805H11.068V5.23171L15 9.19512L11.068 13V9.35366Z"/>
                </svg>
      }  
    }
    return (
      <TransitionLink className='page-link' exit={{ length:timing, trigger: ({ exit, node }) => this.exit(exit, node)}} entry={{ delay:timing, length:timing, trigger: ({ entry, node }) => this.enter(entry, node)}} to={this.props.to}>
        {this.props.children}
        {arrow()}
      </TransitionLink>
    );
  }
} 

export default projectLink

