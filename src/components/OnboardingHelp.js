import React from "react";
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {toggleBoarding} from "../redux/actions";
import "../styles/styles.css"

const OnboardingHelp = props => {
    return (
        <Button onClick = {()=>{props.toggleBoarding()}}>Show onBoarding</Button>    
    )
}

 export default connect(null,{toggleBoarding}) (OnboardingHelp);