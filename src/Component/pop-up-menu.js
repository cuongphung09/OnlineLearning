import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from '../Context/theme-context'
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
      <ThemeContext.Consumer>
        {
          ([theme, setTheme]) => {
            return (
              <View style={this.props.menustyle}>
                <Menu
                  style={{ backgroundColor: theme.background }}
                  ref={this.setMenuRef}
                  button={
                    <TouchableOpacity onPress={this.showMenu}>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        color={theme.foreground}
                        size={25}
                        style={{ marginRight: 0 }}
                      />
                    </TouchableOpacity>
                  }>
                  <MenuItem onPress={this.option1Click} ><Text style={{ color: theme.foreground }}>Cài đặt</Text></MenuItem>
                  <MenuItem onPress={this.option2Click}><Text style={{ color: theme.foreground }}>Gửi phản hồi</Text></MenuItem>
                  <MenuItem onPress={this.option3Click} ><Text style={{ color: theme.foreground }}>Liên hệ hỗ trợ</Text></MenuItem>
                </Menu>
              </View>
            )
          }
        }
      </ThemeContext.Consumer>

    );
  }
}
