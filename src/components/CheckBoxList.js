import React, { Component, Fragment } from 'react'
import  CheckBox from './CheckBox'
import { setGenre, toggleBox, fetchStarted, toggleFetch, resetCheckbox } from "../redux/actions";
import { connect } from "react-redux";
import {Button} from "reactstrap";
import "../styles/styles.css"

class CheckBoxList extends Component {
  constructor(props) {
    super(props)
  }

  handleCheckChieldElement = (event) => {
    this.props.fetchStarted();
    const val = event.target.value
    setTimeout(()=>{
      this.props.toggleFetch();
      for(let i=0; i<this.props.allGenre.length; i++){
        if(this.props.allGenre[i].value === val){
           this.props.toggleBox(i+1)
        }
      }
    }, 1000)
  }

  reset = () => {
    this.props.fetchStarted();
    setTimeout(()=>{
      this.props.toggleFetch();
      this.props.resetCheckbox();
    }, 1000)
  }

  isChecked = () => {
    for(let i=0; i<this.props.allGenre.length; i++){
      if(this.props.allGenre[i].isChecked){
         return false
      }
    }
    return true
  }

  render() {
    return (
      <div id = "filters" className="App">
      <Button color = "primary" disabled = {this.isChecked()} onClick = {this.reset}>Reset Boxes</Button>
        <ul>
          
       {
       this.props.allGenre.map((genre) => {
             return (
                 <CheckBox handleCheckChieldElement={this.handleCheckChieldElement} toggleFilter={this.props.toggleFilter} checked = {genre.isChecked}  value={genre.value} />)
           })
        }
        
       </ul>

      </div>
    );
  }
}
const mapStateToProps = state => {
    const allGenre = state.checkBoxes.GENRES;
    return {allGenre};
};
export default connect(mapStateToProps,{setGenre, toggleBox, fetchStarted, toggleFetch, resetCheckbox})(CheckBoxList);