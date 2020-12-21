import React, { useEffect, useState } from 'react';
import logoimg from '../../assets/logo.jpeg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api'

export default function Profile() {
    const history = useHistory();
    const vendorName = localStorage.getItem('vendorName');
    const vendorId = localStorage.getItem('vendorId');
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: vendorId,
            }
        }).then(response => {
            setProducts(response.data)
        })
    }, [vendorId])


    async function handleDeleteProduct(id) {
        try{
            
          await api.delete(`products/${id}`, {
              headers: {
                  Authorization: vendorId,
              }
          });

          setProducts(products.filter(product=> product.id !== id))
        } catch(err) {
                alert('Erro ao deletar produto, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="The Outlet" />
                <span>Bem vindo, {vendorName}</span>

                <Link className="button" to="/products/new">Cadastrar Novo Produto</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Produtos Cadastrados</h1>
            <ul>
                {products.map(product=> (
                    <li kye={product.id}>
                        <strvendor>Produto: </strvendor>
                        <p>{product.title}</p>
                        <strvendor>Descrição: </strvendor>
                        <p>{product.description}</p>
                        <strvendor>Valor: </strvendor>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>
                        <button onClick={() => handleDeleteProduct(product.id)} type="button">
                            <FiTrash2 size={20}  color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}