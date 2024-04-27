import * as React from 'react';
import { useState } from 'react';
import  {Text, View , ScrollView, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { ListItem, Badge } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import styles, {fsRed, fsBlack, fsBlanc, fsBeige} from '../Styles';
import {getStats} from '../Utils';
import {Banniere} from './Banniere'
import { Dimensions } from 'react-native';
import {getGames } from '../Utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Picker} from '@react-native-picker/picker';


export function ResultsScreen({ navigation, route}) {
  var [stats, setStats] = useState({results: [], benefice: 0, nbparis: 0, reussiteTexte: "0/0", reussitePourcentage: " ", loading: true});
  const [refreshing, setRefreshing] = React.useState(false);
  const [season, setSeason] = React.useState("2324");

  React.useEffect(()=>{
    const fetchData = getStats(setStats, season);
  }, [])

  function loadStats(season){
    setStats({results: [], benefice: 0, nbparis: 0, reussiteTexte: "0/0", reussitePourcentage: " ", loading: true})
    setSeason(season);
    getStats(setStats, season)
  }
  // loop over it to add a resultat attribute
  if (stats.loading){
    return( 
      <View style={styles.container}>
      <Banniere navigation={navigation}/>
      <View style={{flex: 0, flexDirection: "row", width: "100%", height: "4%"}}>
        <View style={{justifyContent: "center", height: "100%", width:"100%", borderBottomColor: 'lightgrey',
      borderBottomWidth: 1, fontWeight: "bold"}}>
            <Picker
              selectedValue={season}
              onValueChange={(itemValue, itemIndex) =>
                loadStats(itemValue)
              }
              style={{fontWeight: "bold", color:"black"}}
              >
              <Picker.Item label="2022/2023" value="2223" />
              <Picker.Item label="2023/2024" value="2324" />
            </Picker>

        </View>
      </View>
        <View style={{flex: 0, flexDirection: "row", width: "100%", height: "10%"}}>
        <TouchableOpacity activeOpacity={0.8} style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "100%", width:"49%"}}>
        <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item marginTop={6} width={60} height={20} />
              </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
                <Text style={{color:"grey"}}> ROI </Text>
        </TouchableOpacity>
        <View style={{width: 1, height: '100%', backgroundColor: 'lightgrey'}}></View>
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={
              {justifyContent: "center", 
               alignItems: "center",
               backgroundColor: "white", 
              height: "100%", width:"49%"}}
          onPress={()=>{stats.reussite==stats.reussiteTexte?setStats({ ...stats, reussite: stats.reussitePourcentage}):setStats({ ...stats, reussite: stats.reussiteTexte})}}>
        <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item marginTop={6} width={60} height={20} />
              </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        <Text style={{color:"grey"}}> paris réussis </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: "100%", height: 1, backgroundColor: 'lightgrey'}}></View>
        <View style={{height: "71%", width: "100%"}}>
            <ListItem bottomDivider topDivider 
              Component={View}
              containerStyle = {{ marginLeft: 0,
                marginRight: 0, 
                marginBottom: 0,
                padding: 0,
                backgroundColor: '#fff',
                }}
                style={{width: "100%"}} >
            <ListItem.Content style={{width: "15%", minWidth:"15%", maxWidth:"15%"}}>
                <Text style={{color: "grey", alignSelf: "center"}}> Date </Text>
            </ListItem.Content>
            <ListItem.Content style={{width: Dimensions.get('window').width*0.6+6,
                                      minWidth:Dimensions.get('window').width*0.6+6, 
                                      maxWidth:Dimensions.get('window').width*0.6+6, 
                                      marginLeft: -9,
                                      }}>
                <Text style={{color: "grey", marginLeft: "25%"}}> Pronostic </Text>
            </ListItem.Content>
            <ListItem.Content style={{width: "12%", marginLeft: -15}}>
                <Text style={{color: "grey"}}> Côte </Text>
            </ListItem.Content>
            <ListItem.Content style={{width: "5%", marginLeft: -9}}>
                <Text style={{color: "grey"}}> Rés. </Text>
            </ListItem.Content>
          </ListItem>
        <View style={{height: "100%", width: "100%", alignSelf: 'center', justifyContent: "center", backgroundColor: fsBlanc}}>
            <View style={{height: "20%", width: "20%",
                          backgroundColor: "#E1E9EE", 
                          alignSelf: "center", 
                          borderRadius: 8,
                          marginTop: -(Dimensions.get('window').height*0.2),
                          justifyContent: "center"}}>
                
                <ActivityIndicator size="large" color={fsBlack} />

            </View>
          </View>
        </View>
      </View>)
  }
  return (
    <View style={styles.container}>
    <Banniere navigation={navigation}/>
    <View style={{flex: 0, flexDirection: "row", width: "100%", height: "4%"}}>
      <View style={{justifyContent: "center", height: "100%", width:"100%", borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,}}>
          <Picker
            selectedValue={season}
            onValueChange={(itemValue, itemIndex) =>
              loadStats(itemValue)
            }
            style={{fontWeight: "bold", color:"black",fontSize: 60,}}
            >
            <Picker.Item label="2022/2023" value="2223" />
            <Picker.Item label="2023/2024" value="2324" />
          </Picker>

      </View>

      </View>
      <View style={{flex: 0, flexDirection: "row", width: "100%", height: "10%"}}>

      <TouchableOpacity activeOpacity={0.8} style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "100%", width:"49%"}}>
              <Text style={{fontWeight: "bold", color:"black"}} > {Math.round(100*100*stats.benefice/stats.nbparis)/100}%</Text>
              <Text style={{color:"grey"}}> ROI </Text>
      </TouchableOpacity>
      <View style={{width: 1, height: '100%', backgroundColor: 'lightgrey'}}></View>
      <TouchableOpacity 
        activeOpacity={0.8} 
        style={
            {justifyContent: "center", 
             alignItems: "center",
             backgroundColor: "white", 
            height: "100%", width:"49%"}}
        onPress={()=>{stats.reussite==stats.reussiteTexte?setStats({ ...stats, reussite: stats.reussitePourcentage}):setStats({ ...stats, reussite: stats.reussiteTexte})}}>
      <Text style={{fontWeight: "bold", color:"black"}} > {stats.reussite} </Text>
      <Text style={{color:"grey"}}> paris réussis </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: "100%", height: 1, backgroundColor: 'lightgrey'}}></View>
      <View style={{height: "71%", width: "100%"}}>
          <ListItem bottomDivider topDivider 
            Component={View}
            containerStyle = {{ marginLeft: 0,
              marginRight: 0, 
              marginBottom: 0,
              padding: 0,
              backgroundColor: '#fff',
              }}
              style={{width: "100%"}} >
          <ListItem.Content style={{width: "15%", minWidth:"15%", maxWidth:"15%"}}>
              <Text style={{color: "grey", alignSelf: "center"}}> Date </Text>
          </ListItem.Content>
          <ListItem.Content style={{width: Dimensions.get('window').width*0.6+6,
                                    minWidth:Dimensions.get('window').width*0.6+6, 
                                    maxWidth:Dimensions.get('window').width*0.6+6, 
                                    marginLeft: -9,
                                    }}>
              <Text style={{color: "grey", marginLeft: "25%"}}> Pronostic </Text>
          </ListItem.Content>
          <ListItem.Content style={{width: "12%", marginLeft: -15}}>
              <Text style={{color: "grey"}}> Côte </Text>
          </ListItem.Content>
          <ListItem.Content style={{width: "5%", marginLeft: -9}}>
              <Text style={{color: "grey"}}> Rés. </Text>
          </ListItem.Content>
        </ListItem>
      <ScrollView 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>loadStats(season)}/>}>
        {
          stats.results.map((game, i) => {
              return (
              <TouchableOpacity key={i} activeOpacity={0.8}  onPress={()=>{navigation.navigate("GameScreen", {gameId: game.id, homeImgUrl: game.homeImgUrl, awayImgUrl: game.awayImgUrl, conseilId: stats.results.length-i, game: game})}}>
                
              <ListItem  bottomDivider topDivider
                Component={View}
                containerStyle = {{ marginLeft: 0,
                  marginRight: 0, 
                  marginBottom: 0,
                  padding: 2,
                  backgroundColor: '#fff',
                  }}
                  style={{width: "100%"}}                         
                >
                <ListItem.Content style={styles.gameDate}>
                <Text style={{color: "grey"}}> {game.date} </Text>
                <Text style={{color: "grey"}}> {game.month} </Text>
                </ListItem.Content>
                
                  <ListItem.Content style={styles.gameLogo} >
                  <Image source={{uri: game.homeImgUrl}} style={{ width: "100%", height: undefined, aspectRatio: 1}}/>
                  <Image source={{uri: game.awayImgUrl}} style={{ width: "100%", height: undefined, aspectRatio: 1}}/>
                  </ListItem.Content>

                  <ListItem.Content style={styles.gameResult} >
                    <ListItem.Subtitle style={[{color: "black"},
                                            (game.FTHG>game.FTAG)?{ fontWeight: 'bold' }: {}]}>
                          {game.FTHG}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle></ListItem.Subtitle>
                    <ListItem.Subtitle style={[{color: "black"},
                                            (game.FTAG>game.FTHG)?{ fontWeight: 'bold' }: {}]}>
                              {game.FTAG}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                
                  <ListItem.Content style={styles.gameProno} >
                  <Text style={{fontWeight: "400", color: "black"}}> {game.pronoText} </Text>
                  </ListItem.Content>
                  
                  <ListItem.Content style={styles.gameCote} >
                    <View style={{height: "100%", justifyContent: "center"}}>
                      <Text style={[{color: "black"}]}> {game.pronoCote} </Text>
                    </View>
                  </ListItem.Content>
                
                  <ListItem.Content style={styles.result} >
                            <Badge value={game.status=="success"?"V":"X"} status={game.status}/>
                            </ListItem.Content>
                </ListItem>
                </TouchableOpacity>)

        })
      }
      </ScrollView>
      </View>
    </View>
  );
}
