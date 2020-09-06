import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { headerStyles } from "../stylesheets/headerStyles";

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 0 }}>
        <LinearGradient colors={["black", "grey"]} style={headerStyles.header}>
          <Text style={headerStyles.title}>{this.props.title}</Text>
        </LinearGradient>
      </View>
    );
  }
}
