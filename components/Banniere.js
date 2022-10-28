import * as React from 'react';
import { Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  Header } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';

import styles, {fsRed, fsBlack, fsBlanc, fsBeige} from '../Styles';

export function Banniere(props){

return (<Header
          containerStyle={styles.header}
          rightComponent={{ icon: 'info', color: '#fff' }}
        >
          <Image source={require("../letters1024.png")} style={{height: "100%", aspectRatio: 1}}/>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: '#fff', textAlignVertical:"center", fontWeight: "bold" }}> DAMSOPRONOS</Text>
          </View> 
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity activeOpacity={0.8}  onPress={()=>{props.navigation.navigate("About")}}>

            <Icon name="info-outline" color="white" size={30}/>
            </TouchableOpacity>

          </View>
        </Header>)
}
