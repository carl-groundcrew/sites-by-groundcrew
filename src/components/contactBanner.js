import React from "react"
import Arrow from "../components/arrow"
import PageLink from "../components/pageLink"

class ContactBanner extends React.Component {
  render() {
    return (
      <div className='contact height-80 flex flex-wrap'>
        <div className='ml1 p1'>
          <PageLink to='/contact'>
            <p className="h2 text-black">
              <span className='common'>Have a project</span> <br />
              Let's talk <Arrow size='large'></Arrow>
            </p>
          </PageLink>
        </div>
      </div>
    )
  }
}


export default ContactBanner
