import React from 'react';
import { View, Text } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let name = this.props.route.params.name; // OR...// let {name} = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Let's Chat!</Text>
        <View style={styles.box1}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}></View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  box1: {
    flex: 10,
    backgroundColor: 'blue'
  },
  box2: {
    flex: 120,
    backgroundColor: 'red'
  },
  box3: {
    flex: 50,
    backgroundColor: 'green'
  }
})
