import { StyleSheet, View } from "react-native";
import CommentsModal from "./components/comments";
import React from "react";
import { firebaseConfig } from "./firbaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default function App() {
  return (
    <View style={styles.container}>
      <CommentsModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
