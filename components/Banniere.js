import * as React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  Header } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';

import styles, {fsRed, fsBlack, fsBlanc, fsBeige, sxGreen} from '../Styles';

export function Banniere(props){

return (<Header
          containerStyle={styles.header}
          rightComponent={<View style={{display:"flex", flexDirection: "row"}}>
            <Icon name="" color="black" size={20} style={{marginRight: "10%"}}/>
            <TouchableOpacity activeOpacity={0.8}  onPress={()=>{props.navigation.navigate("About")}}>
              <Icon name="more-vert" color="black" size={20} style={{marginRight: "5%"}}/>
            </TouchableOpacity>
            </View>}
        >
          <View style={{ justifyContent: 'center', display: "flex", flexDirection: "row"}}>
            <Text style={{ color: 'black', textAlignVertical:"center", fontWeight: "bold" }}> FOOT</Text>
            <Text style={{ color: sxGreen, textAlignVertical:"center", fontWeight: "bold" }}> X </Text>
          </View> 

        </Header>)
}