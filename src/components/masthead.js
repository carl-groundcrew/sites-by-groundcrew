import React from "react"
import PageLink from "../components/pageLink"
import ProjectLinks from "../components/projectLinks"
import gsap from 'gsap'

class Masthead extends React.Component {
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
      tl.to( document.querySelectorAll('.overlay-menu'), { autoAlpha: 1, display:'block', opacity:1, ease: 'power1.out', duration:.5, onComplete:function(){document.body.classList.add('no-scroll');}})
      tl.play();
    });
  }

  closeMenu(event) {
    document.body.classList.remove('no-scroll');
    const tl = gsap.timeline({paused: true});
    tl.fromTo( document.querySelectorAll('.overlay-menu'),{}, { autoAlpha: 0, display:'none', opacity:0, ease: 'power1.out', duration:.5})
    tl.play();
  }

  render() {

    return (
      <div> 
        <div id="masthead" ref={this.masthead} className={`main-header ${this.state.showMenu ? "active" : ""}`}>
          <div onClick={this.showMenu} onKeyPress={this.showMenu} role='menu' tabIndex={0} className="menu width-100 flex align-self--start justify-center header-component">
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `15px`, cursor:`pointer`, margin:`0px`}} />
          </div>
          <div className="logo flex width-100 align-self--end justify-center header-component" style={{ alignSelf:`flex-end`}}>
            <PageLink to='/'>
              <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `15px`, boxShadow: `none`, textDecoration: `none`, color: `inherit`, margin:`0px` }} />
            </PageLink>
          </div>
        </div>
        <div className={`overlay-menu ${this.state.showMenu ? "active" : ""}`}>
          <div className='flex'>
            <div className='main-navigation'>
              <PageLink to='/'><p className='m0 h4'>Home</p></PageLink>
              <PageLink to='/projects'><p className='m0 h4'>Projects</p></PageLink>
              <PageLink to='/about'><p className='m0 h4'>About</p></PageLink>
              <PageLink to='/blog'><p className='m0 h4'>Blog</p></PageLink>
              <PageLink to='/contact'><p className='m0 h4'>Contact</p></PageLink>
            </div>
            <div className='secondary-menu mla mr0 text-right pl1 pr1'>
              <ProjectLinks />
            </div>
            <div className='close' onClick={this.closeMenu} onKeyPress={this.closeMenu} role='menu' tabIndex={0}></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Masthead