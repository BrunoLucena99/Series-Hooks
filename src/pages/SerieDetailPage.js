import React from 'react';
import {
    Image,
    StyleSheet,
    SafeAreaView,
    Button,
    View,
    Alert,
    ScrollView
} from 'react-native';
import Row from '../components/Row';
import LongText from '../components/LongText';
import {connect} from 'react-redux';
import {deleteSerie} from '../actions';

const SerieDetailPage = ({navigation, route, deleteSerie}) => {
    const {serie} = route.params;

    const tryDelete = () => {
        deleteSerie(serie).then((hasDeleted) => {
            if (hasDeleted) navigation.goBack();
        }).catch(() => {
            Alert.alert('Erro', 'Desculpe ocorreu um erro ao remover sua série');
        })
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {
                    serie.img64
                        ? <Image 
                           source={{
                                uri:`data:image/png;base64,${serie.img64}`
                            }}
                            resizeMode="cover"
                            style={styles.imgLogo}
                           />
                        
                        : null
                }

                <Row label='Título' content={serie.title} />
                <Row label='Gênero' content={serie.gender} />
                <Row label='Nota' content={serie.rate} />
                <LongText label='Descrição' content={serie.description} />

                <View style={styles.btnWrapper}>
                    <Button
                        onPress={() => {
                            navigation.replace('SerieFormPage', {serieToEdit: serie})
                        }}  
                        title="Editar"
                    />
                </View>

                <View style={styles.btnWrapper}>
                    <Button 
                        color="red"
                        title="Excluir"
                        onPress={() => tryDelete()}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    imgLogo: {
        aspectRatio: 1,
    },
    btnWrapper: {
        marginVertical: 5,
    }
});

export default connect(null, {deleteSerie})(SerieDetailPage);