import React from 'react'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native'
import { fontFamilies, fonts } from '../../../utils/theme'

const Card = ({ extraStyle, headerTitle, children }) => {
    const cardStyle = { ...extraStyle, ...styles.cardContent }
    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{headerTitle}</Text>
            </View>
            <ScrollView
                style={styles.cardContent}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    cardContent: {
        flex: 1,
        marginLeft: moderateScale(25),
        marginRight: moderateScale(25),
        borderRadius: 24,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 5
            }
        }),
    },
    headerContainer: {
        marginBottom: verticalScale(20),
    },
    headerText: {
        fontFamily: fontFamilies.montserratBold,
        fontWeight: 'bold',
        fontSize: fonts.large,
        color: 'white',
        textAlign: 'center'
    }
})
