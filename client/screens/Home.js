import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import io from 'socket.io-client'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Spinner from 'react-native-loading-spinner-overlay';
import SERVER from '../utils/Server';
import ToggleSwitch from 'toggle-switch-react-native'
import Modal from 'react-native-modal';

import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function Home({ navigation, route }) {
    const { name, room, account, avatar, time } = route.params;
    const [receiveMessage, setReceiveMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const [showImage, setShowImage] = useState('')
    const socket = useRef(null);
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset)
            Alert.alert("Save Image Successfully")
        }
    }
    const downloadImage = () => {
        let fileUri = FileSystem.documentDirectory + "robo.jpg";
        FileSystem.downloadAsync(showImage, fileUri)
            .then(({ uri }) => {
                saveFile(uri);
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        fetch(`${SERVER}${room}`)
            .then(res => res.json())
            .then(res => {
                socket.current = io(`${SERVER}`);
                socket.current.emit("join", { name, room, account, avatar, time })
                socket.current.on("message", message => {
                    setReceiveMessage(pre => GiftedChat.append(pre, message))
                })
                setReceiveMessage(pre => GiftedChat.append(pre, res))
                setIsLoading(false)

            })
    }, [])
    useEffect(() => {
        navigation.setOptions({
            title: "Room: " + room, headerRight: () => (
                <ToggleSwitch
                    isOn={toggle}
                    onColor="white"
                    offColor="black"
                    label="Switch mode"
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="medium"
                    onToggle={isOn => {
                        setToggle(toggle => !toggle)
                    }}
                />
            )
        })
    }, [toggle])
    const onSend = (messageToSend) => {
        socket.current.emit("message", messageToSend[0].text);
        setReceiveMessage(pre => GiftedChat.append(pre, messageToSend))
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: toggle ? 'white' : 'black'
        }}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={isLoading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={{ color: '#FFF' }}
            />
            <GiftedChat
                isTyping={true}
                renderUsernameOnMessage
                messages={receiveMessage}
                placeholder='Send something'
                onSend={messages => onSend(messages)}
                isAnimated={true}

                user={{
                    _id: time,
                }}
                onPressAvatar={(user) => {
                    setShowImage(user.avatar)
                    setModalVisible(true)
                }}
                scrollToBottom={true}
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginRight: 15,
                            }}
                        >
                            <Image source={require('../assets/send.png')}
                                style={{ width: 27.2, height: 27.2 }} />
                        </Send>
                    );
                }}
            />
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
                <TouchableOpacity
                    onPress={downloadImage}

                >
                    <Image
                        source={{ uri: showImage }}
                        style={{ width: 120, height: 120 }}
                    />
                </TouchableOpacity>

            </Modal>
        </View>

    );
}
