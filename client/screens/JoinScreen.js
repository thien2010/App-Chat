import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import BlankValidate from '../utils/BlankValidate'
export default function JoinScreen({ navigation, route }) {
    const { account, name, avatar, time, password } = route.params
    const [room, setRoom] = useState('');
    useEffect(() => {
        navigation.setOptions({ title: "Hello " + name })
    }, [])
    return (
        <View style={{ backgroundColor: '#f000', flex: 1 }}>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={{
                    flex: 1,
                    justifyContent: 'flex-start', alignItems: 'center',
                    resizeMode: "cover",

                }}
            >
                <Image
                    source={require('../assets/chat.png')}
                    style={{ width: 200, height: 200 }}
                />

                <Text
                    style={{ fontSize: 30 }}
                >Join Chat !</Text>

                <TextInput
                    style={{ borderWidth: 1, padding: 10, borderColor: 'gray', borderRadius: 10, marginTop: 10, color: 'black', fontSize: 20, backgroundColor: 'white', width: '40%', textAlign: 'center' }}
                    placeholder="Enter Room"
                    value={room}
                    onChangeText={(e) => {
                        setRoom(e)
                    }}

                />
                <TouchableOpacity
                    style={{ backgroundColor: 'cyan', textAlign: 'center', borderRadius: 10, marginTop: 20, padding: 15, width: '60%', alignItems: 'center' }}
                    onPress={() => {
                        !BlankValidate(room) ? navigation.navigate('Home', { name, room, account, avatar, time }) : Alert.alert('Field is not empty')
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Join!</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View >
    )
}
