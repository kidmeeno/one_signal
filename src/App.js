import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/login';
import Axios from 'axios';

function App() {

  const [remount, setRemount] = useState(true)
  var OneSignal = window.OneSignal || [];
  var currentUserId = localStorage.getItem('userId');

  const registerForOnesignal = () => {

    OneSignal.push(["getNotificationPermission", function (permission) {
      console.log("Site Notification Permission:", permission);
      if (permission == "default") {
        console.log("this guy never accept nor reject lalalal")
        OneSignal.push(function () {
          OneSignal.registerForPushNotifications();
        });
      } else if (permission == "granted") {
        OneSignal.push(function () {
          OneSignal.getUserId(function (userId) {
            console.log("OneSignal User ID:", userId);
            setRemount(false)
          });

        });
        console.log("this guy don accepted")
      } else if (permission == "denied") {
        console.log("this guy rejected the offer ooo")
        OneSignal.push(function () {
          OneSignal.showNativePrompt();
          OneSignal.registerForPushNotifications();
        });
      }
    }]);

    OneSignal.push(function () {
      OneSignal.on('popoverShown', function () {
        console.log('Slide Prompt Shown');
      });
      OneSignal.on('popoverAllowClick', function () {
        console.log('accepted the banging');
        OneSignal.push(function () {
          OneSignal.getUserId(function (userId) {
            console.log("OneSignal User ID:", userId);
            setRemount(false)
          });
        });
      });
    });
  }
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
      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled === true) {
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
        }
        else {
          console.log("Push notifications are not enabled yet.");
          registerForOnesignal()
        }

      });
    });
    OneSignal.push(function() {
      OneSignal.on('notificationDisplay', function(event) {
        console.warn('OneSignal notification displayed:', event);
      });
      
      //This event can be listened to via the `on()` or `once()` listener
    });
    OneSignal.push(["addListenerForNotificationOpened", function(data) {
      console.log("Received NotificationOpened:");
      console.log(data);
    }]);
  }
  useEffect(() => {
    signalScriptLoad();
  }, [])
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
