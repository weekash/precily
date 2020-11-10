import React,{useState}  from 'react';
import { Component } from 'react';
import Resizer from './resizer';
import {getFirst,getSecond,getThird,addFirst,addSecond,addThird} from "../action";
class Layout extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            switches:[0,0,0],
            firstnote:'',
            secondnote:'',
            thirdnote:'',
            first:'',
            second:'',
            third:'',
            }
            this.clicks=[];
            this.timeout=0;

//creating refs for all secitons
     this.one = React.createRef();
     this.two= React.createRef();
     this.three = React.createRef();

        }
        handleChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
        }

// load your notes on mount
componentDidMount()
{
  console.log('mounted');
this.callFirst();
this.callSecond();
this.callThird();
}


// dedicated functions to call the GET Api
callFirst = async ()=>{
  let one = await getFirst();
  this.setState({
    first:one?one.note:''});
}

callSecond =async ()=>{
  let two = await getSecond();
  this.setState({
    second:two?two.note:''});
}
callThird =async ()=>{
  let three = await getThird();
  this.setState({
    third:three?three.note:''});
}

            
// miscellanesous function that verifies the click if it was single or doubleclick
  verifyClick=(e,index,ref)=>
  {
      this.clicks.push(new Date().getTime());
      console.log(this.clicks);    
       window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(()=>{
  //check if interval between two successive clicks is less than 250 ms
        if(this.clicks.length>=2&&this.clicks[this.clicks.length-1]-this.clicks[this.clicks.length-2]<=250)
  {
      console.log('doubleclick');
// turn on resizers of the doubleclicked element
      turnOnSwitch(index);
  this.clicks.length=0;
  }
  else
  {
  console.log('singleclick');
  this.clicks.length=0;
//remove resizers if single clicked on the same element
removeResizers();
  }
  },250)
let  turnOnSwitch=(index)=>{
     
 let newSwitch = this.state.switches.map((item,i)=>{
     if (index==i) return 1;
     else return 0;
 });
 this.setState({switches:newSwitch});
 // attach event listener and provide functionality
 attachListeners(ref);
 }

 let removeResizers=()=>{
    let newSwitch = this.state.switches.map((item,i)=>{
     return 0;
    });
    this.setState({switches:newSwitch})
 }
 let attachListeners=(ref)=>{

  let element = ref.current;
let resizers = element.children;
let prevWidth=0;
let prevHeight=0;
let prevX=0;
let prevY=0
let boundX=0;
let boundY=0;
let minsize = 220;
let idealWidth = window.innerWidth;
let idealHeight = window.innerHeight;
console.log(idealWidth);
// adding mouse down event listener to every resizer
for(let i=0;i<resizers.length;i++)
{
  let currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown',(e)=>{
        e.preventDefault()
        prevWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        prevHeight= parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        prevX = e.pageX;
        prevY= e.pageY;
      boundX = element.getBoundingClientRect().left; 
      boundY = element.getBoundingClientRect().top;
      window.addEventListener('mousemove',setSize);
  window.addEventListener('mouseup',removeAll);    
})
// this function will change the size of the section based on the resizer selected
let setSize=(e)=>{
  // here we mainly focus on width and height , also top and left properties
  if(currentResizer.classList.contains('right'))
  {
    const width = prevWidth+(e.pageX-prevX);
    if(width>minsize )
    {
  element.style.width = width+'px';  
    
}  
}
  else if (currentResizer.classList.contains('left'))
{const width =prevWidth-(e.pageX-prevX);
  if(width>minsize)
  {
element.style.width = width+'px';  
element.style.left =  boundX + (e.pageX - prevX)+'px';
  }
}
else if (currentResizer.classList.contains('top'))
{
  const height = prevHeight-(e.pageY - prevY);
  if(height>minsize )
  {
element.style.height = height+'px';  
 element.style.top = boundY + e.pageY - prevY +'px';
  }
}
else
{
  const height = prevHeight+(e.pageY-prevY);
  if(height>minsize)
  {
element.style.height = height+'px';  
  }
}
}
// this will remove mousemove form window
let removeAll=(e)=>{
  window.removeEventListener('mousemove',setSize);
}

}
 }

}
// seperate functions for handling submission in different sections
submitFirst=async(e)=>{
  e.preventDefault();
  await addFirst(this.state.firstnote);
this.callFirst();
}

submitSecond=async (e)=>{
  e.preventDefault();
  await addSecond(this.state.secondnote);
this.callSecond();
}

submitThird=async(e)=>{
  e.preventDefault();
 await addThird(this.state.thirdnote);
 this.callThird();
}
    
    render()
    {

const {switches,first,second,third} = this.state;
      
        return(
       
        <div className='layout'>
  <div className="top-layer">
<div className="one" ref = {this.one} onClick={(e)=>{this.verifyClick(e,0,this.one)}}>
    {switches[0]?<Resizer/>:null}
    <div className="functionality">
<form className='form' onSubmit={(e)=>this.submitFirst(e)}>
      <label>Enter a note to save</label>
      <input type='text'name='firstnote' onChange={this.handleChange} required/>
      <button type='submit'
>Save</button>
    </form>

    <div className="note">
      <p>Your last note :</p>
      <h1>{first}</h1>
    </div>
    </div>
</div>
<div className="two" ref = {this.two}  onClick={(e)=>{this.verifyClick(e,1,this.two)}}>
{switches[1]?<Resizer/>:null}
<div className="functionality">
<form className='form' onSubmit={(e)=>this.submitSecond(e)} >
      <label>Enter a note to save</label>
      <input type='text' name='secondnote' onChange={this.handleChange} required/>
      <button type='submit'
>Save</button>
    </form>

    <div className="note">
      <p>Your last note :</p>
      <h1>{second}</h1>
    </div>
    </div>
</div>
</div>
 <div className="three" ref = {this.three} onClick={(e)=>{this.verifyClick(e,2,this.three)}}>
        {switches[2]?<Resizer/>:null}
        <div className="functionality">
<form className='form' onSubmit={(e)=>this.submitThird(e)}>
      <label>Enter a note to save</label>
      <input type='text' name='thirdnote' onChange={this.handleChange} required/>
      <button type='submit'
>Save</button>
    </form>

    <div className="note">
      <p>Your last note :</p>
      <h1>{third}</h1>
    </div>
    </div>
        </div>
    
    </div>
    )
    }
}

export default Layout;