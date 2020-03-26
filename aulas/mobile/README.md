# SEMANA OMNISTACK 11.0 APP MOBILE 

    [ x ] > expo init mobile 

    - Mode de estilização no React Native:

        style={styles.container}

            * Vc passa o style e depois um objeto com o nome.

## Configurando navegação:

    [ x ] > npm install @react-navigation/native

    [ x ] > expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

        * Caso vc esteja usando o expo...

    [ x ] > npm install @react-navigation/stack
            * Navegação por butões.

## Pagina de casos:

    * Precisamos das logos de 3 tamanho por causa das telas de celulares diferentes.

    [ x ] > expo install expo-constants
        * Ele permite que temos um tamanho fixo

            paddingTop: Constants.statusBarHeight + 20,

                * Ele vai pegar a altura da status bar e dar + 20px


    - import { Feather } from '@expo/vector-icons';
        * O react native ja vem com o pacote de icons ja instalado e so importar 

        - Feather
            * E o nome do site que vc quer pegar os icons.

                <Feather name="arrow-right" size={16} color="#E02041" />

    - keyExtractor={incident => incident} 
        * O primeiro valor e cada um dos incidents, e ela pricisa retorna uma informação unica de cada um dos incidents (como eles são so numeros pode passar eles mesmos)

    - <Text style={[styles.incidentProperty, { marginTop: 0, }]}
        * Para anexa dois estilos em um mesmo elemento.
    
    - function navigateBack() {
        navigation.goBack()   
     }
        * Para ele voltar para a pagina anterior.

    - expo install expo-mail-composer
        * Ele vai nós permite que nós acessamos o email pela nossa aplicação.

    - deeplink 
        * Nós vamos acessar o whatsapp usando um endereço desse http://whatsapp.com
            * Todos os aplicativos do seu celular geralmente vai ter esse recurso.

        - No proprio react native vai ter um recurso para fazer isso
            - o nome e Linking importa ele no arquivo


## Conectando nossa aplicação com o back-end:

    [ x ] > npm install axios
        * Para nós poder acessar o backend pelo react native.


    - baseURL: 'http://192.168.1.9:3333'

        192.168.1.9 * E o ip que vc pegou la no expo.

        3333 * E a porta que vc colocou la no back-end

    [ x ] > npm install intl
        * E um pacote que vai adcionar o R$

        import 'intl'
        import 'intl/locale-data/jsonp/pt-BR'
            * Vc vai esta adcionando o idioma pt-br no intl

                * Coloque isso no app.js, assim vai ser adcionado em todos os arquivos.


        onPress={() => navigationToDatail()}

                    * Toda vez que vc for colocar um parametro dentro de um onpress vc tem que colocar um arrow function


        useRoute
            
            * Ele serve para pegar informações especificas da pagina atual...

        

    