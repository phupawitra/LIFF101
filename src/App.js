import React, { Component } from 'react';
import './App.css';

const liff = window.liff;  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
      displayName : 'Unknown',
      userId : 'Unknown',
      pictureUrl : 'Unknown',
      statusMessage : 'Unknown'
    };
    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);//เพิ่ม function closeApp
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  //ดึง user info มาตั้งแต่โหลด component
  initialize() {
    
    liff.init({ liffId: "1653722468-xq17j5am" },async (data) => {
      let profile = await liff.getProfile();
      
      
      this.setState({
        
        displayName : profile.displayName,
        userId : profile.userId,
        pictureUrl : profile.pictureUrl,
        statusMessage : profile.statusMessage
      });
    }); 
  }

  //สร้างปุ่มปิด app
  //ส่ง message กลับไปที่ห้อง chat ก่อนว่าจะปิด app 
  //หลังจากนั้นจะสั่งให้ app ปิดหน้าต่าง
  
  closeApp() {
    console.log("In closeApp()")
    liff.closeWindow();
    /*
    liff.sendMessages([
      {
        type: 'text',
        text: "Thank you, Bye!"
      }
    ]).then(() => {
      liff.closeWindow();
    });
    */
  }

  scanCode = () => {
    liff.scanCode().then(result => {
      const stringifiedResult = JSON.stringify(result);
      alert(stringifiedResult);
      document.getElementById("scanCode").textContent = stringifiedResult;
    });
  }
  
  render() {
    return (
      <div>
        <header >
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{height:'20px'}}/>
        <p >
          Display Name : {this.state.displayName} <br/>
          User ID : {this.state.userId} <br/>
          Status Msg : {this.state.statusMessage}
        </p>
        <button onClick={this.closeApp}>Close</button>
        <button onClick={this.scanCode}>Scan Code</button>
        
        
      </div>
    );
  }

}
export default App;

