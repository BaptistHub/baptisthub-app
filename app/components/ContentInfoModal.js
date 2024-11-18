import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import ModalButton from "./Modal/Button/ModalButton";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import ButtonText from "./Modal/Button/ButtonText";
import InfoModal from "./Modal/InfoModal";

export default function ContentInfoModal({visible, onPlayPress, closeModal, Title, info}) {

    function playPress() {
        closeModal();
        onPlayPress();
    }

  return (
    <InfoModal
      closeModal={closeModal}
      visible={visible}
      Title={Title}
      content={
        <>
          <Text style={styles.desc}>
            {info.name}
          </Text>
          <Text style={[styles.desc, {marginTop: 5,opacity: 0.7, fontStyle:'italic'}]}>
            - {info.pastor}, {info.church}
          </Text>
          <ModalButton
              onPress={() => playPress()}
              content={
                <>
                  <ButtonText textProp={'Play content'}></ButtonText>
                  <View style={{width: 11}}></View>
                  <FontAwesome5 name="play" size={14} color="black" />
                </>
              }
          ></ModalButton>
        </>
      }
    ></InfoModal>
  );
}

const styles = StyleSheet.create({
  desc: {
    fontSize: 17,
    lineHeight: 24,
    color: "white",
    textAlign: 'center'
  }
});