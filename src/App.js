import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Axios from 'axios';

function App() {
  const [remount, setRemount] = useState(true)
  // const notificationPrompt = () => {
  //   var OneSignal = window.OneSignal || [];
  //   OneSignal.push(() => {
  //     OneSignal.on("subscriptionChange", (sub)=>{
  //       if (sub){
  //         OneSignal.push(()=>{
  //           OneSignal.getUserId().then(userId => {
  //             console.log(userId)
  //           })
  //         })
  //       } else {
  //         console.log(' not allowed yet')
  //       }
  //     });

  //     OneSignal.registerForPushNotifications({
  //       modalPrompt: true
  //     });
  //   });
  // }

  const loadSignalScript = () => {
    const script = document.createElement("script");
    script.id = 'signalScript';
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    script.async = true;
    script.onreadystatechange = async () => {
      // notificationPrompt();
      var OneSignal = window.OneSignal || [];
      OneSignal.push(async () => {
        alert(888)
        var registering = OneSignal.registerForPushNotifications({
          modalPrompt: true
        }).then(() => {
          alert("in registration")
          console.log(registering.modalPrompt)
          OneSignal.getUserId((Id) => {
            alert("in get user id")
            console.log("One signal -> ", Id)
          })
        });
        console.log("coming second", registering)
      });
    };
    script.onload = script.onreadystatechange;
    script.innerHTML = `var OneSignal = window.OneSignal || [];
                   OneSignal.push(function () {
                     OneSignal.init({
                       appId: "ab4ca1c0-d012-4c5b-92bd-21551063acec"
                     });
                   });`;
    document.body.appendChild(script);
    const signalScript = document.getElementById('signalScript').innerHTML;
    window.eval(signalScript);
  };

  const registerForOnesignal = () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["getNotificationPermission", function (permission) {
      console.log("Site Notification Permission:", permission);
      // (Output) Site Notification Permission: default
      if (permission == "default") {
        console.log("this guy never accept nor reject lalalal")
        OneSignal.showNativePrompt();
        OneSignal.push(function() {
          OneSignal.showSlidedownPrompt();
          console.log("inside the showSlideDown")
          setRemount(false)
        });
        // OneSignal.showSlidedownPrompt();
      } else if (permission == "granted") {
        OneSignal.showSlidedownPrompt();
        console.log("this guy don accepted")
      } else if (permission == "denied") {
        OneSignal.showNativePrompt();
        console.log("this guy rejected the offer ooo")
      }
    }]);
    // OneSignal.push(function () {
    //   OneSignal.on('notificationPermissionChange', function (permissionChange) {
    //     var currentPermission = permissionChange.to;
    //     console.log('New permission state:', currentPermission);
    //   });
    //   // This event can be listened to via the on() or once() listener
    // });
  }
  const signalScriptLoad = () => {
    var OneSignal = window.OneSignal || [];
    // testing for push notification anabling
    OneSignal.push(function () {
      /* These examples are all valid */
      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled)
          console.log("Push notifications are enabled!");
        else
          console.log("Push notifications are not enabled yet.");
        registerForOnesignal()
      });
    });
    // ends here
  }
  useEffect(() => {
    signalScriptLoad();
  }, [remount])
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
