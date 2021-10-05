import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ImageBackground } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  render() {
    return (
      <View style={styles.container}>

        {/*include background image */}
        <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.image}>
          <Text style={styles.appTitle}>Hello World Chat</Text>
          <View style={styles.textInputContainer}>

            {/*container for icon, name textinput,   */}
            <View >
              <Image source={require("../assets/icon.svg")} />
              <TextInput
                style={styles.textInput}
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
                placeholder='Your Name'
              />
              <Text>You wrote: {this.state.text}</Text>
            </View>

            {/*color selector for user background */}
            <View style={styles.colorChooser}>
              <Text style={styles.backgroundColorText}> Choose Background Color: </Text>

              <View style={styles.selectBgColor}>
                <TouchableOpacity
                  style={styles.colorSelect1}
                  onPress={() => this.setState({ backColor: '#090C08' })}
                />
                <TouchableOpacity
                  style={styles.colorSelect2}
                  onPress={() => this.setState({ backColor: '#474056' })}
                />
                <TouchableOpacity
                  style={styles.colorSelect3}
                  onPress={() => this.setState({ backColor: '#8A95A5' })}
                />
                <TouchableOpacity
                  style={styles.colorSelect4}
                  onPress={() => this.setState({ backColor: '#B9C6AE' })}
                />
              </View>
            </View>

            {/*button to go into chat room */}
            <View style={styles.buttonContainer}>
              <Button style={styles.startChatStyle}
                onPress={() => {
                  this.alertMyText({ text: this.state.text });
                }}
                title="Start Chatting"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    flex: 0.8,
    backgroundColor: '#000000c0'
  },
  textInputContainer: {
    flex: 50,
    color: 'white',
    bordercolor: '',
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },
  textInput: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '200',
    opacity: '50',
    textAlign: 'left',
    backgroundColor: '#000000c0'
  },
  colorChooser: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },
  backgroundColorText: {
    color: '#757083',
    fontSize: 16,
    opacity: '100',
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },
  colorSelect1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  colorSelect2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  colorSelect3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  colorSelect4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonContainer: {
    backgroundColor: '#757083'
  },
  startChatStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'space-evenly',
  },

});