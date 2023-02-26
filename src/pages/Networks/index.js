import { useState, useEffect } from 'react'

import { useAuth } from '../../contexts/auth'

import { Header }  from '../../components/Header'
import { Input }  from '../../components/Input'
import { MdAddLink } from 'react-icons/md'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc, collection, addDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'
import './networks.css'


export default function Networks(){

    const { user } = useAuth()

    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [instagram, setInstagram] = useState("")


    useEffect( () => {

        async function loadLinks(){
            const docRef = doc(db, `users/${user.uid}/social/${user.uid}`)
            
            await getDoc(docRef)
            .then( (snapshot) => {
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data().facebook)
                    setYoutube(snapshot.data().youtube)
                    setInstagram(snapshot.data().instagram)
                }
            } )
        }
        loadLinks()
    }, [] )


    async function handleSave(e){
        e.preventDefault()
        const docRef = doc(db, `users/${user.uid}/social/${user.uid}`)

        await setDoc(docRef, {
            facebook: facebook,
            youtube: youtube,
            instagram: instagram
        })
        .then(() => {
            toast.success('URLs salvas com sucesso :)')
        })
        .catch((error) => {
            toast.error('Não foi possivel salvar suas URLs')
        })
    }



    return(

        <div className='admin-container'>
            <Header/>

            <h1 className='title-social'>Suas redes sociais</h1>

            <form className='form' onSubmit={ handleSave }>
                <label className='label'>Link do Facebook</label>
                <Input
                    placeholder='Digite a URL do Facebook'
                    value={facebook}
                    onChange={ (e) => setFacebook(e.target.value) }
                />

                <label className='label'>Link do Youtube</label>
                <Input
                    placeholder='Digite a URL do Youtube'
                    value={youtube}
                    onChange={ (e) => setYoutube(e.target.value) }
                />

                <label className='label'>Link do Instagram</label>
                <Input
                    placeholder='Digite a URL do Instagram'
                    value={instagram}
                    onChange={ (e) => setInstagram(e.target.value) }
                />

                <button type='submit' className='btn-register'>
                    Salvar links <MdAddLink size={24} color='#fff'/>
                </button>
            </form>
        </div>
    )
}