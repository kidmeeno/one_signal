import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/login';
import Axios from 'axios';

function App() {

  const [remount, setRemount] = useState(true)
  var OneSignal = window.OneSignal || [];
  var currentUserId = localStorage.getItem('userId');

  const postIdToBackend = (id) => {
    let userid = id
    let data = {
      email: "testing@test.com",
      id: userid
    }
    Axios.post(`https://onesignalapp.herokuapp.com/api/auth/register`, data).then((res) => {
      console.log(res)
      localStorage.setItem('userId', "sentToBackend");
    }).catch((err) => {
      console.log(err)
    })
  }

  const signalScriptLoad = () => {
    OneSignal.push(function () {
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        console.log("The user's subscription state is now:", isSubscribed);
        if (isSubscribed === true) {
          console.log("Push notifications are enabled!");
          OneSignal.push(function () {
            OneSignal.getUserId(function (userId) {
              if (userId == null && currentUserId == null) {
                console.log("never show")
              } else if (userId !== null && currentUserId == null) {
                localStorage.setItem('userId', "sendingToBackEnd");
                postIdToBackend(userId)
              } else {
                console.log("dead end")
              }
              setRemount(false)
            });
          });
          OneSignal.push(function () {
            OneSignal.on('notificationDisplay', function (event) {
              console.warn('OneSignal notification displayed:', event);
            });

          });
          OneSignal.push(["addListenerForNotificationOpened", function (data) {
            console.log("Received NotificationOpened:");
            console.log(data);
          }]);
        }
        else {
          console.log("Push notifications are not enabled yet.");
          OneSignal.push(
            OneSignal.registerForPushNotifications({
              modalPrompt: true
            })
          );
        }

      });

    });
  }
  useEffect(() => {
    signalScriptLoad();
    // if (currentUserId == null) {
    //   setInterval(() => {
    //     signalScriptLoad();
    //     console.log("love me please")
    //   }, 30000);
    // } else {
    //   console.log("null just turned up...")
    // }

  }, [])
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
