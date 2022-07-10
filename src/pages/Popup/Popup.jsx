import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';


const UrlList = (props) => {
  if(props.urls.length === 0){
    return <div>No urls yet</div>
  }
  return (
    <ol>
      {
        props.urls.map((item, index)=>{
          return <li key={index}>{item.id} : <a href={item.url}>{item.title}</a></li>
        })
      }
    </ol>
  )
}

async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

const Popup = () => {
  const [url, setUrl] = useState([]);

  /*
  useEffect(() => {
    getCurrentTab({ active: true, lastFocusedWindow: true }).then(tab => {
      chrome.runtime.sendMessage({msg: "popupLoaded", tab: tab}, function(response){
        setUrl(response);
      });
    });
  }, []);
  */
  
  useEffect(() => {
    chrome.runtime.sendMessage({msg: "popupLoaded"}, function(response){
      setUrl(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UrlList urls={url} />
      </header>
    </div>
  );
};

export default Popup;
