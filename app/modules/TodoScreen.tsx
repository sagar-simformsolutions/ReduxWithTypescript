import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TodoActions, TodoSelectors } from '../redux';
import { AppDispatchType } from '../Store';

const TodoScreen = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const [todoText, setTodoText] = useState<string>('');
  const todoList: string[] = useSelector<string[]>(TodoSelectors.getTodoList);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            setTodoText(text);
          }}
          value={todoText}
        />
        <Button
          onPress={() => {
            if (todoText.length > 0) {
              dispatch(TodoActions.addTodoRequest(todoText));
              setTodoText('');
            }
          }}
          title="Add Todo"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      {todoList.map((elements: string, index: Number) => {
        return <Text key={`${index}_${elements}`}>{elements}</Text>;
      })}
    </View>
  );
};
export default TodoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  body: { marginHorizontal: 15 },
  textInput: { height: 50, width: 250, borderWidth: 1, paddingHorizontal: 10 }
});
