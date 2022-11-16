import * as React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import {  Header, Image } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Feather';
import styles, {fsRed, fsBlack, fsBlanc, fsBeige} from '../Styles';
import { getGameData } from '../Utils';
import { ListItem, Badge } from '@rneui/themed';
import { addPercent} from '../Utils';


export function GamePronoScreen({ navigation: { goBack }, route }){
    let gameId = route.params.gameId;
    let homeImgUrl = route.params.homeImgUrl;
    let awayImgUrl = route.params.awayImgUrl;
    let fromListGame = route.params.game;
    var [gameData, setGameData] = React.useState({});

    var stats = {
        "PSG": ["PSHG", "PSAG"],
        "CustomShots": ["CustomHS", "CustomAS"],
        "CustomShotsTarget": ["CustomHST", "CustomAST"],
    }
    const statsTexte = {
        "PSG": "Buts marqués (saison)",
        "CustomShots": "Tirs (moyenne saison)",
        "CustomShotsTarget": "Tirs cadrés (moyenne saison)",
    }
    React.useEffect(()=>{
        const fetchGameData = getGameData(gameId, setGameData);
      }, [])
    /*
    faire la mise en page -> avec données
    
    placeholder
    */
    return (
        <View style={styles.container}>
            <Header
            containerStyle={styles.header}
            leftComponent={<TouchableOpacity activeOpacity={0.8} onPress={()=>goBack()}>
                                <Icon name="arrow-left" color="white" size={30}/>
                            </TouchableOpacity>}
            centerComponent={<View style={{ flex: 1, justifyContent: 'center'}}>
                                <Text style={{ color: '#fff', textAlignVertical:"center", fontWeight: "bold" }}> {(fromListGame.conseil>0)?"CONSEIL":"MATCH"} </Text>
                                </View> 
                                }
            />
        <View style={styles.container}>

            <View style={{height:"22%", backgroundColor: fsBeige, flexDirection: 'row'}}>
                <View style={{width: "40%", backgroundColor: fsBlanc, justifyContent: 'center', alignItems: 'center'}}> 
                    <Image source={{uri: homeImgUrl}} style={{ width: "50%", height: undefined, aspectRatio: 1}}/>
                    <Text style={{color:"black", fontWeight: "500"}}> {fromListGame.HomeTeam} </Text>
                </View>
                <View style={{width: "20%", backgroundColor: fsBlanc, alignItems:"center"}}> 
                            <Text style={{color: fsBlack}}>{fromListGame.date} {fromListGame.month} </Text>
                            <Text style={{color: fsBlack, alignSelf: 'center'}}>{gameData.gameHour} </Text>

                    <Text style={{color: "black", fontWeight: "bold", fontSize: 30}}>{fromListGame.FTHG} - {fromListGame.FTAG}</Text>
                </View>
                <View style={{width: "40%", backgroundColor: fsBlanc, justifyContent: 'center', alignItems: 'center'}}> 
                    <Image source={{uri: awayImgUrl}} style={{ width: "50%", height: undefined, aspectRatio: 1}}/>
                    <Text style={{color:"black", fontWeight: "500"}}> {fromListGame.AwayTeam} </Text>
                </View>
                <View style={{width: "20%", backgroundColor: fsBlanc}}> 
                </View>
            </View>
            <View style={{width: "100%", height: 1, backgroundColor: 'lightgrey'}}></View>
            <View style={{height: "10%", backgroundColor: fsBlanc, flexDirection: "row"}}>
                <View style={{width: "30%", alignItems: "center", justifyContent: 'center',}}>
                    <Text style={{color: fsBlack, fontWeight: "bold"}}>{(fromListGame.conseil>0)?"Conseil : ":"Avis IA :"} </Text>
                </View>
                <View style={{width: "45%", justifyContent:"center", alignSelf: "center"}}>
                    <Text style={{color: fsBlack}}>{fromListGame.pronoTexte}</Text>
                </View>
                <View style={{width: "10%", justifyContent:"center", alignSelf: "center"}}>

                    <View style={{height: "50%", justifyContent: "flex-end", alignItems: "center"}}>
                        <Text style={[{color: "grey"}, (fromListGame.ODD_HOME==fromListGame.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{}]}> {fromListGame.ODD_HOME} </Text>
                    </View>
                    <View style={{height: "50%", alignItems: "center"}}>
                        <Text style={[{color: "grey"}, (fromListGame.OD_DRAW_OR_AWAY==fromListGame.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{}]}> {fromListGame.OD_DRAW_OR_AWAY} </Text>
                        </View>
                </View>
                <View style={{width: "15%", justifyContent:"center", alignSelf: "center"}}>
                    <Badge value={addPercent(fromListGame.confidence)} status={fromListGame.status}/>
                </View>

            </View>
            <View style={{width: "100%", height: 1, backgroundColor: 'lightgrey'}}></View>

        
        <ScrollView style={{backgroundColor: fsBlanc, flexGrow: 1, flex:1}}>
            {Object.keys(stats).map((stat, i) => {
                let all = gameData[stats[stat][0]]+gameData[stats[stat][1]];
                let homeWidth = parseInt(Math.round(100*gameData[stats[stat][0]]/all))+"%";
                let awayWidth = parseInt(Math.round(100*gameData[stats[stat][1]]/all))+"%";;
                return(
                
                <View key={i} style={{height: "7%", flexDirection: "column", flex: 1}}>
                    <View style={{flexDirection: "row"}}>
                        <View style={{width: "10%", alignItems: "center"}}>
                            <Text style={{color: "black", fontWeight: "400"}}>{gameData[stats[stat][0]]}</Text>
                        </View>
                        <View style={{width: "80%", alignItems: "center"}}>
                            <Text style={{color: fsBlack}}>{statsTexte[stat]}</Text>
                        </View>
                        <View style={{width: "10%", alignItems: "center"}}>
                            <Text style={{color: "black", fontWeight: "400"}}>{gameData[stats[stat][1]]}</Text>
                        </View>
                    </View>
                    
                    <View style={{flexDirection: "row"}}>
                        <View style={{width: "1%"}}>
                        </View>
                        <View style={{width: "98%", 
                                      alignItems:"center",
                                      justifyContent: "center",
                                      flexDirection: "row"}}>
                            <View style={{width: "47%", backgroundColor: "lightgrey", borderRadius: 10}}>
                                <View style={{width: homeWidth,
                                height: "50%",
                                backgroundColor: homeWidth>awayWidth?fsRed:fsBlack, 
                                borderRadius: 10,
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5, 
                                    alignSelf: "flex-end"}}>
                                    <Text></Text>
                                </View>
                            </View>
                            <View style={{width: "0.5%", backgroundColor: "white"}}></View>
                            <View style={{width: "47%", backgroundColor: "lightgrey", borderRadius: 10}}>
                            <View style={{width: awayWidth, height: "50%", 
                                        backgroundColor: homeWidth<awayWidth?fsRed:fsBlack, 
                                        borderRadius: 10, 
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        alignSelf:"flex-start"}}>
                                </View>
                                <View style={{width: "1%"}}></View>
                            </View>
                        </View>
                        <View style={{width: "1%"}}>
                        </View>
                    </View>
                </View>
                )
            })}
        </ScrollView>
        
        </View>
    </View>)
}