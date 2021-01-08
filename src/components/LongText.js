import React, {useState} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    UIManager,
    TouchableWithoutFeedback,
    LayoutAnimation} 
from 'react-native';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const LongText = ({label = '-', content = '-'}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const expandDescription = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity
            )
        )
        setIsExpanded(!isExpanded);
    }

    return (
        <View style={styles.line}>
            <Text 
                style={[styles.cell, styles.label]}
            >
                {label}
            </Text>
            <TouchableWithoutFeedback onPress={() => expandDescription()}>
                <View>
                    <Text
                        style={[
                            styles.cell,
                            styles.content,
                            isExpanded ? styles.expanded : styles.collapsed
                    ]}>{content}</Text>
                    <Text
                        style={[
                            styles.label,styles.cell,styles.textInfo
                        ]}
                    >
                        {isExpanded ? '(Clique para reduzir)' : '(Clique para expandir)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
	    </View>
    )
};

const styles = StyleSheet.create({
	line: {
        paddingTop: 3,
	},
	cell: {
		fontSize: 18,
		paddingHorizontal: 5,
	},
	label: {
		fontWeight: 'bold',
        flex: 1,
        textDecorationLine: 'underline',
        paddingBottom: 8,
	},
	longLabel: {
		fontSize: 12,
	},
	content: {
		flex: 3,
        flexWrap: 'nowrap',
        textAlign: 'justify',
    },
    collapsed: {
        maxHeight: 65,
    },
    expanded: {
        flex: 1,
    },
    textInfo: {
        fontSize: 13,
    }
});

export default LongText;