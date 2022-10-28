import * as React from 'react';
import { Text, View , ScrollView, Image } from 'react-native';

import { ListItem, Badge } from '@rneui/themed';
import styles, {fsRed, fsBlack, fsBlanc, fsBeige} from '../Styles';
import { addPercent} from '../Utils';

export function GamesList(props) {
  let vue = props.vue;
  let games = props.games;

  let gamesList = <ScrollView key={vue}>
  
  {games.map((game, i) => {
    if (vue==0 && (game.conseil == 1 | game.conseil==2)){ //afficher seulement les conseils
    return (<ListItem key={i} bottomDivider topDivider
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
      
        <ListItem.Content style={styles.gameProno} >
        <Text style={{fontWeight: "400", color: "black"}}> {game.pronoTexte} </Text>
        </ListItem.Content>
        
        <ListItem.Content style={styles.gameCote} >
          <View style={{height: "50%", justifyContent: "flex-end"}}>
            <Text style={(game.ODD_HOME==game.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{color: "grey"}}> {game.ODD_HOME} </Text>
          </View>
          <View style={{height: "50%"}}>
            <Text style={(game.OD_DRAW_OR_AWAY==game.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{color: "grey"}}> {game.OD_DRAW_OR_AWAY} </Text>
          </View>
        </ListItem.Content>

        <ListItem.Content style={styles.gameConfidence} >
        <Badge value={addPercent(game.confidence)} status={game.status}/>
        </ListItem.Content>

      </ListItem>)
    }
    else if (vue==1 && game.conseil!=1 && game.conseil!=2){ //afficher toius les matchs
      return (
        <ListItem key={i} bottomDivider topDivider
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
        
          <ListItem.Content style={styles.gameProno} >
          <Text style={{fontWeight: "400", color: "black"}}> {game.pronoTexte} </Text>
          </ListItem.Content>
          
          <ListItem.Content style={styles.gameCote} >
            <View style={{height: "50%", justifyContent: "flex-end"}}>
              <Text style={(game.ODD_HOME==game.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{color: "grey"}}> {game.ODD_HOME} </Text>
            </View>
            <View style={{height: "50%"}}>
              <Text style={(game.OD_DRAW_OR_AWAY==game.cote)?{color: "white", backgroundColor: "grey", borderRadius: 5}:{color: "grey"}}> {game.OD_DRAW_OR_AWAY} </Text>
            </View>
          </ListItem.Content>

          <ListItem.Content style={styles.gameConfidence} >
          <Badge value={addPercent(game.confidence)} status={game.status}/>
          </ListItem.Content>

        </ListItem>)

    }


  })}
  </ScrollView>;

return <View style={{height: "75%", width: "100%"}}>
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
    <ListItem.Content style={{width: "55%", minWidth:"55%", maxWidth:"55%", marginLeft: -9}}>
        <Text style={{color: "grey", marginLeft: "20%"}}> Pronostic </Text>
    </ListItem.Content>
    <ListItem.Content style={{width: "12%", marginLeft: -15}}>
        <Text style={{color: "grey"}}> Côte </Text>
    </ListItem.Content>
    <ListItem.Content style={{marginLeft: -15}}>
        <Text style={{color: "grey"}}> Conf. </Text>
    </ListItem.Content>
  </ListItem>
  {gamesList}
  </View>;
}