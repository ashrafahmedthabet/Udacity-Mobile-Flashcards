import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Deck from "./deck";
import TouchButton from "./TouchButton";
import TextButton from "./TextButton";
import { gray, lightGray, white, red, PapayaWhip } from "../utils/colors";
import { connect } from "react-redux";
import { removeDeck } from "../actions/index";
import { removeDeckAsync } from "../utils/api";

class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = (id) => {
    const { removeDeck, navigation } = this.props;
    removeDeck(id);
    removeDeckAsync(id);
    navigation.goBack();
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{ backgroundColor: white, borderColor: lightGray }}
            txtStyle={{ color: lightGray }}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { title: deck.title })
            }
          >
            Add Card
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: PapayaWhip, borderColor: lightGray }}
            txtStyle={{ color: lightGray }}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { title: deck.title })
            }
          >
            Start Quiz
          </TouchButton>
        </View>
        <TextButton
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
});
const mapStateToProps = (state, { route }) => {
  const { title } = route.params;
  const deck = state[title];
  return {
    deck,
  };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
