import { useState, useEffect } from 'react'

import { useAuth } from '../../contexts/auth'

import { Header }  from '../../components/Header'
import { Input }  from '../../components/Input'
import { MdAddLink } from 'react-icons/md'

import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'
import './settings.css'


export default function Settings(){

    const { user } = useAuth()

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [slug, setSlug] = useState("")


    useEffect( () => {
        async function loadData(){
            const docRef = doc(db, `users/${user.uid}`)
            
            await getDoc(docRef)
            .then( (snapshot) => {
                setNome(snapshot.data().name)
                setEmail(snapshot.data().email)
                setSlug(snapshot.data().slug)
                localStorage.setItem('@s', snapshot.data().slug)
            })
        }
        loadData()
    }, [] )
    

    async function handleSave(e){
        e.preventDefault()
        const docRef = doc(db, "users", user.uid)

        await updateDoc(docRef, {
            slug: slug,
            name: nome,
        })
        .then(() => {
            localStorage.setItem('@s', slug)
            toast.success('Dados atualizados com sucesso!')
        })
        .catch((error) => {
            toast.error('Não foi possivel atualizar seus dados')
        })

        // window.location.reload(false)
    }


    function handleTrimSlug(e){
        let trim = String(e.target.value).trim().replace(" ","")
        setSlug(trim)
    }


    return(

        <div className='admin-container'>
            <Header/>

            <h1 className='title-social'>Atualize seus Dados</h1>

            <form className='form' onSubmit={ handleSave }>
                <label className='label'>Seu nome:</label>
                <Input
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={ (e) => setNome(e.target.value) }
                />

                <label className='label'>Seu Email:</label>
                <Input
                    placeholder='Digite seu email'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />

                <label className='label'>Escolha seu usuario público</label>
                <Input
                    placeholder='Digite o seu usuario público'
                    value={slug}
                    onChange={ handleTrimSlug }
                />
                <span>* Este é o nome que aparecerá na sua URL personalizada</span>

                <button type='submit' className='btn-register'>
                    Atualizar dados <MdAddLink size={24} color='#fff'/>
                </button>
            </form>
        </div>
    )
}


// TODO: Se o SLUG for trocado, precisa atualizar o DOC na collection PUBLICO
// TODO: PREVIEW do link host/SLUG, quando o campo SLUG estiver sendo digitado