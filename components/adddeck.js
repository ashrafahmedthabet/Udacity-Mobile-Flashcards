import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import TouchButton from "./TouchButton";
import { gray, white, lightGray, PapayaWhip } from "../utils/colors";
import { connect } from "react-redux";
import { addDeck } from "../actions/index";
import { saveDeckTitleAsync } from "../utils/api";

class AddDeck extends Component {
  state = {
    title: "",
  };
  handleChange = (title) => {
    this.setState({ title });
  };
  handleSubmit = async () => {
    const { addDeck, navigation } = this.props;
    const { title } = this.state;
    await addDeck(title);
    saveDeckTitleAsync(title);
    navigation.goBack();
    this.setState(() => ({ title: "" }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.title}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <TouchButton
          btnStyle={{ backgroundColor: PapayaWhip, borderColor: lightGray }}
          txtStyle={{ color: lightGray }}
          onPress={this.handleSubmit}
          disabled={this.state.title === ""}
        >
          Create Deck
        </TouchButton>
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
  block: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: lightGray,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20,
  },
});

export default connect(null, { addDeck })(AddDeck);
