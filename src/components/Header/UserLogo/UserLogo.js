import React from "react";
import styles from "./UserLogo.module.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

function UserLogo(props) {
  let initials = "";
  if (props.user) {
    if (props.user[0].initials) {
      initials = props.user[0].initials;
    }
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
