import React, {useEffect} from 'react';
import {Animated} from 'react-native';

import {afterScanStyle} from 'styles';
import {
  LikeSvg,
  FloatingFlags,
  FloatingButton,
  Text,
  ViewContainer,
} from 'components';
import {NavigationService} from 'services';
import {useTheme} from 'hooks';
import {dimensions} from 'helpers';
import {strings} from 'constants';

const {vw, vh} = dimensions;

const ScanSuccessful = () => {
  const scale = new Animated.Value(2 / 3);
  const textOpacity = new Animated.Value(0);
  const translateX = new Animated.Value(-100 * vw);
  const buttonTranslateY = new Animated.Value(20 * vh);

  // const [thumbOpacity, setThumbOpacity] = useState(0)

  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      // setThumbOpacity(1)
      startAnimations();
    }, 2500);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      animateFloatingButton();
    }, 2500);
  }, [theme]);

  const animateFloatingButton = () => {
    Animated.spring(buttonTranslateY, {
      toValue: 0,
      friction: 6,

      useNativeDriver: true,
    }).start();
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(textOpacity, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    NavigationService.navigate('FeedPerBarCode');
  };

  return (
    <ViewContainer style={{backgroundColor: theme.secondary}}>
      <Animated.View style={{transform: [{translateX}]}}>
        <LikeSvg style={afterScanStyle.svg} />
      </Animated.View>
      <Text
        animated
        style={[
          afterScanStyle.text,
          {
            opacity: textOpacity,
            transform: [{scaleX: scale}, {scaleY: scale}],
            color: '#FFFFFF',
          },
        ]}>
        {strings.tunisianExclamation}
      </Text>
      <FloatingFlags order={1} />
      <FloatingFlags order={2} />
      <FloatingFlags order={3} />
      <FloatingFlags order={4} />
      <FloatingFlags order={5} />
      <FloatingFlags order={6} />
      <FloatingFlags order={7} />
      <FloatingFlags order={8} />
      <FloatingFlags order={9} />
      <FloatingFlags order={10} />
      <FloatingFlags order={11} />
      <FloatingFlags order={12} />
      <FloatingFlags order={13} />
      <FloatingFlags order={14} />

      <FloatingButton
        style={{transform: [{translateY: buttonTranslateY}]}}
        iconColor={theme.primary}
        backgroundColor="#FFFFFF"
        handleSubmit={handleSubmit}
      />
    </ViewContainer>
  );
};

export default ScanSuccessful;
