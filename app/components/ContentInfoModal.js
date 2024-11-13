import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export default function ContentInfoModal({visible, onPlayPress, closeModal, Title, info}) {

    function playPress() {
        closeModal();
        onPlayPress();
    }

  return (
      <Modal
        visible={visible}
        statusBarTranslucent={true}
        transparent={true}
        animationType="slide"
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
                <Text style={styles.desc}>
                {info.name}
                </Text>
                <Text style={[styles.desc, {marginTop: 5,opacity: 0.7, fontStyle:'italic'}]}>
                - {info.pastor}, {info.church}
                </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: "100%",
                  marginTop: 24,
                  backgroundColor: "#c7c7c7",
                  flexDirection: 'row', alignItems: 'center'
                },
              ]}
              onPress={() => playPress()}
            >
                <Text style={[styles.text]}>
                    Play content
                </Text>
                <View style={{width: 11}}></View>
                    <FontAwesome5 name="play" size={14} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
}

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