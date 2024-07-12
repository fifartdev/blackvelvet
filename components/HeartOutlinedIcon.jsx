import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

export default function HeartOutlinedIcon({onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Entypo name="heart-outlined" size={24} color="#E1057A" />
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    
})