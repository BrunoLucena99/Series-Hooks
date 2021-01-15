import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const SerieCard = ({serie, isFirstColumn}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isFirstColumn ? styles.firstColumn : styles.lastColumn
            ]}
            onPress={() => navigation.navigate('SerieDetailPage', {serie})}
        >
            <View style={styles.card}>
                {
                    serie.img64
                        ? <Image
                            style={styles.logo}
                            source={{
                                uri:`data:image/png;base64,${serie.img64}`
                            }}
                            resizeMode="cover"
                          />
                        : null
                }

                <View style={styles.cardTitleWrapper}>
                    <Text style={styles.cardTitle}>{serie.title}</Text>
                </View>
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
    },
    logo: {
        flex: 1,
    },
    cardTitleWrapper: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: 'black',
        opacity: .8,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 3,
    },
    cardTitle: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    }
})

export default SerieCard;