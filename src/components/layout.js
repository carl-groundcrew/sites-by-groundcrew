import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import gsap from 'gsap'
import styled from "styled-components"

class Layout extends React.Component {

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
        delay:.75
      },
    )
  }

  render() {
    const { children } = this.props
    let header

    header = (
        <p style={{  margin: 0 }} >
          <TransitionLink
            exit={{ length:.5, trigger: ({ exit, node }) => this.exit(exit, node)}}
            entry={{ length:.5, trigger: ({ entry, node }) => this.enter(entry, node)}}
            style={{boxShadow: `none`, textDecoration: `none`, color: `inherit` }} to={`/`}>
            <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `120px` }} />
          </TransitionLink>
        </p>
    )

    return (
      <Wrapper className="app">
        <div>
          <Header>
            {header}
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `25px`, cursor:`pointer`, margin:`auto`, marginRight:`0px`}} />
          </Header>
          <main className="main-content">{children}</main>
        </div>
        <Footer className="flex" style={{ marginTop: `40px`}}>
          <p className="m-100" style={{ textAlign: `left`, opacity: `0.4`, margin:0 }}>
            © {new Date().getFullYear()} Groundcrew Agency Pty Ltd
          </p> 
          <p className="m-100" style={{ margin:`auto`, marginRight: `0px`}}>
            <a style={{ textDecoration:`none`, boxShadow:`none`, color: `#000`, marginRight:`30px`}} href="https://www.facebook.com/groundcrew.com.au">Facebook</a>
            <a style={{ textDecoration:`none`, boxShadow:`none`, color: `#000`}}  href="https://www.instagram.com/groundcrew.com.au">Instagram</a>
          </p>
        </Footer>
      </Wrapper>
    )
  }
}

const Header = styled.div`
 display: flex;
 padding:20px;
`

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 20px 40px;
`

export default Layout
