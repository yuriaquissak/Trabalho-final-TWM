import React, { useState } from 'react';
import './style.css';
import logoimg from "../../assets/logo.jpeg";
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'

export default function NewProduct() {

    const history = useHistory();
    const vendorId = localStorage.getItem('vendorId')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewProduct (e) {
        e.preventDefault();

        const data = {
            title, 
            description, 
            value,
        };

        try {
            await api.post('products', data, {
                headers: {
                    Authorization: vendorId,
                }
            })
            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastras caso, tente novamente')
        }
    }

    return(
        <div className="new-product-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="The Outlet" />
                    <h1>Cadastrar novo produto</h1>
                    <p>Descreva o produto</p>
                    <Link className="back-link" to="/profile">
                       <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewProduct}>
                    <input placeholder="Nome do produto"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    )
}