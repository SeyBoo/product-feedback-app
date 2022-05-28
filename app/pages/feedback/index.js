import styles from '../../styles/Feedback.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'

export default function Feedback() {
    const [Category, setCategory] = useState("Feature")
    const [modal, setModal] = useState(false)
    const [Title, setTitle] = useState(null)
    const [Content, setContent] = useState(null)
    const [id, setId] = useState(null)
    const router = useRouter();
    
    const fetchData = () => {
        axios.get('https://product-feedback-server.herokuapp.com/get?category=all')
        .then(res => {setId(res.data[res.data.length - 1].id)})
    }
    
    const handleSubmit = (e) => {
        if (Title != null && Content != null) {
            if (Title.length > 1 && Content.length > 1) {
                axios.post('https://product-feedback-server.herokuapp.com/create', {
                title: Title,
                category: Category,
                description: Content
              })
              .then((response) => {
                    fetchData()
              }, (error) => {
                console.log(error);
              }); 
            } else {
                return 404;
            }
        } else {
            return 404;
        }
    }
    const handleCategory = (e) => {
        setModal(false)
        setCategory(e.target.getAttribute('name'))
    }

    const handleCancel = (e) => {
        setCategory("Feature")
        setTitle("")
        setContent("")
    }

    if (id != null) {
        router.push('/feedback/'+id)
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_inner}>
            <nav className={styles.nav}>
                <Link href="/" passHref><Image src="/shared/icon-arrow-left.svg" width={10} height={15} alt="#"></Image></Link>
                <Link href="/" passHref>Go back</Link>
            </nav>
            <form className={styles.form} action="post" onSubmit={(e) => e.preventDefault()}>
                <nav className={styles.form_nav}>
                    <p>+</p>
                    <h1>Create New Feedback</h1>
                </nav>
                <div className={styles.form_content}>
                    <span className={styles.form_items}>
                        <label htmlFor="title">
                            <h2 className={styles.form_items_title}>Feedback Title</h2>
                            <p>Add a short, descriptive headline</p>
                        </label>    
                        <input name="title" type="text" value={Title} onChange={(e) => setTitle(e.target.value)} required></input>
                    </span>
                    <span className={styles.form_items}>
                        <label htmlFor="category">
                            <h3 className={styles.form_items_title}>Category</h3>
                            <p>Choose a category for your feedback</p>
                        </label>
                        <span className={styles.form_category} name="category" onClick={() => setModal(!modal)}>
                            <p>{Category}</p>
                            {modal ?<Image src="/shared/icon-arrow-up.svg" alt="#" width={15} height={10}></Image> :
                            <Image src="/shared/icon-arrow-down.svg" alt="#" width={15} height={10}></Image>}
                        </span>
                        {modal? <ol>
                            <li onClick={handleCategory} name="UI">UI</li>
                            <li onClick={handleCategory} name="UX">UX</li>
                            <li onClick={handleCategory} name="Enhancement">Enhancement</li>
                            <li onClick={handleCategory} name="Bug">Bug</li>
                            <li onClick={handleCategory} name="Feature">Feature</li>
                        </ol> : null}
                    </span>
                    <span className={styles.form_items}>
                        <label htmlFor="content">
                            <h4 className={styles.form_items_title}>Feedback Detail</h4>
                            <p>Include any specific comments on what should be improved, added, etc.</p>
                        </label>
                        <input name="content" type="text" onChange={(e) => setContent(e.target.value)} value={Content} required></input>
                    </span>
                </div> 
                <div className={styles.form_interaction}>
                    <button onClick={handleCancel}>Cancel</button>
                    <input value="Add Feedback" type="submit" onClick={handleSubmit}></input>
                </div>
            </form>
            </div>
        </div>
    )
}