import React,{useEffect, useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import {connect} from 'react-redux'


// *********************** CHAT SHAPE ******************************
/*
{
    '_id':'chatID',
    'members':[{
        '_id':'memberID',
        'username':'Lollo Petronio',
        'email':'petronio@gmail.com',
        'avatar':'https://via.placeholder.com/300.png/09f'
    }],
    'history':[{
        '_id':'historyElementID',
        'timestamp':'today',
        'sender':'Lollo',
        'content':{
            'text':'HI MARCO HOW R U',
            'media':''  
        } 
            }]
        }
        */
// ******************************************************************
const mapStateToProps=(state)=>({
    chats:state.chats.list
    })

const ChatList=()=>{

// STATE FOR TESTING
    const[chats,setChats]=useState([    
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Lollo Petronio',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/09f'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'11.26',
            'sender':'Lollo',
            'content':{
                    text:'HI MARCO HOW R U',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Gilberto Bistecca',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/09a'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'11.12',
            'sender':'Lollo',
            'content':{
                    text:'Marco I hate you',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Michele Chele',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/05z'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'10.14',
            'sender':'Lollo',
            'content':{
                    text:'do u play soccer tonite?',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Gioele Merendina',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/07f'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'09.45',
            'sender':'Lollo',
            'content':{
                    text:'fffff',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Franco Isterico',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/02g'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'09.23',
            'sender':'Lollo',
            'content':{
                    text:'please answer',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Mirko Asterisco',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/02g'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'09.38',
            'sender':'Lollo',
            'content':{
                    text:'HI MARCO!',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Amerigo Caravello',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/06g'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'08.22',
            'sender':'Lollo',
            'content':{
                    text:'I dont thik so',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Merillio Smerillio',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/22f'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'08.10',
            'sender':'Lollo',
            'content':{
                    text:'how are you',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Diego Caravello',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/36f'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'08.02',
            'sender':'Lollo',
            'content':{
                    text:'Macedonia',
                    media:''  
                    } 
            }]
},
{
'_id':'chatID',
'members':[{
            '_id':'memberID',
            'username':'Giorgio Prugna',
            'email':'petronio@gmail.com',
            'avatar':'https://via.placeholder.com/300.png/66h'
            }],
'history':[{
            '_id':'historyElementID',
            'timestamp':'07.27',
            'sender':'Lollo',
            'content':{
                    text:'better!',
                    media:''  
                    } 
            }]
},
])

useEffect(() => {
    console.log(chats)
},)

// STARTING BY SINGLE-USER CHAT (NOT GROUP CHAT ALLOWED FOR NOW)
return(
    <Container className='bg-dark text-white'>
        <h1>Chat List</h1>
        {chats&&chats.map((chat)=>(
            <Row key={chat._id}>
                <Col xs={2}>
                    {(chat.members.length===1)
                        ?<img src={chat.members[0].avatar} alt='friend avatar' className='rounded-circle' style={{height:48}} />
                        :<img src='https://via.placeholder.com/300.png' alt='placeholder' className='rounded-circle' style={{height:48}} />
                    }
                </Col>
                <Col xs={8}>
                    {(chat.members.length===1)
                        ?<p><strong>{chat.members[0].username}</strong></p>
                        :<p><strong>GROUP CHAT NAME</strong></p>
                    }
                    <p>{(chat.history.at(-1)).content.text}</p>
                </Col>
                <Col xs={2}>
                    <p>{(chat.history.at(-1)).timestamp}</p>
                </Col>
            </Row>
        )
        )
        }
    </Container>
    )
}

export default connect(mapStateToProps)(ChatList)
