import React    from "react";
import template from "./NavBar.jsx";

class NavBar extends React.Component {
  render() {
    return template.call(this);
  }
}

export default NavBar;
