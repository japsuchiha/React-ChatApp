console.log('running');
import './style.css'
const DUMMY_DATA = [
    {
        senderId : "uchiha",
        text : "sasuke"
    },
    {
        senderId : "uzumaki",
        text : "naruto"
    }
]

const instanceLocator = 'v1:us1:088e458a-214c-4666-a270-94f6be46b3c8';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/088e458a-214c-4666-a270-94f6be46b3c8/token';
const name = "uchiha"
const roomId = 10047377

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            messages : []
        }
        this.sendMessage = this.sendMessage.bind(this)
    }
    sendMessage(text){
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }
    componentDidMount(){
        const chatManager = new Chatkit.ChatManager({
            instanceLocator : instanceLocator,
            userId : name,
            tokenProvider : new Chatkit.TokenProvider({
                url : testToken
            })
        })

        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoom({
                roomId : roomId,
                hooks : {
                     onNewMessage : message => {
                        this.setState((prevState)=>({
                            messages: prevState.messages.concat(message)
                        }))
                        console.log(this.state.messages)
                    }
                }
            }).catch(error =>{
            console.error("error", error);
        });
    });
}

    render(){
        return(
            <div className ="app">
           <Title/>
            <Messages messages={this.state.messages} roomId={this.state.roomId}/>
            <MessageForm sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

class Messages extends React.Component{
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

class MessageForm extends React.Component{
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
function Title(){
    return(
        <p className="title">Chat App</p>
    )
}
ReactDOM.render(<App/>, document.getElementById('root'))