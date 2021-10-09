import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';


export default class Chat extends React.Component {

  render() {
    let { name } = this.props.route.params;
    let backColor = this.props.route.params.backColor;
    this.props.navigation.setOptions({ title: name });


    return (
      <View style={[styles.chatContainer, { backgroundColor: backColor }]}>
        <Text style={styles.chatText}>Let's Chat!</Text>
      </View>
    )
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
