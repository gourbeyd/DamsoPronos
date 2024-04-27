import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Styles';


export default function NoConseil(props) {
    let vue = props.vue;
    let msg=props.msg;
    return (
        <View style={styles.noConseil}>
         <View style={styles.twitter}>
            <Image source={require('../football.png')} 
                        style={{ width: "45%", 
                                    height: undefined, 
                                    aspectRatio: 1,
                                tintColor: "lightgrey"}}
                                />
            <Text></Text>
            <Text style={{fontWeight: "500", color: "grey"}}> {msg} </Text>        
        </View>
    </View>)
}
