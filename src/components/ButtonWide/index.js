import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import { colors, deviceWidth, elevation, fonts } from '../../utils/theme';

export default class ButtonWide extends React.PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.shape({ type: PropTypes.any }),
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    ripple: PropTypes.string,
    textStyles: PropTypes.shape({ type: PropTypes.any }),
  };
  
  static defaultProps = {
    buttonStyles: {},
    label: '',
    onPress: () => {},
    ripple: '',
    textStyles: {},
  };
  
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }


  handlePress() {
    Keyboard.dismiss();
    this.props.onPress();
  }


  render() {
    const {
      buttonStyles,
      // onPress,
      label,
      ripple,
      textStyles,
    } = this.props;

    return (
      <Touchable
        activeOpacity={0.8}
        background={Touchable.Ripple(ripple || colors.primary, false)}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handlePress}
        style={[styles.button, buttonStyles, elevation]}
      >
        <Text style={[styles.label, textStyles]}>{ label || 'Okay' }</Text>
      </Touchable>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    bottom: 15,
    height: 65,
    justifyContent: 'center',
    position: 'absolute',
    width: deviceWidth - 75,
    zIndex: 10,
  },
  label: {
    color: colors.white,
    fontSize: fonts.medium,
  },
});
