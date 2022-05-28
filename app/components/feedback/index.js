import { useState, useEffect } from "react"
import Image from "next/image"
import styles from './Feedback.module.css'
import Link from 'next/link'
import axios from 'axios'

export default function Feedback(props) {
    const [Status, setStatus] = useState(null)
    useEffect(() => {
        setStatus(props.upvoted)
    }, [])
    console.log(Status)
    const handleVote = () => {
        setStatus(!Status)
        postData()
    }

    const postData = () => {
        axios.post('https://product-feedback-server.herokuapp.com/set', {
                status: Status,
                product: props.id,
            })
            .then((response) => {
                return 0;
            }, (error) => {
                console.log(error);
            }); 
    }

    return (
            <div className={styles.feedback}>
                <Link href={"/feedback/"+props.id} passHref>
                    <div className={styles.feedback_info}>
                        <h3>{props.title}</h3>
                        <p>{props.content}</p>
                        <a href="#" passHref>{props.category}</a>
                    </div>
                </Link>
                    <span className={styles.feedback_items} style={Status ?  {backgroundColor: '#4661E6'} : {backgroundColor: '#F2F4FE'}} onClick={handleVote}>
                        {Status? 
                        <div name="voted" className={styles.feedback_items_02}>
                        <Image src="/shared/icon-arrow-up-active.png" alt="#" width="15" height="10"/>
                        <p style={{color:'white'}}>{props.upvotes}</p></div>
                        : 
                        <div name="unvoted" className={styles.feedback_items_01}>
                        <Image src="/shared/icon-arrow-up.svg" alt="#" width="15" height="10"/>
                        <p>{props.upvotes}</p></div> 
                        }
                    </span>
                    <span className={styles.feedback_items}>
                        <Image src="/shared/icon-comments.svg" alt="#" width={25} height={20}></Image>
                        <p>{props.comments}</p>
                    </span>
            </div>
    )
}