import React from 'react'

export default class MessageForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            message:""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState(()=>{
            message:""
        })
    }
     handleChange(e){
         console.log(e.target.value)
         const message = e.target.value;
          this.setState(()=>({
              message: message
          }))
    }
    render(){
        return(
            <div>
            <form className="form" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.message}type="text" name="user"/>
            </form>
            </div>
        )
    }
}