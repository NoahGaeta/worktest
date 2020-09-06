import { StyleSheet } from "react-native";

export const taskStyles = StyleSheet.create({
  taskAdd: {
    margin: 16,
    backgroundColor: "black",
    alignSelf: "center",
    bottom: 20,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
  checkmark: {
    marginBottom: 10,
    marginLeft: 20,
  },
  newTaskContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newTaskInput: {
    width: "80%",
    marginLeft: 10,
    marginTop: 10,
  },
  taskContainer: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  },
});
