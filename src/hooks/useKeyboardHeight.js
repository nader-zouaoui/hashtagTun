import {useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardHeight = (didShowEffect, didHideEffect) => {
  useEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      didShowEffect,
    );
    const keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      didHideEffect,
    );
    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  });
};

export default useKeyboardHeight;
