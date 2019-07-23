import React, { Component } from "react";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getCounselors } from "../../ducks/counselorsReducer";
import "./myCounselor.css";

class MyCounselor extends Component {
  componentDidMount() {
    this.props.getCounselors();
  }

  render() {
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
    //insert ternary
    const thatCounselor = thisCounselor[0];

    if (thatCounselor) {
      console.log("ey", thatCounselor);
      const { first_name, last_name, photo } = thatCounselor;
      console.log(first_name, last_name, photo);

      return (
        <div>
          <Header />
          <h1 className="holder">
            {`${first_name} ${last_name}`}
            <img src={photo} className="profile-pic" />
          </h1>
        </div>
      );
    } else return <div>LOADING</div>;
  }
}

function mapStateToProps(state) {
  return { counselors: state.counselors };
}

export default connect(
  mapStateToProps,
  { getCounselors }
)(MyCounselor);
