**Note**

You can test the app with an android device by downloading and installing `task_manager.apk` that is located in the challenge-3 folder.

**Pre-challenge**

Framework: React Native Expo
Language: Javascript

Summary of the objective: Enable ability to add tasks, delete tasks, and mark tasks complete. Ensure that users can modify tasks simultaneously and can sync tasks when offline.

Approach: I am going to keep it simple. I will save a object that has attributes 'complete' and 'text'. The 'text' field will serve as a unique id. I will then serialize the objects into a database that has local persistence capabilities. 

**Summary**

I managed to use the React-Native Expo framework to add most of the functionality that was requested.

I completed:
- Ability to add tasks, delete tasks, and mark tasks complete(B1)
- Nice looking User Interface(O1 & O2)
- Ability to continue using application after network is offline, granted that the user has internet on the initial load of the app.(B4)
- When network is offline and a user makes changes, those changes will be pushed when the network goes back online.(B5)
- Syncing between devices, uses an external server for hosting and any number of devices can use it.(B2)
- Given two devices, device A & B, if device A modifies something in the database, device B will load that change instantly.(B3)

