import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts } from '../../../../../utils/theme'

const FooterView = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./img/narrator.png')}
            />
            <Text style={styles.text}>Let’s see how everyone voted!</Text>
        </View>
    )
}

export default FooterView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    text: {
        fontFamily: fontFamilies.karlaRegular,
        fontWeight: '400',
        fontSize: fonts.xMedium,
        textAlignVertical: 'bottom',
        color: '#384466',
        marginBottom: verticalScale(25),
    }
})
