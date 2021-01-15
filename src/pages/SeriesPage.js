import React, { useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    ActivityIndicator 
} from 'react-native';
import {isEven} from '../utils';
import {connect} from 'react-redux';
import {watchSeries} from '../actions'

import SerieCard from '../components/SerieCard'
import AddSerieCard from '../components/AddSerieCard'

const SeriesPage = ({navigation, series, watchSeries}) => {

    useEffect(() => {
        watchSeries();
    }, []);

    if (series === null) return <ActivityIndicator size="large" color="#6CA2F7" />

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

// export default SeriesPage;

const mapStateToProps = (state) => {
    const {series} = state;

    //Initial state of series is null, set loading...

    if (series === null) {
        return {series: null}
    }

    const keys = Object.keys(series);
    const seriesWithKeys = keys.map((id) => (
        {...series[id], id}
    ))
    return {series: seriesWithKeys}
}

export default connect(mapStateToProps, {watchSeries})(SeriesPage);