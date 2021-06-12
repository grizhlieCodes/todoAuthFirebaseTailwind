import {writable} from 'svelte/store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import TasksStore from './tasks.js'

const user = writable()

const customUser = {
    subscribe: user.subscribe,
    signUpUser: (email, password, bio) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let newUser = userCredential.user
                let userID = newUser.uid
                user.set(newUser)
                firebase.firestore().collection('users').doc(userID).set({
                    bio,
                    userID,
                    createdAt: new Date()
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, 
    signInUser: (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let existingUser = userCredential.user
                let userID = existingUser.uid
                user.set(existingUser)
                // firebase.firestore().collection('users').doc(userID).set({
                //     bio,
                //     userID,
                //     createdAt: new Date()
                // })
            })
            .catch((error) => {
                console.log(error)
        })
    },
    signOutUser: () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            user.set()
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    },
    setUser: (userObject) => {
        let userSet = user.set(userObject)
        if(userObject){
            let userID = userObject.uid
            TasksStore.fetchTasks(userID)
        }
    }
}


export default customUser