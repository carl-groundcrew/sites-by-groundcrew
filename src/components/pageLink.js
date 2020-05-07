import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import gsap from 'gsap'

class pageLink extends React.Component {
  exit(exit, node) {
    return gsap.to(
      node.querySelector('.app'),
      { 
        opacity: 0, 
        ease: 'power1.in',
        duration:.5 
      },
    )
  }

  enter(entry, node) {
    return gsap.from(
      node.querySelector('.app'),
      { 
        opacity: 0,
        ease: 'power1.in',
        duration:.5,
        delay:.25
      },
    )
  }

  render() {
    return (
      <TransitionLink style={{boxShadow: `none`, textDecoration: `none`, color: `inherit` }}
      exit={{ length:.5, trigger: ({ exit, node }) => this.exit(exit, node)}}
      entry={{ delay:.5, length:.5, trigger: ({ entry, node }) => this.enter(entry, node)}}
      to={this.props.to}>
        {this.props.children}
      </TransitionLink>
    );
  }
} 

export default pageLink

