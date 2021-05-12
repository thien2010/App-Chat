import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ImageBackground } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import SERVER from '../utils/Server';
import Modal from 'react-native-modal';
import PasswordValidate from '../utils/PasswordValidate'


export default function Person({ route, navigation }) {
    const { name, account, avatar, time, password } = route.params;
    const [editName, setEditName] = useState(name);
    const [oldPassword, setOldPassword] = useState(password);
    const [newPassword, setNewPassword] = useState(password);
    const [confirmNewPassword, setConfirmNewPassword] = useState(password);
    const [isLoading, setIsLoading] = useState(false);
    const [newAvatar, setNewAvatar] = useState(avatar)
    const [isModalVisible, setModalVisible] = useState(false);

    async function updateData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'

            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);

    };

    const edit = () => {
        if (oldPassword !== password) {
            Alert.alert('Current password is incorrect')
            return
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Password is not match')
            return
        }
        if (PasswordValidate(newPassword) && PasswordValidate(confirmNewPassword)) {
            if (newPassword === confirmNewPassword) {
                setIsLoading(true)
                updateData(`${SERVER}update`, { account, name: editName, password: newPassword, avatar: newAvatar })
                    .then(data => {
                        setIsLoading(false)
                        if (data.status === 'fail') {
                            Alert.alert('This account is Invalid')
                        } else {
                            navigation.navigate('SignIn')
                        }
                    });
            }
        } else {
            alert('Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }

    }
    const changeImage = () => {
        let randomAvatar = Math.floor(Math.random() * 1000);
        let randomSet = Math.floor(Math.random() * 4 + 1)
        setNewAvatar(`https://robohash.org/${randomAvatar}?set=set${randomSet}`)

    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/person.jpg')}
                style={{
                    flex: 1, justifyContent: 'space-around',
                    resizeMode: "cover",
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 50 }}>
                    <Spinner
                        //visibility of Overlay Loading Spinner
                        visible={isLoading}
                        //Text with the Spinner
                        textContent={'Loading...'}
                        //Text style of the Spinner Text
                        textStyle={{ color: '#FFF' }}
                    />

                    <TouchableOpacity
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            elevation: 10,
                        }}
                        onPress={changeImage}
                    >
                        <Image
                            source={{ uri: newAvatar }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textName}>{name}</Text>
                    <TextInput
                        style={styles.textForm}
                        placeholder="New name"

                        onChangeText={(e) => {
                            setEditName(e)
                        }}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textForm}
                        placeholder="New password"
                        onChangeText={(e) => {
                            setNewPassword(e)
                        }}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textForm}
                        placeholder="Confirm new password"

                        onChangeText={(e) => {
                            setConfirmNewPassword(e)
                        }}
                    />

                    <Text style={{ width: '90%', marginTop: 10 }}>If don't want to change password. Please blank new
                    password and
                    confirm new
                        password</Text>
                    <TouchableOpacity
                        style={styles.update}
                        onPress={toggleModal}
                    >
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Update</Text>
                    </TouchableOpacity>
                    <Modal
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        animationIn='slideInUp'
                        coverScreen={true}
                        animationInTiming={2000}
                        backdropOpacity={0.5}
                        onBackdropPress={() => setModalVisible(false)}
                        onSwipeComplete={() => setModalVisible(false)}
                        onBackButtonPress={() => {
                            setModalVisible(false)
                        }}
                        isVisible={isModalVisible}>
                        <View style={styles.modal}>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textForm}
                                placeholder="Old password"

                                onChangeText={(e) => {
                                    setOldPassword(e)
                                }}
                            />
                            <TouchableOpacity
                                style={styles.update}
                                onPress={edit}
                            >
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    update:
    {
        backgroundColor: 'cyan',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 20,
        padding: 15,
        width: '60%',
        alignItems: 'center'
    },
    textForm:
    {
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
        color: 'black',
        fontSize: 20,
        backgroundColor: 'white',
        width: '60%',
        textAlign: 'center'
    }
    ,
    textName:
    {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    }
    ,
    image:
    {
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 50,
    }
    ,
    modal:
    {
        height: 200,
        width: '80%',
        backgroundColor: 'lightgreen',
        borderRadius: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
})
