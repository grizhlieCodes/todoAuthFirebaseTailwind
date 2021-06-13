import { writable } from 'svelte/store'
import firebase from '@firebase/app'
import '@firebase/firestore'

const tasks = writable([])

const customTasks = {
    subscribe: tasks.subscribe,
    addTask: (task, userID) => {    
        let firstCol = firebase.firestore().collection('tasks').doc(userID)
            .collection('userTasks').add({
                name: task,
                done: false,
                userID
            }).then(docRef => {
                let uniqueTaskID
                tasks.update(allTasks => {
                    allTasks = [
                        ...allTasks,
                        {
                            name: task,
                            done: false,
                            userID,
                            docID: docRef.id
                        }
                    ]
                    console.log(allTasks)
                    return allTasks
                })
            })
            .catch(err => console.log(err))
    },

    editTaskName: (updatedTaskName, taskID, userID, taskIndex) => {
        tasks.update(allTasks => {
            allTasks[taskIndex].name = updatedTaskName
            return allTasks
        })
        firebase.firestore().collection('tasks').doc(userID).collection('userTasks').doc(taskID).update({
            name: updatedTaskName
        }).then(() => {
            //if successfully updated Task Name
        }).catch(err => console.log(err))
    },

    deleteTask: (taskID, userID, taskIndex) => {
        tasks.update(allTasks => {
            allTasks = allTasks.filter((task, i) => i !== taskIndex)
            return allTasks
        })
        firebase.firestore().collection('tasks').doc(userID).collection('userTasks').doc(taskID).delete()
            .then(() => console.log(`Task with id: ${taskID} successfully deleted`))
            .catch(err => console.log(err))
    },

    updateTaskDoneStatus: (taskID, userID) => {
        let doneStatus
        tasks.update(allTasks => {
            let updatedTask = {...allTasks.find(task => task.docID === taskID)}
            let updatedTaskIndex = allTasks.findIndex(task => task.docID === taskID)
            updatedTask.done = !updatedTask.done
            doneStatus = updatedTask.done
            allTasks[updatedTaskIndex] = updatedTask
            console.log(allTasks)
            return allTasks
        })
        firebase.firestore().collection('tasks').doc(userID).collection('userTasks').doc(taskID).update({
            done: doneStatus
        })
    },
    fetchTasks: (userID) => {
        let allTasks = []
        firebase.firestore().collection('tasks').doc(userID).collection('userTasks').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    allTasks = [...allTasks, {
                        //Grab all data from each task document + grab the id of
                        //each document.

                        ...doc.data(),
                        docID: doc.id
                    }]
                })
                tasks.set(allTasks)
                console.log(allTasks)
            })
    },
    clearAllTasks: () => {
        tasks.set([])
    }
}

export default customTasks