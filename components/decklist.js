import React, { Component } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Deck from "./deck";
import { gray } from "../utils/colors";
import { handleInitialData } from "../actions/index";
import { AntDesign } from "@expo/vector-icons";
export class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.values(decks).map((deck) => {
            return (
              <TouchableOpacity
                key={deck.title}
                onPress={() =>
                  navigation.navigate("DeckDetail", { title: deck.title })
                }
              >
                <Deck id={deck.title} />
              </TouchableOpacity>
            );
          })}
          <View style={{ marginBottom: 30 }} />
        </ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <AntDesign
            name="pluscircle"
            size={50}
            color="black"
            onPress={() => navigation.navigate("AddDeck")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
});

const mapStateToProps = (state) => ({ decks: state });

export default connect(mapStateToProps, { handleInitialData })(DeckList);
