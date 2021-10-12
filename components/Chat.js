import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat'


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }


  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  //function to send messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // set bubble color for message
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



  render() {

    //Bring params of name and selected backgroundcolor from home start screen
    let { name } = this.props.route.params;
    let backColor = this.props.route.params.backColor;
    this.props.navigation.setOptions({ title: name });


    return (
      //styles for chat container and include background color from the selected home start screen
      <View style={[styles.chatContainer, { backgroundColor: backColor }]}>
        <Text style={styles.chatText}>Let's Chat!</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  chatText: {
    fontSize: 32,
    fontWeight: '600',

  },
});
