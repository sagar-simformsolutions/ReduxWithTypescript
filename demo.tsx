import React, { Component } from 'react';
import { View, Text } from 'react-native';

type MyState = {
  count: number;
};

class demo extends Component {
  constructor(props: Object) {
    super(props);
  }
  state: MyState = {
    count: 0
  };

  render() {
    return (
      <View>
        <Text> demo </Text>
      </View>
    );
  }
}

export default demo;
