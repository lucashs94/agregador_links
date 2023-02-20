import './error.css'

import { Link } from 'react-router-dom'
import { Logo }  from '../../components/Logo'

export default function Error(){
    return(
        <div className='error'>
            <Logo/>
            <h1>Pagina não encontrada...</h1>
            <p>Procure uma pagina valida ou contate o administrador da pagina.</p>

            <Link className='link' to='/'>
                Voltar p/ Home
            </Link>
        </div>
    )
}