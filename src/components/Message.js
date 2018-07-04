import React from 'react'

export default class Messages extends React.Component{
    render(){
        console.log('entering')
        return(
            <div>
            <ul className = "message-list">
            {this.props.messages.map(message =>{
                console.log(message.text)
                return(
                    <li key={message.id}>
                    <div>
                    {message.senderId}
                    </div>
                    <div>
                    {message.text}
                    </div>
                    </li>
                )
            })}
            </ul>
            </div>
        )
    }
}