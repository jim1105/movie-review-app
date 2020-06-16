import React, { Component } from 'react'
import { Button } from 'reactstrap';
import {connect} from "react-redux";
import { logout, resetSignupFlag} from "../redux/actions";
import "../styles/styles.css"

const Link = (props) => {
    return (
        <div>
            <Button font-weight="bolder" color="primary" id={"btn" + props.id} 
            onClick={() => {props.selectPage(props.id); props.resetSignupFlag()}} block>{props.name}</Button>
        </div>
    )
}

export default connect(null, {logout, resetSignupFlag})(Link);