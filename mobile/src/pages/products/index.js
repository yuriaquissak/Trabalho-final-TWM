import React, { useState, useEffect } from 'react'; 
import { View, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api'

export default function Products() {
    const[products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const navigation = useNavigation();

    function navigateToDetail( product ) {
        navigation.navigate('Detail', { product });
    }


    async function loadProducts() {
        if (loading) {
            return;
        }
        if (total > 0 && products.length === total) {
            return;
        }

        const response = await api.get('products', {
            params: { page }
        });
        setProducts([... products, ... response.data ]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);




    }

useEffect(() => {
    loadProducts();
}, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de: <Text style={styles.headerTextBold}>{total} produtos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um produto de seu interesse.</Text>

            <FlatList style={styles.productList}
                data={products}
                keyExtractor={product => String(product.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts}
                onEndReachedThreshold= {0.2}
                renderItem={({ item: product }) => ( 
                <View style={styles.product}>

                    <Text style={styles.productProperty}>Vendedor:</Text>
                    <Text style={styles.productValue}>{product.name}</Text>

                    <Text style={styles.productProperty}>Produto:</Text>
                    <Text style={styles.productValue}>{product.description}</Text>

                    <Text style={styles.productProperty}>Valor:</Text>
                    <Text style={styles.productValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(product.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(product)}>

                        <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#FF0000" />
                    </TouchableOpacity>

                </View>)}
            /> 
        </View>
    )
}