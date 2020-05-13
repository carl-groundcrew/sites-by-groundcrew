import React from "react"
import styled from "styled-components"
import PageLink from "../components/pageLink"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    header = (
        <Header id="masthead">
          
          <div className="menu width-100 flex align-self--start justify-center header-component">
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `15px`, cursor:`pointer`, margin:`0px`}} />
          </div>
          
          <div className="logo flex width-100 align-self--end justify-center header-component" style={{ alignSelf:`flex-end`}}>
            <PageLink to='/'>
              <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `15px`, boxShadow: `none`, textDecoration: `none`, color: `inherit`, margin:`0px` }} />
            </PageLink>
          </div>
          
        </Header>
    )

    return (
      <Wrapper className="app">
        
        {header}
        <div className="header-break header-component"></div>
        <main className="main-content">{children}</main>
     
        <Footer className="flex" style={{ paddingTop: `80px`}}>
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
