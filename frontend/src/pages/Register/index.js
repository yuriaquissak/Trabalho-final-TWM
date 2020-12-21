import React, { useState } from'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoimg from "../../assets/logo.jpeg";
import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try { const response = await api.post('vendors', data);
        alert(`Seu ID de acesso: ${response.data.id}`)
        history.push('/');
        } catch(err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="The Outlet" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro</p>
                    <Link className="back-link" to="/">
                       <FiArrowLeft size={16} color="#E02041"/>
                        Não Tenho Cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>  
                    <input placeholder="Nome da vendedor" 
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="Email da vendedor"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade" 
                        value={city}
                        onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{ width: 80 }}
                        value={uf}
                        onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>

    )
}