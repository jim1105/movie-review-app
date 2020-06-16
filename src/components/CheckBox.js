import React from 'react'

export const CheckBox = props => {
    return (
      <li>
        <form>
        <label for={props.value}>
        <input  id={props.value} checked = {props.checked}
                onClick= { event => {props.handleCheckChieldElement(event);props.toggleFilter(event);}}
                type="checkbox"  value={props.value} />
                {props.value}</label>
        </form>
      </li>
    )
}

export default CheckBox