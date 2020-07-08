import React from "react"
import PageLink from "../components/pageLink"
import InfiniteMenu from "../components/infiniteMenu"
import gsap from 'gsap'

class Masthead extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      showProjects:false
    }
    this.showMenu = this.showMenu.bind(this);
    this.showProjects = this.showProjects.bind(this);
    this.hideProjects = this.hideProjects.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.dropdownMenu = React.createRef();
    this.infiniteMenu = React.createRef();
  }

  showMenu(event) {
    event.preventDefault();
    this.infiniteMenu.current.initEvents()
    this.setState({ showMenu: true }, () => {
      const tl = gsap.timeline({paused: true});
      tl.to( document.querySelectorAll('.overlay-menu'), { autoAlpha: 1, display:'block', opacity:1, ease: 'power1.out', duration:.5, onComplete:function(){document.body.classList.add('no-scroll');}})
      tl.staggerFromTo(document.querySelectorAll('.overlay-menu .main-navigation .page-link .h4'), 1, {y:'100%'}, {y:0, duration:.75, ease: 'power1.in',}, 0.15);
      tl.play();
    });
  }

  closeMenu(event) {
    document.body.classList.remove('no-scroll');
    const tl = gsap.timeline({paused: true});
    tl.fromTo( document.querySelectorAll('.overlay-menu'),{}, { autoAlpha: 0, display:'none', opacity:0, ease: 'power1.out', duration:.5})
    tl.play();
  }

  showProjects() {
    this.setState({ showProjects: true }, () => {
      const projectTimeline = gsap.timeline({paused: true});
      projectTimeline.staggerTo(document.querySelectorAll('.overlay-menu .secondary-menu .menu-item'), .75, {opacity:1, y:'0%', ease: 'power1.out',}, 0.075);
      projectTimeline.play();
    });
  }

  hideProjects() {
    this.setState({ showProjects: false }, () => {
      const tl = gsap.timeline({paused: true});
      tl.staggerTo(document.querySelectorAll('.overlay-menu .secondary-menu .menu-item'), .65, { y:'100%', duration:.75, ease: 'power1.in',}, 0);
      tl.play();
    });
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
              <PageLink to='/'><button onMouseEnter={this.hideProjects}><p className='m0 h4'>Home</p></button></PageLink> 
              <PageLink to='/projects'><button onMouseEnter={this.showProjects}><p className={`m0 h4 ${this.state.showProjects ? "active" : ""}`}>Projects</p></button></PageLink>
              <PageLink to='/about'><button onMouseEnter={this.hideProjects}><p className='m0 h4'>About</p></button></PageLink>
              <PageLink to='/blog'><button onMouseEnter={this.hideProjects}><p className='m0 h4'>Blog</p></button></PageLink>
              <PageLink to='/contact'><button onMouseEnter={this.hideProjects}><p className='m0 h4'>Contact</p></button></PageLink>
            </div>
            <div className='secondary-menu mla mr0 text-right pl1 pr1'>
              <InfiniteMenu ref={this.infiniteMenu} />
            </div>
            <div className='close' onClick={this.closeMenu} onKeyPress={this.closeMenu} role='menu' tabIndex={0}></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Masthead