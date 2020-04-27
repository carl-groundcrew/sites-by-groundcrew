import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    header = (
      <p
        style={{
          padding: 20,
          margin: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          <img src={'/assets/logo.svg'} alt="Logo" style={{
            width: `120px`,
            textDecoration: `none`,
            color: `inherit`,
          }} />
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
          <header>{header}</header>
          <main>{children}</main>
        </div>
        <Footer style={{
            textAlign: `left`,
            opacity: `0.4`,
          }} >
          © {new Date().getFullYear()} Groundcrew Agency Pty Ltd
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
