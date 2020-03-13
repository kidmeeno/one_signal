import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
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

  const signalScriptLoad = () => {
    OneSignal.push(function () {
      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled === true) {
          console.log("Push notifications are enabled!");
          OneSignal.push(function () {
            OneSignal.getUserId(function (userId) {
              console.log("OneSignal User ID:", userId);
              if (userId == null) {
                console.log("never show")
              } else {
                console.log("heading for final condition");
                if (currentUserId == null) {
                  console.log("we are good")
                } else {
                  localStorage.setItem('userId', userId);
                  console.log("OneSignal User ID:", userId);
                }
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
    // ends here
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
