import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

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
                <Image
                    style={styles.logo}  
                    source={require('../../resources/plus.png')}
                />
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
    },
    logo: {
        width: '80%',
        height: '80%',
        alignSelf: 'center',
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    }
})

export default AddSerieCard;