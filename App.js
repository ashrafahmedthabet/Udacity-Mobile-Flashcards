import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import decks from "./reducers/index";
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from "./components/decklist";
import DeckDetail from "./components/deckdetail"
import  AddCard  from './components/addcard';
import  AddDeck  from './components/adddeck';
import  Quiz  from './components/quiz';

const store = createStore(
  decks,
  applyMiddleware(thunk)
);
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{ headerStyle: { backgroundColor: '#ffefd5' }}}>
        <Stack.Screen name="Home" component={DeckList} options={{ title: 'Decks',headerTitleAlign:"center" }}/>
        <Stack.Screen name="DeckDetail" component={DeckDetail} options={{ title: 'Deck'}} />
        <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card'}}/>
        <Stack.Screen name="AddDeck" component={AddDeck} options={{ title: 'Add Deck'}}/>
        <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
   
  );
}
