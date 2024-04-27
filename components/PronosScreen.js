import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { ListItem, Badge } from '@rneui/themed';
import flags from "./flags"
import { TouchableOpacity } from 'react-native';
import NoConseil from './NoConseil';
import styles, {fsRed, fsBlack, fsBlanc, fsBeige, sxGreen} from '../Styles';
import {getFootxGames } from '../Utils';
import {GamesList} from './GamesList';
import {Banniere} from './Banniere'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarStrip from 'react-native-calendar-strip';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//busid Bus 001 Device 009: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device (charging + debug)

const frlocale = {
  name: 'fr',
  config: {
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split(
      '_'
    ),
    monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split(
      '_'
    ),
    weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
    weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY LT',
      LLLL: 'dddd D MMMM YYYY LT'
    },
    calendar: {
      sameDay: "[Aujourd'hui à] LT",
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'une année',
      yy: '%d années'
    },
    ordinalParse: /\d{1,2}(er|ème)/,
    ordinal: function(number) {
      return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function(input) {
      return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem: function(hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
  }
};

export function PronosScreen({ navigation, route}) {
    const [gamesByLeague, setGames] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    // trigger only once to go and fetch conseils (ie all games there)
    React.useEffect(()=>{
      //api call to get games for current date :)
      let apiDate= selectedDate.getFullYear()+ "-"+ parseInt(selectedDate.getMonth()+1) +"-"+selectedDate.getDate();
      const fetchData = getFootxGames(setGames, apiDate)
    }, [])


    function loadDate(givenDate){
      let date = new Date(givenDate);
      let apiDate= date.getFullYear()+ "-"+ parseInt(date.getMonth()+1) +"-"+date.getDate();
      const fetchData = getFootxGames(setGames, apiDate);
      setSelectedDate(date)
    }
    let conseils = [];
    let countConseils = 0;
    Object.keys(gamesByLeague).forEach((league, i)=>{
      let games = gamesByLeague[league].games;
      games.forEach((gameObj)=>{
        if (gameObj.conseil >0){
          countConseils += 1;
          conseils.push(gameObj)
        }
      })
    })

    let bodyScreen = <NoConseil msg={"Aucun match disponible."}/>;
    if (Object.keys(gamesByLeague).length>0){
      //return scrollvview
      bodyScreen = <ScrollView style={{backgroundColor: fsBlanc, flexGrow: 1, flex:1, width: "100%"}}>
          {Object.keys(gamesByLeague).map((league, i)=>{
            return (
              <View key={i} style={{
                        display: "flex",
                        flexDirection: "row",
                        borderColor: sxGreen, 
                        borderRadius: 20, 
                        borderWidth: 1.5, 
                        margin: "1%",
                        height: screenHeight/10
                        }}>
                <Image source={flags[league]} style={{height: "auto", width: "20%",  
                  borderTopLeftRadius: 18, borderBottomLeftRadius: 18}}/>
                  <View style={{flex: 1, margin: "2%"}}>
                    <Text style={{color: "black", fontWeight: "bold", fontSize: 20}}>
                      {gamesByLeague[league].league}
                    </Text>
                    <Text style={{color: "black"}}>{gamesByLeague[league].country}</Text>
                  </View>
                  <View style={{margin: "5%", justifyContent: "center", alignItems: "center"}}>
                    <Icon name="arrow-forward" color="black" size={15} solid/>
                    <Text style={{color: "black"}}>{gamesByLeague[league].nbGames}</Text>
                  </View>
              </View>
            )
            })
          }
        </ScrollView>
    }
    return (
      <View style={styles.container}>
        <Banniere navigation={navigation}/>
        <View style={{height: countConseils>0?screenHeight/4:0,
                      borderBottomColor: sxGreen,
                      borderBottomWidth: 1,
                      }}>
          <Text style={{fontWeight: "900", color: "black", fontSize: 15, margin: "1%"}}>Conseils</Text>
          <ScrollView horizontal 
                      style={{backgroundColor: fsBlanc, 
                              flexGrow: 1, flex:1, 
                              marginLeft: "2%", marginBottom: "2%"
                            }}
                              >
              {conseils.map((game, i)=>{
                  return (
                      <View key={i} 
                      style={{ 
                        backgroundColor: sxGreen, 
                        borderRadius: 14, 
                        display: "flex", 
                        flexDirection: "column",
                        width: screenWidth/2,
                        justifyContent: "space-evenly",
                        marginLeft: screenWidth/50,
                        marginRight: screenWidth/50,
                      }}>
                        <View style={{marginLeft: "3%"}}>
                          <Text style={{color: "white", fontWeight: "bold"}}>{game.HomeTeam} - {game.AwayTeam}</Text>
                          <Text style={{color: "white"}}>{gamesByLeague[game.league].league}</Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                          <Image source={{uri: game.homeImgUrl}} style={{ width: "30%", height: undefined, aspectRatio: 1}}/>
                          <Image source={{uri: game.awayImgUrl}} style={{ width: "30%", height: undefined, aspectRatio: 1}}/>
                        </View>
                        <View style={{marginLeft: "3%"}}>
                          <Text style={{color: "white"}}>{game.pronoText}  {game.pronoCote!=undefined?"| "+game.pronoCote:""}</Text>
                        </View>
                      </View>
                      )
                })
              }
          </ScrollView>
        </View>
        <View style={{height: "10%", backgroundColor: fsBlanc, borderBottomColor: sxGreen, borderBottomWidth: 1}}>
          <CalendarStrip
              style={{height:"100%", paddingTop: 1, paddingBottom: 1}}
              scrollable
              selectedDate={selectedDate}
              onDateSelected={loadDate}
              locale={frlocale}
              dateNumberStyle={{color: "black"}}
              dateNameStyle = {{color: "black"}}
              highlightDateNameStyle = {{color: sxGreen, fontWeight: "900"}}
              highlightDateNumberStyle = {{color: sxGreen, fontWeight: "900"}}
              calendarHeaderStyle = {{color: "black", fontWeight: "bold"}}
            />
          </View>
      <View style={{height: countConseils>0?"54%":"79%"}}>
        {bodyScreen}
        </View>

      </View>
    );
  }