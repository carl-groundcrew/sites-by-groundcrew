import React from "react"
import styled from "styled-components"
import PageLink from "../components/pageLink"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    header = (
        <Header>
          <div className="menu width-100 flex align-self--start justify-center">
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `15px`, cursor:`pointer`, margin:`0px`}} />
          </div>
          
          <div className="logo flex width-100 align-self--end justify-center" style={{ alignSelf:`flex-end`}}>
            <PageLink to='/'>
              <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `15px`, boxShadow: `none`, textDecoration: `none`, color: `inherit`, margin:`0px` }} />
            </PageLink>
          </div>
        </Header>
    )

    return (
      <Wrapper className="app">
        <div>
          {header}
          <main className="main-content">{children}</main>
        </div>
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
 position:fixed;
 left:0px;
 top:0px;
 z-index:10;
 display: flex;
 flex-wrap:wrap;
 padding:15px 5px;
 color:#fff;
 height:100vh;
 border-right:1px solid rgba(255,255,255,.4);
`

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  padding: 20px 40px;
`

export default Layout
