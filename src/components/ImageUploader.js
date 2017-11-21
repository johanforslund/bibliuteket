import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bookUpdate } from '../actions/BookActions';

class ImageUploader extends Component {
  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      const storage = firebase.storage();
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = storage.ref('images').child(`${sessionId}`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
      });
    });
  }

  pickImage() {
    this.props.bookUpdate({ prop: 'pictureUrl', value: '' });
    ImagePicker.launchImageLibrary({ maxWidth: 500 }, response => {
      this.uploadImage(response.uri)
        .then(url => this.props.bookUpdate({ prop: 'pictureUrl', value: url }))
        .catch(error => console.log(error));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (() => {
            switch (this.props.pictureUrl) {
              case null:
                return (
                  <TouchableOpacity onPress={() => this.pickImage()}>
                    <Image source={require('../images/uploadButton.png')} />
                  </TouchableOpacity>
                );
              case '':
                return <ActivityIndicator />;
              default:
                return (
                  <View>
                    <Image
                      source={{ uri: this.props.pictureUrl }}
                      style={styles.image}
                    />
                  </View>
                );
            }
          })()
        }

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 15
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
};

const mapStateToProps = (state) => {
  const { pictureUrl } = state.bookForm;

  return { pictureUrl };
};

export default connect(mapStateToProps, { bookUpdate })(ImageUploader);
