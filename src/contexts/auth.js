import { useState, useEffect, createContext, useContext } from "react"

import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext({})

export default function AuthProvider({ children }){

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadUser(){
            const storageUser = localStorage.getItem('@user')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
                navigate('/admin')
            }
            setLoading(false)
        }

        loadUser()
    }, [])



    async function logar(email, password){
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid
            const docRef = doc(db, "users", uid)

            await getDoc(docRef)
            .then((snap) => {
                let data = {
                    uid: uid,
                    name: snap.data().name,
                    email: value.user.email,
                }
                
                toast.success(`Bem vindo(a) de volta!`,{
                    position: `top-right`,
                    pauseOnHover: false,
                })

                setUser(data)
                setLocalStorage(data)
                setLoadingAuth(false)
                navigate("/admin")
            })
            
        })
        .catch((e) => {
            setLoadingAuth(false)
            console.log(e)
            toast.error('Erro ao fazer login...')
        })
    }


    async function cadastrar(email, password, name){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async(value) => {
            let uid = value.user.uid
            const docRef = doc(db, "users", uid)

            await setDoc(docRef, {
                name: name,
                created: new Date(),
                createdFormat: format( new Date(), 'dd/MM/yyyy'),
                email: email,
            })
            .then(() => {
                
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                }
                
                setUser(data)
                setLoadingAuth(false)
                
                toast.success(`Cadastro realizado com sucesso!`,{
                    position: `top-center`,
                    pauseOnHover: false,
                })

                navigate('/admin', { replace: true })
            })
        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false)
        })
    }


    async function logout(){
        await signOut(auth)
        localStorage.removeItem('@user')
        setUser(null)
    }

    function setLocalStorage(data){
        localStorage.setItem('@user', JSON.stringify(data))
    }



    return(
        <AuthContext.Provider 
            value={{
                signed: !!user,
                user,
                logar,
                cadastrar,
                logout,
                loadingAuth,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)