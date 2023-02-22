import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'


export default function Private({ children }){
    
    // Método usando CONTEXT API
    const { signed, loading } = useAuth()
    
    if(loading){
        return( <div></div> )
    }
    
    if(!signed){
        console.log('nao estou logado')
        return <Navigate to='/' /> 
    }

    return children
}



    // Método de verificaçao sem CONTEXT API (usando funcao que monitora o login no firestore)

    // const [loading, setLoading] = useState(true)
    // const [signed, setSigned] = useState(false)

    // useEffect(() => {

    //     async function checkLogin(){
    //         onAuthStateChanged(auth, (user) => {
    //             if(user){
    //                 const userData = {
    //                     uid: user.uid,
    //                     email: user.email
    //                 }
    //                 localStorage.setItem('@detailUser', JSON.stringify(userData))
    //                 setLoading(false)
    //                 setSigned(true)
    //             }else{
    //                 setLoading(false)
    //                 setSigned(false)
    //             }
    //         })
    //     }

    //     checkLogin()
    // },[])