import Feedback from "../../components/feedback";
import styles from '../../styles/FeedbackDetails.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react";
import Comment from '../../components/comments/index'
import axios from 'axios'


export const getStaticPaths = async () => {
    const res = await fetch('https://product-feedback-server.herokuapp.com/get?category=all');
    const data = await res.json();
  
    const paths = data.map(feedback => {
      return {
        params: { id: feedback.id.toString() }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://product-feedback-server.herokuapp.com/get?feedback=' + id);
    const data = await res.json();
    
    const res_comment = await fetch('https://product-feedback-server.herokuapp.com/getcomment?feedback='+id);
    const data_comment = await res_comment.json();
    return {
      props: { 
        feedback: data, 
        comment: data_comment
      }
    }
  }


  const Details = ({ feedback, comment }) => {
    const [characterLeft, setcharacterLeft] = useState(250)
    const [commentContent, setcommentContent  ] = useState(null)

    const handleComment = (e) => {
      const charCount = event.target.value.length;
      const charLeft = 250 - charCount;
      setcharacterLeft(charLeft);
      setcommentContent(e.target.value)
    }

    const handleSubmitComment = () => {
      axios.post('https://product-feedback-server.herokuapp.com/postcomment', {
            product : feedback[0].id,
            content: commentContent,
            user: 1,
          })
          .then((response) => {
            window.location.reload(false)
          }, (error) => {
            console.log(error);
          }); 
    }

    return (
      <div className={styles.container}>
        <div className={styles.container_inner}>
            <nav className={styles.nav}>
                <Link href="/" passHref><Image src="/shared/icon-arrow-left.svg" width={10} height={15} alt="#"></Image></Link>
                <Link href="/">Go back</Link>
            </nav>
            <Feedback title={feedback[0].title} content={feedback[0].description} upvotes={feedback[0].upvotes} category={feedback[0].category} upvoted={feedback[0].upvoted}id={feedback[0].id}></Feedback>
            <div>
              {comment? comment.map((r) => {
                return <Comment key={r.id} content={r.content} avatar={r.image} name={r.name} username={r.username}></Comment>
              }):   null}
            </div>
            <section className={styles.more_comment}>
                <header>
                  <h2>Add Comment</h2>
                </header>
                <div className={styles.more_comment_input}>
                  <textarea rows="5" cols="33" placeholder="Type your comment here" onChange={(e) => handleComment(e)} />
                </div>
                <div className={styles.more_comment_character}>
                  <p>{characterLeft} Characters left</p>
                  <input type="submit" value="Post comment" onClick={handleSubmitComment}></input>
                </div>
            </section>
        </div>
      </div>
    );
  }
  export default Details;