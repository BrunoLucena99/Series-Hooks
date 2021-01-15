import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, Text, SafeAreaView , ActivityIndicator} from 'react-native';
import FormRow from '../components/FormRow';
import {tryLogin} from '../actions';

import firebase from 'firebase';
import {connect} from 'react-redux';

const LoginScreen = ({tryLogin, navigation}) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const firebaseConfig = {
			apiKey: "AIzaSyBcmqqovMBkyyEieuekzSSmduH923KmyRY",
			authDomain: "series-5168f.firebaseapp.com",
			projectId: "series-5168f",
			storageBucket: "series-5168f.appspot.com",
			messagingSenderId: "1096016544668",
			appId: "1:1096016544668:web:4490a632f8bda81c943e59",
			measurementId: "G-DDPF1G4DLM"
		};
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		} else {
			firebase.app(); // if already initialized, use that one
		 	}
	}, []);

	const getMessageByErrorFirebaseCode = (errorCode) => {
		switch(errorCode) {
			case 'auth/wrong-password':
				return 'Senha Incorreta'
			case 'auth/user-disabled':
				return 'Usuário desabilitado'
			case 'auth/user-not-found':
				return 'Usuário não encontrado'
			case 'auth/invalid-email':
				return 'E-Mail incorreto'
			case 'auth/email-already-in-use':
				return 'Usuário já foi cadastrado'
			case 'auth/operation-not-allowed':
				return 'Operação inválida'
			case 'auth/weak-password':
				return 'Senha fraca'
			default: 
				return 'Não foi possível realizar o login/cadastro'
		}
	};
	
	const login = () => {
		setIsLoading(true);
		setMessage('');
		tryLogin(email, password).then((user) => {
			setIsLoading(false);
			if(user) {
				navigation.replace('SeriesPage');
			}
		}).catch((err) => {
			setIsLoading(false);
			setMessage(getMessageByErrorFirebaseCode(err));
		})
	};

	return (
		<SafeAreaView style={styles.container}>
			<FormRow first>
				<TextInput 
					style={styles.input} 
					placeholder="email@teste.com"
					value={email}
					onChangeText={val => setEmail(val)}
					keyboardType="email-address"
					autoCapitalize="none"
				/>
			</FormRow>
			<FormRow last>
				<TextInput
					secureTextEntry 
					style={styles.input} 
					placeholder="******" 
					value={password}
					onChangeText={val => setPassword(val)
					}
				/>
			</FormRow>

			{isLoading 
				? <ActivityIndicator size="large" color="#6CA2F7" /> 
				: <Button title="Entrar" onPress={() => login()} /> 
			}
			{message
				?<Text style={styles.errorText}>{message}</Text>
				: null
			}

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#000',
		paddingHorizontal: 5,
		paddingBottom: 5,
	},
	errorText: {
		marginTop: 10,
		color: 'red',
	}
})

export default connect(null, { tryLogin })(LoginScreen);