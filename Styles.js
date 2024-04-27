import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const fsBlack = "#2F3538";
export const fsRed = "#FF0046";
export const fsBeige = "#FFF2CE";
export const fsBlanc = "#ffffff";
export const sxGreen = "#006340";


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: "11%",
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    buttonNavUp: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      padding: 10,
      height: "100%",
    },
    navup:{
      flex: 0,
      flexDirection: "row", 
      width: "100%", 
      height: "10%"
    },
    noConseil:{
      alignItems: "center",
      justifyContent: "space-evenly",
      height: "100%"
    },
    twitter: {
      alignItems: "center",
      justifyContent: "center",
    },
    textinfo:{
      margin:10, 
      textAlign: 'center',
      fontSize: 17,    
    },

    //sum of under gameX with x attribute should be 100%
    gameDate:{
      width: "15%",
      minWidth: "15%",
      maxWidth: "15%",
      padding: 0,
      margin: 0,
      justifyContent: 'center',
      alignItems: "center",
    },
    gameLogo:{
      width: "10%",
      minWidth: "10%",
      maxWidth: "10%",
      padding: 0,
      marginLeft: -15,
    },
    gameResult:{
      justifyContent: "space-evenly",
      width: "5%",
      minWidth: "5%",
      maxWidth: "5%",
      padding: 0,
      marginLeft: -9,
    },
    gameProno: {
      minWidth: "45%",
      width: "45%",
      maxWidth: "45%",
      padding: 0,
      marginLeft: -9,
      justifyContent: 'center',
    },
    gameCote:{
      minWidth: "12%",
      maxWidth: "12%",
      width: "12%",
      height: Dimensions.get('window').height*12/100,
      padding: 0,
      marginLeft: -15,
      justifyContent: "center"
    },
    result:{
      width: "5%",
      minWidth: "5%",
      maxWidth: "5%",
      padding: 0,
      marginLeft: -10,
      alignItems: "flex-end",
    },
    gameConfidence:{
      width: "11%",
      minWidth: "11%",
      maxWidth: "11%",
      padding: 0,
      marginLeft: -15,
      alignItems: "flex-end"
    }
  });