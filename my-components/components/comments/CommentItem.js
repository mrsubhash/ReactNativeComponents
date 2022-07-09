/* eslint-disable react/prop-types */
import { View, Text, StyleSheet, Image, Button } from "react-native";
import React from "react";

const uri = "https://cdn.vox-cdn.com/thumbor/HME6YC8484Vf48wW0vz9AGRNa3c=/0x0:4200x2600/1200x0/filters:focal(0x0:4200x2600):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9490719/thor_big.jpg"

const CommentItem = ({ item, setActiveComment, replies = [{}] }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      />
      <View style={styles.containerText}>
        <Text style={styles.userName}>Thor</Text>
        <Text>{item.text}</Text>
        <Button title="reply" onPress={() => setActiveComment(item)} />
        {replies.length > 0 && (
          <CommentItem item = {item} setActiveComment={setActiveComment} replies={[]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    flex: 1,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 32,
  },
  containerText: {
    marginHorizontal: 14,
  },
  userName: {
    color: "grey",
    fontSize: 14,
  },
});

export default CommentItem;
