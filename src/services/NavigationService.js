import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
function replace(routeName, params) {
  _navigator.dispatch(
    NavigationActions.replace({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationActions.back());
}

function push(routeName, params) {
  _navigator.dispatch(
    NavigationActions.push({
      routeName,
      params,
    }),
  );
}
const resetAction = routeName => {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName})],
    }),
  );
};

const popToTop = () => {
  _navigator.dispatch(StackActions.popToTop());
};
// add other navigation functions that you need and export them

export default {
  navigate,
  back,
  setTopLevelNavigator,
  replace,
  push,
  resetAction,
  popToTop,
};
