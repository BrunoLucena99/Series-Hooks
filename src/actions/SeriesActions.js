import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_SERIES = 'SET_SERIES';
const setSeries = (series) => ({
    type: SET_SERIES,
    series,
})

export const watchSeries = () => {
    const {currentUser} = firebase.auth();
    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/series`)
            .on('value', (snapshot) => { //Callback that will be executed every time the value changes
                const series = snapshot.val();
                const action = setSeries(series);
                dispatch(action);
            });
    }
}

export const deleteSerie = serie => (
    dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Atenção',
                `Deseja deletar a serie ${serie.title}?`,
                [{
                    text: 'Não',
                    onPress: () => {
                        resolve(false);
                    },
                    style: 'cancel' //IOS
                },{
                    text: 'Sim',
                    onPress: () => {
                        const {currentUser} = firebase.auth();
                        
                        firebase.database()
                            .ref(`users/${currentUser.uid}/series/${serie.id}`)
                            .remove()
                            .then(() => {
                                resolve(true);
                            }).catch((e) => {
                                reject(e);
                            })
                    },
                }],
                {cancelable: false}
            );
        })
    }
);