import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
function typeExtractor(fileType) {
  if (fileType) {
    const slashIndex = fileType.indexOf('/');
    const {length} = fileType;
    return fileType.substring(slashIndex + 1, length);
  }
  return '';
}

export const imageUploadService = (file, reportProgress, folder) =>
  new Promise((resolve, reject) => {
    let localFolder = 'blog';
    if (file) {
      const imageName = `${uuid.v4()}.${typeExtractor(file.type)}`;
      let uploadTask;
      if (folder) {
        localFolder = folder;
        uploadTask = storage()
          .ref(`${folder}/${imageName}`)
          .putFile(file.uri);
      } else {
        uploadTask = storage()
          .ref(`blog/${imageName}`)
          .put(file.uri);
      }
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          reportProgress(progress);
        },
        error => {
          reject(error);
        },
        () =>
          storage()
            .ref(localFolder)
            .child(imageName)
            .getDownloadURL()
            .then(url => {
              resolve({url});
            }),
      );
    }
  });
