import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

export default function RefreshIcon({onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Entypo name="ccw" size={24} color="#E1057A" />
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    
})