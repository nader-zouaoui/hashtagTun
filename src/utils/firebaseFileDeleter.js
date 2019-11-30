import storage from '@react-native-firebase/storage';

export const imageDeleterService = url =>
  new Promise((resolve, reject) => {
    const desertRef = storage().refFromURL(url);
    desertRef
      .delete()
      .then(v => {
        console.log('resolved', v);
        resolve();
      })
      .catch(err => {
        console.log('catch', err);
        reject(err);
      });
  });
