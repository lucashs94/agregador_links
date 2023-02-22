import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'

import { toast } from 'react-toastify'
import './register.css'

import { useAuth } from '../../contexts/auth'

export default function Register(){

    const { cadastrar, loadingAuth } = useAuth()
    const navigate = useNavigate()

    const[nome, setNome] = useState('')
    const[email, setEmail] = useState('')
    const[senha, setSenha] = useState('')


    async function handleLogin(e){
        e.preventDefault()

        if(email === '' || senha === ''){
            toast.info('Preencha os campos para logar...  ')
            return
        }

        await cadastrar(email, senha, nome)

        setNome("")
        setEmail("")
        setSenha("")

    }


    return(
        <div className='login-container'>
            <Logo/>

            <h2 className='title'>Cadastre-se</h2>

            <form className='form' onSubmit={ handleLogin }>
                <Input
                    type='text'
                    placeholder='Digite seu nome'
                    value={nome}
                    onChange={ (e) => setNome(e.target.value) }
                />
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
                    {loadingAuth ? 'Carregando...' : "Cadastrar" }
                </button>
                
                <Link to="/">Já tem conta? Faça Login</Link>
            </form>

        </div>
    )
}