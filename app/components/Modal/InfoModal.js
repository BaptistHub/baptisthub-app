import React from 'react'
import { View, StyleSheet, Modal, Text, Pressable } from 'react-native'
import { Feather } from "@expo/vector-icons";

function InfoModal({visible, closeModal, Title, content}) {
  return (
    <Modal
    visible={visible}
    statusBarTranslucent={true}
    transparent={true}
    animationType="fade"
    >
        <View style={styles.content}>
        <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 24}}></View>
                <Text style={styles.title}>{Title}</Text>
                <Pressable onPress={() => closeModal()}>
                    <Feather name="x" size={24} color="white" />
                </Pressable>
            </View>
            <View style={{flexDirection: 'column'}}>
                {content}
            </View>
        </View>
        </View>
    </Modal>
  )
}

export default InfoModal

const styles = StyleSheet.create({
    desc: {
      fontSize: 17,
      lineHeight: 24,
      color: "white",
      textAlign: 'center'
    },
    title: {
      fontWeight: "600",
      fontSize: 20,
      marginBottom: 12,
      color: "white"
    },
    card: {
      width: "90%",
      padding: 20,
      backgroundColor: "#242424",
      borderRadius: 8,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    text: {
      fontWeight: "600",
      fontSize: 18,
      color: "black",
    },
    button: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      height: 56,
      borderRadius: 8,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });