import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import styles from './style';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { ScrollView } from 'react-native-gesture-handler';


export default function Detail() {


    const route = useRoute();
    const navigation = useNavigation();
    const product = route.params.product;
    const message = `Ola, estou entrando para saber sobre o produto "${product.title}" Com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(product.value)}`
    
    function navigateBack() {
        navigation.goBack()
    }
    function navigateToPayment() {
        navigation.navigate('Payment');
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Comprador do produto: ${product.title}`,
            recipients: [`${product.email}`],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${product.whatsapp}&text=${message}`)
    }


    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.product}>
                    
                    <Text style={styles.productProperty, {marginTop: 0}}>Vendedor:</Text>
                    <Text style={styles.productValue}>{product.name}</Text>

                    <Text style={styles.productProperty}>Descrição:</Text>
                    <Text style={styles.productValue}>{product.description}</Text>

                    <Text style={styles.productProperty}>Valor:</Text>
                    <Text style={styles.productValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(product.value)}</Text>
                    <TouchableOpacity style={styles.action} onPress={navigateToPayment}>
                        <Text style={styles.actionText}>Pagamento</Text> 
                     </TouchableOpacity>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Olá</Text>
                <Text style={styles.heroTitle}>Interessado neste produto.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text> 
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>
    )
}