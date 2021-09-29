import React from "react";

import darkImg from "../../img/DarkMode.svg";

import lightImg from "../../img/lightMode.svg";

import bgDarkImg from "../../img/header-dark-mode-background-image.jpeg";
import bgLightImg from "../../img/header-light-mode-background-image.jpeg";

import "./darkMode.scss";
import { element } from "prop-types";

export default class DarkMode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isDark } = this.props;
    return (
      <button type="button" onClick={this.handleDarkMode}>
        <img src={isDark ? lightImg : darkImg} alt="" />
      </button>
    );
  }
}
