import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Axios from 'axios';

function App() {
  // const notificationPrompt = () => {
  //   var OneSignal = window.OneSignal || [];
  //   OneSignal.push(() => {
  //     OneSignal.on("subscriptionChange", (sub)=>{
  //       if (sub){
  //         OneSignal.push(()=>{
  //           OneSignal.getUserId().then(userId => {
  //             alert(userId)
  //           })
  //         })
  //       } else {
  //         alert(' not allowed yet')
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
  }
  const signalScriptLoad = () => {
    var OneSignal = window.OneSignal || [];
    // OneSignal.showNativePrompt()
    OneSignal.push(["getNotificationPermission", function (permission) {
      console.log("Site Notification Permission:", permission);
      // (Output) Site Notification Permission: default
      if(permission == "default"){
        alert("this guy never accept nor reject")
      }else if(permission == "granted"){
        alert("this guy don accepted")
      }else if(permission == "denied"){
        alert("this guy rejected the offer ooo")
      }
    }]);
    OneSignal.push(function () {
      OneSignal.showSlidedownPrompt();
      OneSignal.on('permissionPromptDisplay', function () {
        console.log("The prompt displayed");
      });
    });
    OneSignal.push(["getNotificationPermission", function (permission) {
      console.log("Site Notification Permission:", permission);
      // (Output) Site Notification Permission: default
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
