import { useState } from 'react'
import './login.css'
import { Logo } from '../../components/Logo'

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { Input } from '../../components/Input'



export default function Login(){

    const[email, setEmail] = useState('')
    const[senha, setSenha] = useState('')
    
    const navigate = useNavigate()


    function handleLogin(e){
        e.preventDefault()

        if(email === '' || senha === ''){
            toast.info('Preencha os campos para logar...  ')
            return
        }

        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            toast.success('Bem vindo de volta :) ')
            navigate('/admin', { replace: true } )
        })
        .catch(() => {
            toast.error('Erro ao fazer login...')
        })
    }


    return(
        <div className='login-container'>
            <Logo/>

            <form className='form' onSubmit={ handleLogin }>
                <Input
                    type='email'
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <Input
                    type='password'
                    placeholder='****************'
                    autoComplete='on'
                    value={senha}
                    onChange={ (e) => setSenha(e.target.value) }
                />
                
                <button type='submit'>Acessar</button>
            </form>

        </div>
    )
}