import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const {height, width} = Dimensions.get('window');

const AddSerieCard = ({serie, isFirstColumn, onPress}) => {

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isFirstColumn ? styles.firstColumn : styles.lastColumn
            ]}
            onPress={() => onPress()}
        >
            <View style={styles.card}>
                <Feather name="plus-circle" size={150} color="#6CA2F7" /> 
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        height: height * 0.25,
        maxWidth: width * 0.5,
    },
    card: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    }
})

export default AddSerieCard;