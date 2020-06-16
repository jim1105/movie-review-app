import React, { Fragment } from "react";
import {Table} from "reactstrap";
import {connect} from "react-redux";
import "../styles/styles.css"

const mapStateToProps = state => {
    const messages = state.chatRoom.messages;
    const showRoom = state.showRoom
    const username = state.userReducer.username;
    const customers = state.chatRoom.customers;
    return { messages, showRoom, username, customers}
}

const Messages = props =>
<Fragment>
    {(props.customers.includes(props.username))&&
        <Fragment>
            <h4>Message:</h4>
            <Table striped bordered className="my-4">
                <tbody>
                    {
                        props.messages.map((message, index) => 
                            <tr key={index}>
                                <td>{message}</td>
                            </tr>)
                    }
                </tbody>
                <p>{props.showRoom}</p>
            </Table>
        </Fragment>
    }
</Fragment>   

export default connect(mapStateToProps)(Messages);