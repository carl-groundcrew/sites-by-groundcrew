import React from "react"
import styled from "styled-components"
import PageLink from "../components/pageLink"
import Arrow from "../components/arrow"
import gsap from 'gsap'

class Layout extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.dropdownMenu = React.createRef();
  }

  showMenu(event) {
    event.preventDefault();
  
    this.setState({ showMenu: true }, () => {
      const tl = gsap.timeline({paused: true});
      tl.fromTo( document.querySelectorAll('.header-menu'),{x:'-20%'}, { x: 0, opacity:1, ease: 'power1.out', duration:.5})
      tl.play();
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    this.setState({ showMenu: false }, () => {
      const tl = gsap.timeline({paused: true});
      tl.fromTo( document.querySelectorAll('.header-menu'), {x: 0}, { opacity: 0, x:'-20%', ease: 'power1.out', duration:.5})
      tl.play();
      document.removeEventListener('click', this.closeMenu);
    });  
  }


  render() {
    const { children } = this.props
    let header 

    header = (
        <Header id="masthead" ref={this.masthead} className={`main-header ${this.state.showMenu ? "active" : ""}`}>
          <div onClick={this.showMenu} onKeyPress={this.showMenu} role='menu' tabIndex={0} className="menu width-100 flex align-self--start justify-center header-component">
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `15px`, cursor:`pointer`, margin:`0px`}} />
          </div>
          
          <div className="header-menu flex width-100 align-self--center header-component" ref={this.dropdownMenu}>
            <PageLink to='/contact'>Contact</PageLink>
            <PageLink to='/blog'>Blog</PageLink>
            <PageLink to='/projects'>Projects</PageLink>
            <PageLink to='/about'>About</PageLink>
            <PageLink to='/'>Home</PageLink>
          </div>
            
          <div className="logo flex width-100 align-self--end justify-center header-component" style={{ alignSelf:`flex-end`}}>
            <PageLink to='/'>
              <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `15px`, boxShadow: `none`, textDecoration: `none`, color: `inherit`, margin:`0px` }} />
            </PageLink>
          </div>

        </Header>
    ) 
    

    const isProject =this.props.location.pathname.includes('/project/');
    
    return (
      <Wrapper className="app">

        {header}

        <div className="header-break header-component"></div>
        <main className="main-content">{children}</main>
        { !isProject && (
          <Footer className="flex footer" style={{ paddingTop: `80px`}}>
            <p className="m-100 text-grey" style={{ textAlign: `left`, margin:0 }}>
              © {new Date().getFullYear()} Groundcrew Agency Pty Ltd
            </p> 
            <p className="m-100" style={{ margin:`auto`, marginRight: `0px`}}>
              <a className="link text-black" rel='noopener noreferrer' target='_blank' href="https://www.facebook.com/groundcrew.com.au">Facebook <Arrow></Arrow></a>
              <a className="link text-black ml20" rel='noopener noreferrer' target='_blank' href="https://www.instagram.com/groundcrew.com.au">Instagram <Arrow></Arrow></a>
            </p>
          </Footer>
        )}
      </Wrapper>
    )
  }
}

const Header = styled.div`

`

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  padding: 20px 40px;
  padding-left:80px;
`

export default Layout
