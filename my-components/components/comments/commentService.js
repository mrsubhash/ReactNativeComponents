import { db } from "../../App";

export const commentListener = (postId, setCommentList)=>{
   return db
    .collection('post')
    .doc(postId)
    .collection('comments')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>{
        if(snapshot.docChanges().length ==0) return
        let comments = snapshot.docs.map(val => {
            const id = val.id;
            const data = val.data();
            return {id,...data}
        })
        setCommentList(comments)
    })
}

export const addComment = (postId, createdBy, text) => {
    const comment = {
      text,
      postId,
      createdBy,
      timestamp: Date.now()/1000,
    };
    
    db
      .collection('post')
      .doc(postId)
      .collection('comments')
      .add(comment)
  };
 