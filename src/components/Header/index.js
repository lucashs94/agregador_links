import './header.css'
import { BiLogOut } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'



export function Header({ slug }){
     
    const navigate = useNavigate()
    const { logout } = useAuth()


    async function handleLogout(){
        await logout()
    }


    return(
        <header className='admin-header'>
            <nav className='nav-header'>
                <button onClick={handleLogout}>
                    <BiLogOut size={28} color='#DB2629' />
                </button>

                <Link to='/settings'>
                    Meu Perfil
                </Link>
                
                <Link to='/admin'>
                    Configuração
                </Link>
                
                <Link to='/admin/social'>
                    Redes Sociais
                </Link>
                
                <Link to={'/' + localStorage.getItem('@s')}>
                    LinksMe
                </Link>

            </nav>
        </header>
    )
}