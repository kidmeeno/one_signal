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

  const loadSignalScript = () => {
    const script = document.createElement("script");
    script.id = 'signalScript';
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    script.async = true;
    script.onreadystatechange = () => {
      notificationPrompt();
      var OneSignal = window.OneSignal || [];
      OneSignal.push(() => {
        OneSignal.getUserId().then(userId => {
          var body = { email: "groovya2@test.com", id: userId }
          console.log("One signal -> ", userId)
          Axios.post("", body).then((res) => {
            console.log("we are doing this", res)
          }).catch()
          // this.saveUserDetails(userId);
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
