import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    SafeAreaView,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import {
    saveSerie,
    setField,
    setWholeSerie,
    resetForm
} from '../actions';

import FormRow from '../components/FormRow';
import * as ImagePicker from 'expo-image-picker';

const SerieFormPage = ({
    serieForm,
    setField,
    saveSerie,
    setWholeSerie,
    resetForm,
    navigation,
    route
}) => {
    const {title, description, gender, rate, img64} = serieForm;

    useEffect(() => {
        if(route.params) {
            const {serieToEdit} = route.params;
            setWholeSerie(serieToEdit);
        } else {
            resetForm();
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {

        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (granted) {

            let result 

            try {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    allowsMultipleSelection: false,
                    quality: 0.2,
                    base64: true,
                    aspect: [1, 1],
                });
            } catch (e) {
                console.log(e);
            }

            if (!result.cancelled) {
                setField('img64', result.base64)
            }

        } else {
            Alert.alert(
                'Atenção',
                'Você precisa permitir o acesso para continuar'
            );
        }
    };

    const trySaveSerie = () => {
        if (!(title && img64 && gender && rate && description)) {
            Alert.alert('Atenção', 'Preencha todos os dados para continuar');
        } else {
            setIsLoading(true);
            saveSerie(serieForm).then(() => {
                setIsLoading(false);
                navigation.goBack();
            }).catch(() => {
                setIsLoading(false);
                Alert.alert('Erro', 'Desculpe, ocorreu um erro ao salvar sua série');
            });
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <ScrollView>
                    <FormRow first>
                        <TextInput
                            style={styles.input}
                            placeholder="Título da Série"
                            value={title}
                            onChangeText={val => setField('title', val)} 
                        />
                    </FormRow>

                    <FormRow>
                        {serieForm.img64
                            ? <Image
                                source={{ uri: `data:image/png;base64,${img64}`}}
                                style={styles.img}
                              />
                            : null  
                        }
                        <Button
                            title="Selecionar Imagem"
                            onPress={() => pickImage()}
                        />
                    </FormRow>

                    <FormRow>
                        <Picker 
                            selectedValue={gender}
                            onValueChange={(itemValue) => setField('gender', itemValue)}
                        >
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Ação" value="Ação" />
                            <Picker.Item label="Suspense" value="Suspense" />
                            <Picker.Item label="Terror" value="Terror" />
                        </Picker>
                    </FormRow>

                    <FormRow>
                        <View style={styles.sameRow}>
                            <Text>Nota: </Text>
                            <Text>{rate}</Text>
                        </View>
                        <Slider
                            onSlidingComplete={(val) => setField('rate', val)}
                            maximumValue={100}
                            step={1}
                            value={rate}
                            
                        />
                    </FormRow>

                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição da Série"
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={(val) => setField('description', val)}
                        />
                    </FormRow>

                    {isLoading 
                        ? <ActivityIndicator size="large" color="#6CA2F7" /> 
                        : (
                            <Button
                                title="Salvar"
                                onPress={() => trySaveSerie()}
                            />
                        )
                    }


                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    img: {
        aspectRatio: 1,
        width: '100%',
        marginBottom: 10,
    }
});

const mapStateToProps = (state) => ({
    serieForm: state.serieForm,
});


export default connect(
    mapStateToProps, {
        setField,
        saveSerie,
        setWholeSerie,
        resetForm,
    }
)(SerieFormPage);