import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PageLink from "../components/pageLink"

class infiniteMenu extends React.Component {

  alertMessage() {
    alert('function called');
  }

  getScrollPos() {
      return (window.pageYOffset || window.scrollTop) - (window.clientTop || 0);
  }

  setScrollPos(pos) {
        window.scrollTop = pos;
  }
  componentDidMount(el) {
    this.DOM = {el: el};
    this.DOM.menuItems =  document.querySelectorAll('.infinite-menu .menu__item');
    //this.initEvents();
    setTimeout(() => { this.cloneItems(); this.initScroll();}, 1000);
    
  }

  componentWillUnmount() {
    console.log('remove scroll');
    window.removeEventListener('scroll', this.handleScroll, true);
  }
    

  cloneItems() {
    const itemHeight = this.DOM.menuItems[0].offsetHeight;
    const menu = document.querySelector('.infinite-menu');
    let totalClones=0;    
    this.DOM.menuItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('loop__clone');
      menu.appendChild(clone);
      ++totalClones;
    });
    this.clonesHeight = totalClones * itemHeight;
    this.scrollHeight = window.innerHeight;
  }
  
  initEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    console.log('handle scroll');
    var scroll = document.querySelector('.infinite-menu').getBoundingClientRect().top;
    this.scrollPos = scroll;
    this.scrollUpdate();
  }

  resize() {
      this.cloneItems();
      this.initScroll();
  } 

  initScroll() {
    this.scrollPos = this.getScrollPos();
    if (this.scrollPos <= 0) {
        this.setScrollPos(1);
    }
  }

  scrollUpdate() {  
      this.scrollingPosition = this.clonesHeight+this.scrollPos;
      if(this.scrollPos === 0){
        document.querySelector('.secondary-menu').scrollTo(0,this.clonesHeight);
      }
      if ( this.scrollingPosition <= 0 ) {
        document.querySelector('.secondary-menu').scrollTo(0,0);
      }
  }

  render() {
  return (
    <StaticQuery
      query={linkQuery}
      render={data => {
        const projects = data.projects.edges
        return (
          <div className='infinite-menu'>
            {projects.map(({ node }) => {
                return (
                  <div className='menu__item' key={node.frontmatter.title}>
                    <PageLink className='' to={`project${node.fields.slug}`}>
                      <p className='menu-item text-black h1 m0'>{node.frontmatter.title}</p>
                    </PageLink>
                  </div>
                )
              })}
          </div>
        )
      }}
    />
  )}
}

const linkQuery = graphql`
  query linkQuery {
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {type: {eq: "project"}}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

export default infiniteMenu
