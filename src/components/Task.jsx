import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { taskStyles } from "../stylesheets/taskStyles";
import { AntDesign } from "@expo/vector-icons";
import Swipeout from "react-native-swipeout";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.toggle_complete = this.toggle_complete.bind(this);
    this.toggle_delete = this.toggle_delete.bind(this);
  }

  toggle_complete() {
    let taskObj = this.props.taskObj;
    taskObj.complete = !taskObj.complete;
    this.props.save_task_db(taskObj);
  }

  toggle_delete() {
    let taskObj = this.props.taskObj;
    taskObj.deleted = true;
    this.props.save_task_db(taskObj);
  }

  render() {
    const taskObj = this.props.taskObj;
    let iconName = taskObj.complete ? "checksquare" : "checksquareo";
    return (
      <Swipeout
        backgroundColor={"#fff"}
        right={[
          {
            text: "Delete",
            backgroundColor: "red",
            onPress: this.toggle_delete,
          },
        ]}
      >
        <View style={taskStyles.taskContainer}>
          <AntDesign
            name={iconName}
            size={30}
            color="green"
            onPress={this.toggle_complete}
          />
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 20,
              marginTop: 2.5,
              width: "80%",
            }}
          >
            {taskObj.inputText}
          </Text>
        </View>
      </Swipeout>
    );
  }
}
