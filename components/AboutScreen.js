import * as React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import {  Header, Image } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Feather';

import { Banniere } from './Banniere';
import styles from '../Styles';



export function AboutScreen({ navigation: { goBack } }){
    return (
        <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftComponent={<TouchableOpacity activeOpacity={0.8} onPress={()=>goBack()}>
                            <Icon name="arrow-left" color="white" size={30}/>
                        </TouchableOpacity>}
          centerComponent={<View style={{ flex: 1, justifyContent: 'center'}}>
                            <Text style={{ color: '#fff', textAlignVertical:"center", fontWeight: "bold" }}> A PROPOS</Text>
                            </View> 
                            }
        />
        
        <ScrollView>
            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 10}}>
                <Text style={{fontSize: 18, color: "black"}}>Bienvenue sur l'application </Text>
                <Text style={{fontSize: 18, color: "black", fontWeight: "bold"}}>DamsoPronos 👋</Text>
            </View>
             

            <View style={{alignSelf: "flex-start", flexDirection: "column", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 16, color: "black"}}>
                    1 seul objectif  : gagner aux paris sportifs et partager ses conseils 💸
                </Text>
                <Text style={{fontSize: 16, color: "black"}}>
                    Sur cette page je vous explique l'approche ainsi que l'utilisation de l'appli pour un maximum de gains. 🔥
                    </Text>
            </View>

            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 10}}>
                <Text style={{fontSize: 18, color: "black"}}>Approche assistée par </Text>
                <Text style={{fontSize: 18, color: "black", fontWeight: "bold"}}>IA 📈</Text>
            </View>

            <View style={{alignSelf: "flex-start", flexDirection: "row", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 16, color: "black"}}>Pour optimiser les chances de gagner ses paris, j'ai utilisé des modèles d'intelligence artificielle.
L'IA se prête parfaitement a ce genre de problèmes, beaucoup de donnés et de stats sont disponibles sur les matchs et ne demandent qu'à être utilisées.</Text>
            </View>

            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 18, color: "black"}}>En </Text>
                <Text style={{fontSize: 18, color: "black", fontWeight: "bold"}}>pratique 🎯</Text>
            </View>

            <View style={{alignSelf: "flex-start", alignItems:"flex-start", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 16, color: "black"}}> On retrouve deux onglets dans la section pronostics, CONSEILS et TOUS LES MATCHS. Dans l'onglet tous les matchs, vous retrouverez l'avis de l'IA sur chaque rencontre des 5 grands championnats.
                🇫🇷🇩🇪🇪🇸🏴󠁧󠁢󠁥󠁮󠁧󠁿🇮🇹</Text>

                <Text style={{fontSize: 16, color: "black"}}> Je ne conseille pas de jouer tous ces matchs. Les matchs que je conseille et qui seront retenus pour le bilan sont dans l'onglet CONSEILS ! 🏆 </Text>
                <Text style={{fontSize: 16, color: "black"}}> L'IA a été entrainé à choisir entre victoire de l'équipe à domicile ou bien extérieur ou nul, c'est pourquoi vous voyez deux côtes pour chaque match. La côte grisée est celle du pari proposé (source: betclic). ☑️</Text>
            </View>


            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 18, color: "black"}}>Comprendre les</Text>
                <Text style={{fontSize: 18, color: "black", fontWeight: "bold"}}> résultats 🔍</Text>
            </View>

            <View style={{alignSelf: "flex-start", flexDirection: "column", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 16, color: "black"}}>Pour mesurer la valeur d'un pronostiqueur/d'un modèle, le meilleur indicateur est le ROI (retour sur investissement) c'est à dire ce que nos mises nous font gagner. (ROI de 5%: en moyenne, on gagne 5e pour chaque 100e misé).
                </Text>
                <Text style={{fontSize: 16, color: "black"}}>Vous pouvez retrouver les résultats des conseils dans l'onglet résultats avec le ROI et le pourcentage de réussite ! 💪</Text>
            </View>

            <View style={{alignSelf: "center", flexDirection: "row", marginTop: 10, margin: 5}}>
                <Text style={{fontSize: 18, color: "black", fontWeight: "bold"}}> Contact ☎️</Text>
            </View>
            <View style={{flexDirection: "column", marginTop: 10, margin: 5, justifyContent:"center"}} >
                <Text style={{fontSize: 16, color: "black", alignSelf: "center"}}>🐦 @DamsoPronos</Text>
                <Text style={{fontSize: 16, color: "black", alignSelf: "center"}}>📧 solarmoonprod@gmail.com</Text>
                <Text></Text>
                <Text style={{fontSize: 14, color: "black", alignSelf: "center"}}>Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09-74-75-13-13 (appel non surtaxé).</Text>

            </View>
        </ScrollView>
    </View>)
}