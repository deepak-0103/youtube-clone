import { useEffect, useState } from "react";
import API from "../services/api";

const CommentSection = ({videoId}) => {

 const [comments,setComments] = useState([]);
 const [text,setText] = useState("");

 useEffect(()=>{

   API.get(`/comments/${videoId}`)
   .then(res=>setComments(res.data));

 },[videoId]);

 const addComment = async ()=>{

  const token = localStorage.getItem("token");

  const res = await API.post(
    `/comments/${videoId}`,
    {text},
    {
      headers:{
        Authorization:token
      }
    }
  );

  setComments([...comments,res.data]);
  setText("");
 };

 return(

  <div>

    <h3>Comments</h3>

    <input
      value={text}
      onChange={(e)=>setText(e.target.value)}
      placeholder="Add comment"
    />

    <button onClick={addComment}>Post</button>

    {comments.map(c=>(
      <p key={c._id}>{c.text}</p>
    ))}

  </div>

 );
};

export default CommentSection;