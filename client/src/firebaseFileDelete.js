import firebase from './firebase';

const storageRef = firebase.storage().ref();

function deleteFile(relativeFilePath) {
  const fileRef = storageRef.child(relativeFilePath);
  fileRef.delete().then(() => {
    console.log('File deleted successfully.');
    return true;
  }).catch(error => {
    console.error('There was an error deleting the specified file.');
    return false;
  });
}

export default deleteFile;