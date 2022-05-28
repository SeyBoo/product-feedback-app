import styles from './Nav.module.css' 
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Nav(props) {
    const [category, setCategory] = useState("all")
    const [datareq, setDatareq] = useState(null)
    const [Modal, setModal] = useState(false)

    const fetchAll = () => {
        axios.get('https://product-feedback-server.herokuapp.com/get?category=all')
        .then(res => setDatareq(res.data))
    }

    const fetchCategory = (name) => {
        axios.get('https://product-feedback-server.herokuapp.com/get?category='+name)
        .then(res => 
            setDatareq(res.data)
        )
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    useEffect(() => {
        if (getWindowDimensions().width >= 768) {
            setModal(true)
        } else {
            setModal(false)
        }
        fetchAll();
      }, [])
      
    const handleCategory = (e) => {
        fetchCategory(e.target.name)
        setCategory(e.target.name)
    }
    //error handling
    if (datareq != null && datareq.error) {
        props.setData(false)
    } else {
        props.setData(datareq)        
    }

    const Navmore = () => {
        return (
            <div className={styles.nav_more}>
                <span className={styles.nav_more_categories}>
                    <button className={ category === "all" ? styles.btn_active : ""} onClick={handleCategory} name="all">All</button>
                    <button className={ category === "ui" ? styles.btn_active : ""} onClick={handleCategory} name="ui">UI</button>
                    <button className={ category === "ux" ? styles.btn_active : ""} onClick={handleCategory} name="ux">UX</button>
                    <button className={ category === "enhancement" ? styles.btn_active : ""}onClick={handleCategory} name="enhancement">Enhancement</button>
                    <button className={ category === "bug" ? styles.btn_active : ""}onClick={handleCategory} name="bug">Bug</button>
                    <button className={ category === "feature" ? styles.btn_active : ""}onClick={handleCategory} name="feature">Feature</button>
                </span>
                <span className={styles.nav_roadmap_container}>
                    <header className={styles.nav_roadmap_header}>
                        <h3>Roadmap</h3>
                        <a href="#">View</a>
                    </header>
                    <ol className={styles.nav_roadmap}>
                        <li className={styles.nav_roadmap_item}>
                            <div>
                                <span className={styles.nav_color_orange}></span>  
                                <h3>Planned</h3>
                            </div>
                            <p>2</p>
                        </li>
                        <li className={styles.nav_roadmap_item}>
                             <div>
                                <span className={styles.nav_color_purple}></span>  
                                <h3>In-Progress</h3>
                            </div>
                            <p>3</p>
                        </li>
                        <li className={styles.nav_roadmap_item}>
                            <div>
                                <span className={styles.nav_color_blue}></span>  
                                <h3>Live</h3>
                            </div>
                            <p>1</p>
                        </li>
                    </ol>
                </span>
            </div>
        )
    }
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_inner}>
                <div className={styles.nav_info}>
                    <h2>Frontend Mentor</h2>
                    <p>Feedback Board</p>
                </div>
                {Modal?
                <div className={styles.nav_menu}>
                    <div className={styles.nav_close} onClick={() => setModal(!Modal)}>
                    <Image src="/shared/mobile/icon-close.svg" alt="#" width={20} height={20}></Image>
                    </div>
                </div>
                :
                <div className={styles.nav_menu}>
                    <div className={styles.nav_burger} onClick={() => setModal(!Modal)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                }
            </div>
            {Modal?  <Navmore />: null}
        </nav>
    )   
}