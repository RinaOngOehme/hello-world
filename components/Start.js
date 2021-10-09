import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', text: '', backColor: '' };
  }

  render() {
    return (
      <View style={styles.box}>

        {/*include background image */}
        <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.image}>
          <Text style={styles.appTitle}>Hello World Chat</Text>

          <View style={styles.inputNameColorContainer}>

            {/*container for icon, name textinput,   */}
            <View style={styles.textInputContainer} >
              <Image source={require("../assets/icon.svg")} style={styles.inputImageStyle} />
              <TextInput style={styles.textInputStyle}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Your Name'
              />
            </View>

            {/*color selector for user background */}
            <View style={styles.backgroundContainer}>
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
              <Button color='#757083' style={styles.startChatStyle}
                title="Start Chatting"
                onPress={() => this.props.navigation.navigate('Chat',
                  { name: this.state.name, backColor: this.state.backColor, })}
              />
            </View>

          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,

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
    flex: 0.7
  },

  inputNameColorContainer: {
    backgroundColor: 'white',
    flex: 0.44,
    height: 30,
    margin: 12
  },

  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,

  },

  inputImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  textInputStyle: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '200',
    opacity: 0.5,
    textAlign: 'left',
    height: 30,
    margin: 5,

  },

  backgroundContainer: {
    margin: 5,

  },


  backgroundColorText: {
    color: '#757083',
    fontSize: 16,
    opacity: 1,
    fontWeight: '300',
    textAlign: 'left',
    margin: 12,

  },
  selectBgColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
    height: 50,
    margin: 5,

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
    margin: 12,

  },

  startChatStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',


  },

});