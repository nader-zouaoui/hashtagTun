import React, {useState} from 'react';
import {View, Animated} from 'react-native';
import {connect} from 'react-redux';
import {contributionScreenStyle} from 'styles';
import {
  TextField,
  FloatingButton,
  CurrentProductImage,
  ViewContainer,
  Menu,
  ProgressBar,
  Toast,
  Text,
} from 'components';
import {useKeyboardHeight, useTheme} from 'hooks';
import {CreateContributionAction} from 'actions';
import {governorates, strings} from 'constants';
import {NavigationService} from 'services';
import {dimensions} from 'helpers';

const {vw, vh} = dimensions;

const scale = new Animated.Value(1);
const translateY = new Animated.Value(0);
const textOpacity = new Animated.Value(1);

const reg = /^[0-9.,]+$/;

const ContributionInformationScreen = props => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const theme = useTheme();
  const {
    product: {
      barcode,
      imageFile: {uri},
    },
    contributions: {uploadProgress, isImageUploading},
  } = props;

  const shrink = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.7,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const expand = ({redirect}) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (redirect) {
        NavigationService.popToTop();
        NavigationService.navigate('Contributions');
      }
    });
  };

  const showProgressBar = () => {
    Animated.spring(translateY, {
      toValue: 10 * vh,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  const hideProgressBar = () => {
    Animated.spring(translateY, {
      toValue: -4 * vh,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  useKeyboardHeight(shrink, expand);

  const handleRegionSelect = selectedRegion => {
    setPlace(selectedRegion);
  };

  const handleSubmit = async () => {
    if (name.length && reg.test(price)) {
      shrink();
      showProgressBar();
      await props.CreateContributionAction({name, place, price});
      hideProgressBar();
      expand({redirect: true});
    } else {
      setIsToastVisible(true);
      setTimeout(() => {
        setIsToastVisible(false);
      }, 4000);
    }
  };

  let ref = null;
  const getRef = fieldRef => {
    ref = fieldRef;
  };

  const focusPriceField = () => {
    ref.current.focus();
  };

  return (
    <ViewContainer hideKeyboard>
      <Text
        animated
        style={[
          contributionScreenStyle.text,
          {color: theme.textPrimary, opacity: textOpacity},
        ]}>
        {strings.contributionDetailsHeader}
      </Text>
      <CurrentProductImage
        uri={uri}
        barcode={barcode}
        style={{
          transform: [{scaleX: scale}, {scaleY: scale}],
        }}
      />
      <View style={contributionScreenStyle.textFieldContainer}>
        <TextField
          placeholder={strings.productPlaceholder}
          label={strings.productNameLabel}
          importantForAutofill="no"
          value={name}
          returnKeyType="next"
          onSubmitEditing={focusPriceField}
          onChangeText={setName}
          blurOnSubmit={false}
          isRequired
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextField
            placeholder={strings.pricePlaceholder}
            label={strings.productPriceLabel}
            importantForAutofill="no"
            // keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            handleFocus={getRef}
            containerStyle={{flex: 1, marginRight: 10}}
            isRequired
          />
          <Menu
            items={governorates}
            handleSelect={handleRegionSelect}
            label={strings.productMenuLabel}
            containerStyle={{flex: 1}}
          />
        </View>
      </View>
      <ProgressBar
        uploadProgress={uploadProgress}
        style={{transform: [{translateY}]}}
      />
      <FloatingButton
        iconName="send"
        handleSubmit={handleSubmit}
        disabled={isImageUploading}
      />
      <Toast
        message={strings.contributionErrorToastMessage}
        visible={isToastVisible}
      />
    </ViewContainer>
  );
};

const mapStateToProps = ({product, contributions}) => ({
  product,
  contributions,
});

export default connect(
  mapStateToProps,
  {CreateContributionAction},
)(ContributionInformationScreen);
