import { scale, ScaledSheet } from 'react-native-size-matters'
import { colors, fonts, fontFamilies } from '../../../utils/theme'

export default ScaledSheet.create({
  container: {
    backgroundColor: colors.backgroundPurple,
    flex: 1
  },
  innerContainer: {
    alignContent: "center",
    alignItems: "center"
  },
  input: {
    color: colors.primary,
    fontSize: fonts.xMedium,
    fontFamily: fontFamilies.latoBold,
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: '24@vs',
    marginHorizontal: 10,
    marginBottom: 13,
  },
  title: {
    color: colors.white,
    fontSize: fonts.large,
    textAlign: 'center',
    paddingBottom: 9,
    fontFamily: fontFamilies.montserratBold,
  },
  entryContainer: {
    alignSelf: 'center',
    //width: scale(265)
  },
  inputContainer: {
    flexDirection: 'row',
  },
  enterButton: {
    backgroundColor: colors.buttonPrimary,
    fontFamily: fontFamilies.karlaBold,
    fontSize: fonts.xLarge,
    fontWeight: 'bold',
    height: 50,
    marginBottom: 13
  },
  rightOnHeroImage: {
    width: 230,
    height: 118,
    alignSelf: 'center'
  },
  logoContainer: {
    marginTop: 22,
    height: scale(166)
  }
})
