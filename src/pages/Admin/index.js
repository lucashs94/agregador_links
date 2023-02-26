import { useState, useEffect } from 'react'
import './admin.css'
import { Header } from '../../components/Header'
import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'

import { MdAddLink } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth'

export default function Admin(){

    const { user } = useAuth()

    const [slug, setSlug] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrlInput] = useState('')
    const [backgroundColorInput, setBackgroundColorInput] = useState('#cccccc')
    const [textColorInput, setTextColorInput] = useState('#ffffff')
    
    const [links, setLinks] = useState([])

    useEffect( () => {

        const linksRef = collection(db, `users/${user.uid}/links`)
        const queryRef = query(linksRef, orderBy('created', 'asc'))

        onSnapshot(queryRef, (snapshot) => {
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
        })

        getDoc(doc(db, `users/${user.uid}`))
        .then( (snapshot) => {
            let vSlug = snapshot.data().slug
            setSlug(vSlug)
        })

    }, [] )


    async function handleRegister(e){
        e.preventDefault()

        if(slug === ''){
            toast.warn('Preencha todos os campos...')
            return
        }
        
        if(nameInput === '' || urlInput === ''){
            toast.warn('Preencha todos os campos...')
            return
        }


        await addDoc(collection(db, `users/${user.uid}/links`), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date(),
        })
        .then((value)=>{
            setDoc(doc(db, `publico/${slug}/links/${value.id}`), {
                name: nameInput,
                url: urlInput,
                bg: backgroundColorInput,
                color: textColorInput,
                created: new Date(),
            }).then(() => {
                console.log(`Publico atualizado!`)
            })

            setNameInput("")
            setUrlInput("")
            console.log('Cadastrado com Sucesso!!')
        })
        .catch((error) => {
            console.log('Erro ao cadastrar ' + error)
            toast.error('Ops, erro ao salvar o link')
        })
    }


    async function handleDeleteLink(id){
        const docRef = doc(db, `users/${user.uid}/links/${id}`)
        const docRefPublico = doc(db, `publico/${slug}/links/${id}`)
        
        await deleteDoc(docRef)
        await deleteDoc(docRefPublico)
    }


    return(
        <div className='admin-container'>
            <Header slug={slug}/>
            <Logo/>

            <form className='form' onSubmit={ handleRegister }>
                <label className='label'>Nome do link:</label>
                <Input
                    placeholder='Nome do link...'
                    value={nameInput}
                    onChange={ (e) => setNameInput(e.target.value) }
                />
                <label className='label'>URL do link:</label>
                <Input
                    type='url'
                    placeholder='Digite a URL...'
                    value={urlInput}
                    onChange={ (e) => setUrlInput(e.target.value) }
                />

                <section className='container-colors'>
                    <div>
                        <label className='label right'>Fundo do Link:</label>
                        <input
                            type='color'
                            value={backgroundColorInput}
                            onChange={ (e) => setBackgroundColorInput(e.target.value) }
                        />
                    </div>
                    <div>
                        <label className='label right'>Cor do Link:</label>
                        <input
                            type='color'
                            value={textColorInput}
                            onChange={ (e) => setTextColorInput(e.target.value) }
                        />
                    </div>
                </section> 


                { nameInput !== '' && (
                    <div className='preview'>
                        <label className='label'>Veja como está ficando 👇</label>
                        <article className='list' style={{ marginTop: 8, backgroundColor: backgroundColorInput }}>
                            <p style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                ) }


                <button className='btn-register' type='submit'>
                    Cadastrar <MdAddLink size={24} color='#ffffff'/>
                </button>

            </form>


            <h2 className='title'>
                Meus Links
            </h2>

            { links.map( (item, index) => (
                
                <article 
                key={index}
                className='list animate-pop'
                style={{backgroundColor: item.bg, color: item.color}}
                >
                    <p>{item.name}</p>
                    <div>
                        <button className='btn-delete' onClick={ () => handleDeleteLink(item.id) }>
                            <FiTrash2 size={18} color='#ffffff'/>
                        </button>
                    </div>
                </article>

            ) ) }

        </div>
    )
}