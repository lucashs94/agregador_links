import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Social } from '../../components/Social'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

import { getDocs, collection, orderBy, query, doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import './home.css'

export default function Home(){

    const { slug } = useParams()

    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState({})

    useEffect( () => {

        function loadLinks(){

            const linksRef = collection(db, `publico/${slug}/links`)
            const queryRef = query(linksRef, orderBy('created', 'asc'))

            getDocs(queryRef)
            .then( (snapshot) => {
                let lista = []

                snapshot.forEach( (doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLinks(lista)
            } )
        }

        loadLinks()
    }, [])


    useEffect( () => {

        function loadSocialLinks(){

            const docRef = doc(db, 'social', 'link')

            getDoc(docRef)
            .then( (snapshot) => {

                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        facebook: snapshot.data().facebook,
                        youtube: snapshot.data().youtube,
                        instagram: snapshot.data().instagram
                    })
                }
            })

        }
        
        loadSocialLinks()
    },[] )


    return(
        <div className='home-container'>
            <h1>Lucas Silva</h1>
            <span>Veja meus links 👇</span>

            <main className='links'>
                { links.map( (item) => (

                    <section key={item.id} className='link-area' style={{ backgroundColor: item.bg }}>
                        <a rel='noreferrer noopener' href={item.url} target='_blank'>
                            <p className='link-text' style={{ color: item.color }}>{item.name}</p>
                        </a>
                    </section>
                ))}
              

                { links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                    <footer>
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={35} color='#ffffff'/>
                        </Social>
                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={35} color='#ffffff'/>
                        </Social>
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color='#ffffff'/>
                        </Social>
                    </footer>
                )}

            </main>
        </div>
    )
}