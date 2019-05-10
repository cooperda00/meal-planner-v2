//Modules
import React from "react";
//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
//Sass
import styles from "./UserLogo.module.scss";

function UserLogo(props) {
  let initials = "";

  if (props.user) {
    initials = props.user[0].initials;
  }

  return (
    <div className={styles.UserLogo}>
      <p>{initials}</p>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.firestore.ordered.users,
    uid: state.firebase.auth.uid
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{ collection: "users", doc: props.uid }];
  })
)(UserLogo);
