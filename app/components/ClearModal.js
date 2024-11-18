import React from 'react'
import { View , Text} from 'react-native'
import InfoModal from "./Modal/InfoModal";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ModalInfoText from "./Modal/ModalInfoText";
import ModalButton from "./Modal/Button/ModalButton";
import ButtonText from "./Modal/Button/ButtonText";


function ClearModal({visible,closeModal,Title,content, buttonPress}) {
  return (
    <InfoModal
    closeModal={closeModal}
    visible={visible}
    Title={Title}
    content={
      <>
        <ModalInfoText textProp={content}></ModalInfoText>
        <ModalButton
            onPress={() => buttonPress()}
            content={
              <>
                <FontAwesome5 name="trash-alt" size={18} color="black" />
                <View style={{width: 11}}></View>
                <ButtonText textProp={'Clear all'}></ButtonText>
              </>
            }
        ></ModalButton>
      </>
    }
    ></InfoModal>
  )
}

export default ClearModal