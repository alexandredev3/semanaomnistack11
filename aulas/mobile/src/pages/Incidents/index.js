import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from  '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);    // Ele vai iniciar com um array vazia.
    const [total, setTotal] = useState(0); // Ele vai se iniciar com o valor em 0 no total de casos.

    const [page, setPage] = useState(1); // Ele vai iniciar na pagina 0
    const [loading, setLoading] = useState(false); // Para carregar uma pagina de vez

    const navigation = useNavigation();

    function navigationToDatail(incident) {
        navigation.navigate('Detail', { incident }); // Tem que ser o mesmo nome que vc colocou la no routes..
        // { incident } Ele vai pegar as infomações dos incidents e colocar la no detail
    }

    async function loadIncidents() {
        if (loading) { // Para evitar que o usuario fique tentando carregar mais enquanto esta carregando outra pagina.
            return;
        }

        if (total > 0 && incidents.length === total){   // Se a pagina 0 tiver toda carregada ele não vai ficar caçando mais informações para carregar.
            return;
        }

        setLoading(true)    // Se tudo tiver certo ele vai colocar o loading como True.

        const response = await api.get('incidents', {
            params: { page }    // Nós estamos indicando em que pagina estamos para a API.
        });

        setIncidents([...incidents, ...response.data]); // Estou copiando o incidents e o response.data, ( e uma forma de anexar em um unico vetor )
        setTotal(response.headers['x-total-cout']); // E o nome la do header que conta quandos casos tem.

        setPage(page + 1);  // Ele vai pular para a proxima pagina.
        setLoading(false);  // Vai desligar o loading
    };

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents}  // E a Array de dados que vai montar essa lista.
                keyExtractor={incident => String(incident.id)} // O primeiro valor e cada um dos incidents, e ela pricisa retorna uma informação unica de cada um dos incidents (ele vai retorna o objeto usando o id de cada um deles)
                showsVerticalScrollIndicator={true} // Tirar o stroll vertical.
                onEndReached={loadIncidents} // E uma função que e disparada automaticamente quando a lista chega no final...
                onEndReachedThreshold={0.2} // Ele mostra o porcetual de onde o usuario esta para que carregue novos items. (No caso ele esta em 20%)
                renderItem={({ item: incident }) => ( // Vai ser a função responsavel por rendelizar cada um dos items. esse item e o proprio incident.
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', 
                        { style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.value)}
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailButton}
                        onPress={() => navigationToDatail(incident)}
                        // Toda vez que vc for colocar um parametro dentro de um onpress vc tem que colocar um arrow function
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}