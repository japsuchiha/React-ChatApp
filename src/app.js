
import Message from './components/Message';
import MessageForm from './components/MessageForm';
import Title from './components/Title';
import RoomList from './components/RoomList';
import './styles/style.scss'
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
            roomId
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
            <Title />
            <Messages messages={this.state.messages} roomId={this.state.roomId} />
            <MessageForm sendMessage={this.sendMessage} />
            <RoomList/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))