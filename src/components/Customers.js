import React, { Fragment } from "react";
import {Table} from "reactstrap";
import {connect} from "react-redux";
import "../styles/styles.css"

const mapStateToProps = state => {
    const username = state.userReducer.username;
    const customers = state.chatRoom.customers;
    return {username, customers }
}

const Customers = props =>
<Fragment>
    <h4>Hi {props.username}!</h4>
    <h1>Live Support</h1>
    {(props.customers.includes(props.username))&& 
        <Fragment>
            <h4>Participants:</h4>
            <Table striped bordered className="my-4">
                <tbody>
                    {
                        props.customers.map((customer, index) => 
                            <tr key={index}>
                                <td>{customer}</td>
                            </tr>)
                    }
                </tbody>
            </Table>
                
        </Fragment>
    }
</Fragment>
        

export default connect(mapStateToProps)(Customers);