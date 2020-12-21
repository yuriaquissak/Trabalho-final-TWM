
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import styles from './style';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



export default function Payment() {

    
    const navigation = useNavigation();
    function navigateBack() {
        navigation.goBack()
    }
    function navigateHome() {
        navigation.navigate('Products')
    }
    

    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

             <View style={styles.form}>    
                  
                <TextInput placeholder="Nome do comprador"/>
            </View>
            <View style={styles.form}>
                <TextInput type="email" placeholder="Email da comprador"/>
              </View>
            <View style={styles.form}>
                <TextInput placeholder="Cidade"/>
             </View>
            <View style={styles.form}>
                <TextInput placeholder="UF"/>
              </View>
            <View style={styles.form}>
                <TextInput placeholder="Endereço"/>
              </View>
            <View style={styles.form}>
                <TextInput placeholder="Número do cartão"/>
             </View>
            <View style={styles.form}>
                <TextInput placeholder="Código de segurança"/>
            </View>
            <View>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigateHome()}>

                    <Text style={styles.detailsButtonText}>Confirmar compra</Text>
                    <Feather name="arrow-right" size={16} color="#FF0000" />
                </TouchableOpacity>
            </View> 
        </ScrollView>
    )
}