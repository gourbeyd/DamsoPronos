import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import NoConseil from './NoConseil';
import styles, {fsRed, fsBlack, fsBlanc, fsBeige} from '../Styles';
import {getGames } from '../Utils';
import {GamesList} from './GamesList';
import {Banniere} from './Banniere'

export function PronosScreen({ navigation, route}) {
    const [games, setGames] = useState([]);
    const [vue, setVue] = useState(route.params.vue);

    // trigger only once to go and fetch conseils (ie all games there)
    React.useEffect(()=>{
      const fetchData = getGames(setGames)
    }, [])
    let gamesList = <GamesList vue={vue} games={games}></GamesList>

    const countConseils = games.filter(obj => {if (obj.conseil==1 | obj.conseil==2 | obj.conseil==3 | obj.conseil==4) {return true;}return false;}).length;
    if ((games.length==0 && vue == 1) | (countConseils==0 && vue==0)){//si aucun match a affichier
      gamesList = <NoConseil vue={vue}/>;
    }
    return (
      <View style={styles.container}>
      <Banniere navigation={navigation}/>
      <View style={styles.navup}>
        <View style={[{width: "50%"}, vue==0?{borderBottomColor: fsRed, borderBottomWidth: 2}:{borderBottomColor: "lightgrey", borderBottomWidth: 2}]}>
          <TouchableOpacity
            style={styles.buttonNavUp}
            onPress={()=>setVue(0)}
            activeOpacity={0.8}
            >
            <Text style={vue==0?{color: fsRed, fontWeight: "500"}:{fontWeight: "500", color: "grey"}}>CONSEILS</Text>
          </TouchableOpacity>
        </View>
        <View style={[{width: "50%"}, vue==1?{borderBottomColor: fsRed, borderBottomWidth: 2}:{borderBottomColor: "lightgrey", borderBottomWidth: 2}]}>
          <TouchableOpacity
              style={styles.buttonNavUp}
              onPress={()=>setVue(1)}
              activeOpacity={0.8}
              >
              <Text style={vue==1?{color: fsRed, fontWeight: "500"}:{fontWeight: "500", color:"grey"}}>TOUS LES MATCHS</Text>
            </TouchableOpacity> 
        </View>
      </View >
  
         {
            gamesList
          }
        </View>
    );
  }