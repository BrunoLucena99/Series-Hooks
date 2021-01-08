import React from 'react';
import { Image, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Row from '../components/Row';
import LongText from '../components/LongText';

const SerieDetailPage = ({navigation, route}) => {
    const {serie} = route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <Image 
                    source={{
                        uri: serie.img
                    }}
                    resizeMode="cover"
                    style={styles.imgLogo}
                />
                <Row label='Título' content={serie.title} />
                <Row label='Gênero' content={serie.gender} />
                <Row label='Nota' content={serie.rate} />
                <LongText label='Descrição' content={serie.description} />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    imgLogo: {
        aspectRatio: 1,
    }
})

export default SerieDetailPage;