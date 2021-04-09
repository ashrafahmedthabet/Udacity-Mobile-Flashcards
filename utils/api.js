import AsyncStorage from "@react-native-async-storage/async-storage";
import { decks } from "./data";
const DECKS_STORAGE_KEY = "Flashcards:decks";
export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (value !== null) {
      // We have data!!
      let data = await JSON.parse(value);
      return data;
    } else {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
      let data = await JSON.parse(value);
      return data;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export const saveDeckTitleAsync = async () => {
  try {
    let title = "java";
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
};
export const addCardToDeckAsync = async (title, card) => {
  try {
    const deck = await getDeck(title);
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
};
export async function removeDeckAsync(key) {
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}
