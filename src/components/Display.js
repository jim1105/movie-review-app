import React from 'react'
import "../styles/styles.css"

const Display = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Display;