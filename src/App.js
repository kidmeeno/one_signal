import React,{useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import Axios from 'axios';

function App() {

  const notificationPrompt = () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.registerForPushNotifications({
        modalPrompt: true
      });
    });
  }

  const setStatus = () => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.on("subscriptionChange", (sub)=>{
        if (sub){
          OneSignal.push(()=>{
            OneSignal.getUserId().then(userId => {
              alert(userId)
            })
          })
        } else {
          alert(' not allowed yet')
        }
      });
    });
  }

  const loadSignalScript = () => {
    const script = document.createElement("script");
    script.id = 'signalScript';
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    script.async = true;
    script.onreadystatechange = () => {
      notificationPrompt();
      setStatus();
      
      var OneSignal = window.OneSignal || [];
      OneSignal.push(() => {
        console.log("1===")
        OneSignal.getUserId().then(userId => {
          // var body = { email: "groovya2@test.com", id: userId }
          console.log("One signal -> ", userId)
          // Axios.post("", body).then((res) => {
          //   console.log("we are doing this", res)
          // }).catch(e=>{
          //   console.log("error",e)
          // })
          // this.saveUserDetails(userId);
        }).catch((err)=>{
          console.log("error don show", err);
        });
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
  useEffect(()=>{
    loadSignalScript();
  },[])
  return (
    <div className="App">
      <Login />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
