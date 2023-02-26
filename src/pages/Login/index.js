import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'

import { toast } from 'react-toastify'
import './login.css'

import { useAuth } from '../../contexts/auth'


export default function Login(){

    const { signed, logar, loadingAuth } = useAuth()

    const[email, setEmail] = useState('')
    const[senha, setSenha] = useState('')

    
    if(signed){
        return <Navigate to='/admin' /> 
    }


    async function handleLogin(e){
        e.preventDefault()

        if(email === '' || senha === ''){
            toast.info('Preencha os campos para logar...  ')
            return
        }

        await logar(email, senha)
    }


    return(
        <div className='login-container'>
            <Logo/>
            <h2 className='title'>Login</h2>

            <form className='form' onSubmit={ handleLogin }>
                <Input
                    type='email'
                    placeholder='email@email.com'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <Input
                    type='password'
                    placeholder='***********'
                    autoComplete='on'
                    value={senha}
                    onChange={ (e) => setSenha(e.target.value) }
                />
                
                <button type='submit'>
                    {loadingAuth ? 'Carregando...' :  "Acessar"}
                </button>

                <Link to="/register">Não tem conta? Cadastre-se aqui</Link>
            </form>

        </div>
    )
}