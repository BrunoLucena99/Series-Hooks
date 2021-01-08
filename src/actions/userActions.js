import firebase from 'firebase';
import { Alert } from 'react-native';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCESS';
const userLoginSuccess = (user) => ({
    type: USER_LOGIN_SUCCESS,
    user,
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});

export const tryLogin = (email, password) => (dispatch) => {
    
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        dispatch(userLoginSuccess(user));
        return user;
    })
    .catch((err) => {
        if (err.code === 'auth/user-not-found') {
            return new Promise((resolve, reject) => {
                Alert.alert(
                    'Usuário não existente',
                    'Deseja cadastrar um novo usuário com essas crendenciais?', 
                    [{
                        text: 'Não',
                        onPress: () => resolve()
                    }, 
                    {
                        text: 'Sim',
                        onPress: () => {
                            firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(resolve) //Receive and pass user via props
                            .catch(reject)
                        }
                    }]
                )
            })
        } else {
            return Promise.reject(err.code);
        }
    });
}