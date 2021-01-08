import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import series from '../series.json';
import {isEven} from '../utils';

import SerieCard from '../components/SerieCard'
import AddSerieCard from '../components/AddSerieCard'

const SeriesPage = ({navigation}) => {

    return (
        <SafeAreaView>
            {/* isLast was added to add a new series on the application */}
            <FlatList
                data={[...series, {isLast: true}]}
                renderItem={ ({item, index}) => (
                    item.isLast
                        ? <AddSerieCard
                            isFirstColumn={isEven(index)}
                            onPress={() => navigation.navigate('SerieFormPage')}
                        />
                        : <SerieCard
                            isFirstColumn={isEven(index)}
                            serie={item} 
                            onPress={() => navigation.navigate('SerieDetailPage', item)}
                        />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                ListHeaderComponent={() => <View style={styles.marginTop5} /> }
                ListFooterComponent={() => <View style={styles.marginBottom5} /> }
            />
            {/* 
                ListHeaderComponent and ListFooterComponent to apply the margin at the top and bottom of the component 
            */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    marginTop5: {
        marginTop: 5,
    },
    marginBottom5: {
        marginBottom: 5,
    }
})

export default SeriesPage;