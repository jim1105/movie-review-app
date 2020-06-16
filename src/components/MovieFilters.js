import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import  CheckBoxList from './CheckBoxList'
import {setMovieFilter} from "../redux/actions";
import {Tooltip} from "reactstrap";
import {getMoviesByCheckbox } from "../redux/selectors";
import "../styles/styles.css"

class MovieFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false
    }

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(event) {

  }

  toggleTooltip()  {
    this.setState({tooltipOpen: !this.state.tooltipOpen});
  }

  componentDidMount() {
    this.toggleTooltip();
  }


  render() {
    return (
      <Fragment>
        <CheckBoxList id ="filters" toggleFilter = {this.toggleFilter}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
};
export default connect(
  mapStateToProps,
  { setMovieFilter })(MovieFilters);