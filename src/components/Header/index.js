import './header.css'
import { BiLogOut } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'



export function Header(){
     
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

                <Link to='/admin'>
                    Meu Perfil
                </Link>
                <Link to='/admin'>
                    Links
                </Link>
                <Link to='/admin/social'>
                    Redes Sociais
                </Link>

            </nav>
        </header>
    )
}