import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TabButton = (props) => {
  const focused = props.accessibilityState.selected;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      style={[styles.tabButton, focused && styles.focused]}
    >
      <Ionicons
        name={props.iconName}
        size={24}
        color={focused ? 'tomato' : 'gray'}
      />
      <Text style={{ color: focused ? 'tomato' : 'gray' }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingHorizontal:50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure each button takes up the entire width
  },
  focused: {
    // Optional: add styles for focused state if needed
  },
});

export default TabButton;
