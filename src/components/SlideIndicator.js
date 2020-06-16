import React from "react";
import "../styles/styles.css"

const SlideIndicator = (props) => 
    <button className="indicator" onClick={(event) => props.click(event, Number(props.slideID))} >
        <div className={"circle indicator-" + props.slideStatus}></div>
    </button>


export default SlideIndicator;