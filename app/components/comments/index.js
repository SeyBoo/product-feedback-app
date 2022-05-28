import styles from './Comments.module.css'
import Image from 'next/image'

export default function Commment(props) {
    return (
        <div className={styles.container}>
            <div className={styles.comment_profile}>
                <div className={styles.comment_user}>
                    <span className={styles.comment_avatar}>
                        <Image src={props.avatar} alt="#" width="50" height="50"/>
                    </span>
                    <span className={styles.comment_info}>
                        <h3>{props.name}</h3>
                        <h4>@{props.username}</h4>
                    </span>
                </div>
            </div>
            <div className={styles.comment_content}>
                <p><strong>{props.replyto}</strong> {props.content}</p>
            </div>
        </div>
    )
}