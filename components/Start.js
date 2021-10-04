import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ImageBackground } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";


export default class Start extends React.Component {

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
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
                placeholder='Your Name'
              />
              <Text>You wrote: {this.state.text}</Text>
            </View>

            {/*color selector for user background */}
            <View style={styles.colorChooser}>
              <Text style={styles.backgroundColorText}> Choose Background Color: </Text>


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
    fontsize: 45,
    fontWeight: '600',
    textAlign: 'center',
    backgrounColor: '#000000c0'
  },
  textInputContainer: {
    flex: 50,
    color: 'white',
    bordercolor: '',
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgrounColor: '#000000c0'
  },
  textInput: {
    color: '#757083',
    fontsize: 16,
    fontWeight: '200',
    opacity: '50',
    textAlign: 'left',
    backgrounColor: '#000000c0'
  },
  colorChooser: {
    color: 'white',
    fontsize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgrounColor: '#000000c0'
  },
  backgroundColorText: {
    color: '#757083',
    fontsize: 16,
    opacity: '100',
    fontWeight: '300',
    textAlign: 'center',
    backgrounColor: '#000000c0'
  },
  buttonContainer: {
    backgrounColor: '#757083'
  },
  startChatStyle: {
    color: '#FFFFFF',
    fontsize: 16,
    fontWeight: '600',
    textAlign: 'center',

  },

});