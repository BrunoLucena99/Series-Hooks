import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SerieFormPage from './pages/SerieFormPage';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Series',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#6CA2F7',
            borderBottomWidth: 1,
            borderBottomColor: '#C5C5C5',
          },
          headerTitleStyle: {
            fontSize: 30,
            color: '#FFF',
          }
        }}
      >
      <Stack.Screen
        name="Login"
        options={{title: 'Login'}}
        component={LoginPage}
      />
      
      <Stack.Screen
        name="SeriesPage"
        options={{title: 'Séries'}}
        component={SeriesPage} 
      />

      <Stack.Screen
        name="SerieFormPage"
        options={({route}) => {
          if(route.params) {
            const {serieToEdit} = route.params;
            return {title: serieToEdit.title}
          } else {
            return {title: 'Nova Série'}
          }
        }}
        component={SerieFormPage} 
      />
      
      <Stack.Screen
        name="SerieDetailPage"
        options={({route}) => {
          const {serie} = route.params;
          return ({
            title: route.params.serie.title,
            headerTitleStyle: {fontSize: serie.title.length > 20 ? 20 : 30}
          })
        }}
        component={SerieDetailPage}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
