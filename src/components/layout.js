import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    header = (
        <p style={{  margin: 0 }} >
          <Link style={{boxShadow: `none`, textDecoration: `none`, color: `inherit` }} to={`/`}>
            <img src={'/assets/logo.svg'} alt="Logo" style={{ width: `120px` }} />
          </Link>
        </p>
    )

    return (
      <Wrapper>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
          }}
        >
          <Header>
            {header}
            <img src={'/assets/menu.svg'} alt="Menu" style={{ width: `25px`, cursor:`pointer`, margin:`auto`, marginRight:`0px`}} />
          </Header>
          <main>{children}</main>
        </div>
        <Footer>
          <p style={{ textAlign: `left`, opacity: `0.4`, margin:0 }}>
            © {new Date().getFullYear()} Groundcrew Agency Pty Ltd
          </p> 
          <p style={{ margin:`auto`, marginRight: `0px`}}>
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
  display:flex;
  text-align: center;
  margin: 20px 40px;
`

export default Layout
