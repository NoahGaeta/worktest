import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FAB } from "react-native-paper";
import { taskStyles } from "./src/stylesheets/taskStyles";
import Reinput from "reinput";
import Task from "./src/components/Task";
import Header from "./src/components/Header";
import { AntDesign } from "@expo/vector-icons";
import firebasedb from "./firebase"; // This contains my api key, I have to leave this file out of the repo for now

class TaskObj {
  constructor(inputText, complete) {
    this.inputText = inputText;
    this.complete = complete;
    this.deleted = false;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTask: false,
      tasks: [],
      currentText: "",
    };

    this.mounted = false;

    this.db = firebasedb; // init db from firebase config file

    this.toggle_task = this.toggle_task.bind(this);
    this.toggle_save = this.toggle_save.bind(this);
    this.generateTaskView = this.generateTaskView.bind(this);
    this.save_task_db = this.save_task_db.bind(this);
    this.mounted = true;
  }

  async componentDidMount() {
    /* Get all tasks from db on load */
    if (this.mounted) {
      let collection = this.db.collection("tasks").get();
      let taskList = [];
      await collection.then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let task = new TaskObj(doc.id, doc.data()["complete"]);
          taskList.push(task);
        });
      });

      this.setState({ tasks: taskList });
    }
  }

  toggle_task() {
    this.setState({ activeTask: !this.state.activeTask });
  }

  save_task_db(taskObj) {
    /* Save or remove task to database */
    let tasks = this.state.tasks;
    let newTasks = [];
    let task;
    for (task of tasks) {
      if (task.inputText === taskObj.inputText && !taskObj.deleted) {
        newTasks.push(taskObj);
        this.db.collection("tasks").doc(task.inputText).set({
          complete: taskObj.complete,
        });
      } else if (task.inputText === taskObj.inputText && taskObj.deleted) {
        this.db.collection("tasks").doc(task.inputText).delete();
      } else {
        newTasks.push(task);
        this.db.collection("tasks").doc(task.inputText).set({
          complete: task.complete,
        });
      }
    }

    this.setState({ tasks: newTasks });
  }

  toggle_save() {
    /* toggle save task */
    const currentText = this.state.currentText;
    let tasks = this.state.tasks;
    const exists = this.check_task_exists(currentText);
    if (exists) {
      alert("Task already exists!");
    } else {
      let newTask = new TaskObj(currentText, false);
      tasks.push(newTask);
      this.save_task_db(newTask);
      this.setState({ currentText: "" });
      this.toggle_task();
    }
  }

  check_task_exists(text) {
    const tasks = this.state.tasks;
    for (task of tasks) {
      if (task.inputText === text) {
        return true;
      }
    }

    return false;
  }

  generateTaskView() {
    const tasks = this.state.tasks;
    let taskView = [];
    let task;
    for (task of tasks) {
      taskView.push(
        <Task
          taskObj={task}
          save_task_db={this.save_task_db}
          key={task.inputText}
        />
      );
    }

    return taskView;
  }

  render() {
    let addTask = [];
    if (this.state.activeTask) {
      addTask = (
        <View style={taskStyles.newTaskContainer}>
          <Reinput
            label="New Task"
            style={taskStyles.newTaskInput}
            onChangeText={(text) => this.setState({ currentText: text })}
            underlineActiveColor={"grey"}
            labelActiveColor={"black"}
            fontSize={18}
          />
          <AntDesign
            name="check"
            size={24}
            color="black"
            style={taskStyles.checkmark}
            onPress={this.toggle_save}
          />
        </View>
      );
    }

    return (
      <View style={taskStyles.container}>
        <Header title={"Task Manager"} />
        <ScrollView>
          {addTask}
          {this.generateTaskView()}
        </ScrollView>
        <FAB
          icon="plus"
          style={taskStyles.taskAdd}
          label={"Add Task"}
          color={"white"}
          onPress={this.toggle_task}
        >
          Create New Task
        </FAB>
      </View>
    );
  }
}
