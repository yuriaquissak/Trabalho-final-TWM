import React, { useState } from 'react';
import './style.css';
import heroesimg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id })
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch(err) {
            alert('falha no login, tente novamente')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoimg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" 
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button className="button"type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                       <FiLogIn size={16} color="#E02041"/>
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>  
            <img src={heroesimg} alt="Heroes"/>
        </div>
    );
}