//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class CustomMenu extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    this.props.option1Click();
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
  };
  render() {
    return (
      <View style={this.props.menustyle}>
        <Menu
        style={{backgroundColor: '#212121'}}
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
           <MaterialCommunityIcons
              name="dots-vertical"
              color="white"
              size={25}
              style={{ marginRight: 0 }}
            />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.option1Click} ><Text style={{color:'white'}}>Settings</Text></MenuItem>
          <MenuItem onPress={this.option2Click}><Text style={{color:'white'}}>Send feedback</Text></MenuItem>
          <MenuItem onPress={this.option3Click} ><Text style={{color:'white'}}>Contact support</Text></MenuItem>
        </Menu>
      </View>
    );
  }
}
