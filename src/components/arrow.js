import React from "react"

class Arrow extends React.Component {
  render() {
    var width = 15;
    var height = 13;
    var color = '#000'
    if(this.props.size === 'large') {
      width = 30;
      height = 26;
    } 
    if(this.props.color === 'white') {
       color = '#fff'
    }  
    return (
      <svg width={width} height={height} style={{marginLeft:'5px'}} viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path style={{fill:color}} d="M11.068 9.35366H0V0H0.436893V8.87805H11.068V5.23171L15 9.19512L11.068 13V9.35366Z"/>
      </svg>
    )
  }
}


export default Arrow
