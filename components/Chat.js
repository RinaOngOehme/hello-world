import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'

//custom Chat Features (sharing images and location)
import CustomActions from './CustomActions';

//import map view
import MapView from "react-native-maps";

//import firebase
const firebase = require('firebase');
require('firebase/firestore');

//import Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//import NetInfo
import NetInfo from '@react-native-community/netinfo';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    //firebase config details
    const firebaseConfig = {
      apiKey: "AIzaSyB4XRkgBRCvGAdqudTaOc494fL2xoDsnao",
      authDomain: "helloworld-chat-app.firebaseapp.com",
      projectId: "helloworld-chat-app",
      storageBucket: "helloworld-chat-app.appspot.com",
      messagingSenderId: "672290888263",
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference to firestore collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.referenceMessageUser = null;

    this.state = {
      isConnected: false,
      image: null,
      location: null,
      uid: 0,
      messages: [],
      user: {
        _id: '',
        name: '',
      },
    };
  }

  //save Messages to local storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }


  //loads messages from AsyncStorage
  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //delete messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // Check if user is online or offline
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');



        //authenticate users anonymously using firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            }
          });

          // Create reference to the active users messages
          this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

          //create updated snapshot of collection
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        console.log('offline');
        this.setState({ isConnected: false })
        // Calls messeages from offline storage
        this.getMessages();
      }
    });
  }


  // Add new messages when database is updated
  addMessages() {
    const message = this.state.messages[0];
    // add a new message to the collection
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null,

    });
  }


  componentWillUnmount() {
    //stop listening to authentication
    this.authUnsubscribe();
    //stop listening to snapshot of collection
    this.unsubscribe();
  }

  //function to send messages
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => { this.addMessages(); this.saveMessages(); }
    )
  }


  //retrieve current data in the messages collection
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
      this.setState({
        messages,
      })
    });
  }

  //if offline, dont render the input toolbar
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return (<InputToolbar {...props} />);
    }
  }

  //set bubble color for message
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  //create the circle button for more action options
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //renders Map view
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }


  render() {

    //Bring selected backgroundcolor from home start screen
    let { name } = this.props.route.params;
    let backColor = this.props.route.params.backColor;
    this.props.navigation.setOptions({ title: name });


    return (
      //styles for chat container and include background color from the selected home start screen
      <View style={[styles.chatContainer, { backgroundColor: backColor }]}>

        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
