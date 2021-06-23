import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TodoActions, TodoSelectors } from '@redux';
import { AppDispatchType } from '../Store';

type ButtonPropsTypes = {
  onPress: () => void;
};

const Button = ({ onPress }: ButtonPropsTypes) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Todo</Text>
    </TouchableOpacity>
  );
};

const TodoScreen = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [todoText, setTodoText] = useState<string>('');
  const todoList = useSelector(TodoSelectors.getTodoList);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={(text) => {
            setTodoText(text);
          }}
          value={todoText}
          selectionColor={'white'}
        />
        <Button
          onPress={() => {
            if (todoText.length > 0) {
              dispatch(TodoActions.addTodoRequest(todoText));
              setTodoText('');
            }
          }}
        />

        <FlatList
          data={todoList}
          contentContainerStyle={styles.flatList}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                disabled={item.status === 'closed'}
                style={styles.listContainer}
                onPress={() => {
                  dispatch(TodoActions.changeTodoStatus(item.data));
                }}>
                <Text
                  style={[styles.listText, item.status === 'closed' ? styles.completedText : {}]}
                  key={`${index}_${item}`}>
                  {item.data}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(45,73,147,1)', alignItems: 'center' },
  body: { marginHorizontal: 15, marginTop: 50 },
  textInput: {
    height: 50,
    width: 250,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(4,26,73,1)',
    borderRadius: 15,
    color: 'white'
  },
  button: {
    marginVertical: 30,
    backgroundColor: 'rgba(224,64,244,1)',
    height: 50,
    width: 150,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  listContainer: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  },
  listText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'red'
  },
  flatList: {
    marginBottom: 20
  }
});
