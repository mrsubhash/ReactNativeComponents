/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { addComment, commentListener } from "./commentService";
import CommentItem from "./CommentItem";

const CommentsModal = ({ postId = "BjUJjePIEhdvLLKupZFn"}) => {

  const snapPoints = useMemo(() => ["50%"], []);

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState("");
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    const unsub = commentListener(postId, setCommentList);
    return unsub;
  }, [postId]);

  const renderItem = ({ item }) => (
    <CommentItem item={item} setActiveComment={setActiveComment} />
  );

  const onSend = () => {
    console.log("ttext",comment)
    if (comment.length == 0) {
        return;
    }
    addComment(postId, "1234", comment)
    setComment('')
}

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      handleHeight={40}
      enablePanDownToClose
    >
      <View style={styles.contentContainer}>
        <FlatList
          data={commentList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        
        <View>
          {activeComment && <Text>{`replying to ${activeComment.id}`}</Text>}
          <View style={styles.containerInput}>
            <Image
              style={styles.image}
              source={{
                uri: "https://cdn.vox-cdn.com/thumbor/HME6YC8484Vf48wW0vz9AGRNa3c=/0x0:4200x2600/1200x0/filters:focal(0x0:4200x2600):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9490719/thor_big.jpg",
              }}
            />
            <TextInput
              value={comment}
              onChangeText={setComment}
              style={styles.input}
            />
            <TouchableOpacity onPress={onSend}>
              <Ionicons name="arrow-up-circle" size={34} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerInput: {
    padding: 10,
    flexDirection: "row",
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 32,
  },
  input: {
    backgroundColor: "lightgrey",
    flex: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});

export default CommentsModal;
