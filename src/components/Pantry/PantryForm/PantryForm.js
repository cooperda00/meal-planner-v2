import React, { Component } from "react";
import styles from "./PantryForm.module.scss";
import AutosizeInput from "react-input-autosize";
import { connect } from "react-redux";
import { addPantryItem } from "../../../store/actions/pantryActions";

class PantryForm extends Component {
  state = {
    name: "",
    price: 0,
    per: "",
    have: true,
    namePlaceholder: true,
    perPlaceholder: true
  };

  componentDidMount() {
    // this.nameInput.focus();
  }

  handleFocus = e => {
    if (e.target.id === "name") {
      this.setState({
        namePlaceholder: false
      });
    }
    if (e.target.id === "per") {
      this.setState({
        perPlaceholder: false
      });
    }
  };

  handleBlur = () => {
    this.setState({
      namePlaceholder: true,
      perPlaceholder: true
    });
  };

  populateState = e => {
    if (e.target.id === "have") {
      this.setState({
        [e.target.id]: e.target.checked
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { name, price, per, have } = this.state;
    if (this.state.name) {
      //Push To DB
      this.props.addPantryItem(this.props.uid, name, have, per, price);
      //Reset Form
      this.setState({
        name: "",
        price: 0,
        per: "",
        have: true
      });
      //Focus
      this.nameInput.focus();
    }
  };

  render() {
    let nameClass = `${styles.PantryItemName}`;
    if (this.state.name === "") {
      nameClass = `${styles.PantryItemName} ${styles.Underline}`;
    }
    let priceClass = `${styles.PantryItemSmall}`;
    if (this.state.price === 0) {
      priceClass = `${styles.PantryItemSmall} ${styles.Underline}`;
    }
    let typeClass = `${styles.PantryItemSmall} ${styles.Type}`;
    if (this.state.per === "") {
      typeClass = `${styles.PantryItemSmall} ${styles.Type} ${
        styles.Underline
      }`;
    }
    return (
      <div className={styles.PantryItem}>
        <AutosizeInput
          id="name"
          type="text"
          value={this.state.name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.populateState}
          className={nameClass}
          placeholder={this.state.namePlaceholder ? "Soy Sauce" : ""}
          onKeyPress={this.handleKeyPress}
          ref={input => {
            this.nameInput = input;
          }}
        />
        <span>฿</span>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={this.state.price}
          onChange={this.populateState}
          className={priceClass}
          placeholder="25"
          onKeyPress={this.handleKeyPress}
        />
        <span>per</span>
        <input
          id="per"
          type="text"
          value={this.state.per}
          onChange={this.populateState}
          className={typeClass}
          placeholder={this.state.perPlaceholder ? "Bottle" : ""}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <input
          className={styles.PantryItemSmall}
          checked={this.state.have}
          type="checkbox"
          id="have"
          onChange={this.populateState}
        />
        <button className={styles.PantryItemAddBtn} onClick={this.handleSubmit}>
          +
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPantryItem: (uid, name, have, per, price) => {
      dispatch(addPantryItem(uid, name, have, per, price));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryForm);
