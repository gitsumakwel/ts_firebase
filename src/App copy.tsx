import './App.css';
import React from 'react'
import $ from 'jquery'
import { setDocument, getDocument, updateDocx } from './firemodel'

type s = string
type n = number
type ke = KeyboardEvent
type me = MouseEvent  
type e = Event
type nu = null
type v = void

export interface IPropsk {
  data?: Array<string>;
  fetchData?(value: s): void;
}
export interface IState {
  count:n
}
export type counter = {
  count:n
}

interface FireCounter {
  getCount():Promise<n|nu>;
  sendMessage(c:n):Promise<v>;
  addCount(e:e):Promise<v>;
  latestCount():Promise<v>;
}

class FireCounter extends React.Component implements FireCounter {
  state:IState = {
    count: 0,
  }
  constructor(props:IPropsk){
    super(props)    
  }

  getCount = async() => {
    const counterSnapshot = await getDocument();
    if (counterSnapshot.exists()) {
      const count:n = counterSnapshot.data().count
      return count;
    }
    console.log("counter doesn't exists");
    return null;
  }

  sendMessage = async(count:n) => {
    const response = await $.get(`api/message/send?count=${count}`);
    console.log(response);
  }

  addCount = async(event:e) => {
    let count = await this.getCount(); //much faster this.state.count, but what if you are not connected to the web.    
    const elem = event.target as HTMLInputElement
    
    if (count === null) {
      count = 0;
    } else {
      switch (elem.id){
        case 'increment':
          count +=1;
          break;
        case 'decrement':
          count -=1
          break;
        case 'reset':
          count *= 0;
          break;
        default:
          break;
       }
       if (count%10===0 && count>0) {         
          this.sendMessage(count);          
       }
    }

    updateDocx(count)
    this.setState({count:count}) 
  }

  latestCount = async () =>{
    let count = await this.getCount();
    if (count === null) {
      setDocument(0)
      count = 0;
    }
    this.setState({count:count})
  }
 
/*  node_addEventListener(list:NodeListOf<HTMLElement>,event:string, fn:(e:e)=>Promise<void>){
    console.log('node_addEvent')
    const arr_list = Array.from(list)
    arr_list.forEach(item=>{
      item.addEventListener(event,ev=>fn(ev))
    })
  } */

  addEventListenerList(list:HTMLCollectionOf<HTMLElement>, event:string, fn:(e:e)=>Promise<void>) {
    console.log('HTMLCollection_addEvent')
    const arr_list = Array.from(list)
    arr_list.forEach(item=>{
      item.addEventListener(event,(listener)=>fn(listener))
    })
  }

/*  sample_addEventListener(elem:HTMLElement, event:string, fn:any){
    console.log('sample_addEvent')
    elem.addEventListener(event,el=>fn(el))
  } */

  componentDidMount(){
/*     const btns =document.querySelectorAll('.btn_main') as NodeListOf<HTMLElement>;
    this.node_addEventListener(btns,'click',this.addCount) */

   const btns = document.getElementsByClassName('btn_main') as HTMLCollectionOf<HTMLElement>;                
    this.addEventListenerList(btns,'click',this.addCount) 
    
 /*   const sample = document.querySelector('.btn_main') as HTMLElement
    this.sample_addEventListener(sample,'click',this.addCount) */

    this.latestCount()
    //for debug testing
  }

  render(){
    return (      
      <>
        <div className="countercontent">
          <div className="center">
            <div id="value"><h1>{this.state.count}</h1></div>
            <div className="counterbtns">
              <button id="reset" className="btn_main">reset</button>
              <button id="decrement" className="btn_main">-</button>
              <button id="increment" className="btn_main">+</button>              
            </div>          
          </div>
        </div>
      </>
    )
  }
}

export default FireCounter;
