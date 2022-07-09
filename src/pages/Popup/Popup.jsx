import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';


const UrlList = (props) => {
  if(props.urls.length === 0){
    return <div>No urls yet</div>
  }
  console.log("It should have elements?")
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

const Popup = () => {
  const [url, setUrl] = useState([]);
  
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
