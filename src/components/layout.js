import React from "react"
import styled from "styled-components"
import Masthead from "../components/masthead"
import Arrow from "../components/arrow"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    const isProject =this.props.location.pathname.includes('/project/');
    
    return (
      <Wrapper className="app">

        <Masthead />

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

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  padding: 20px 40px;
  padding-left:80px;
`

export default Layout
