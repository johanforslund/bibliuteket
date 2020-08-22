import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "@react-native-firebase/app";
import Icon from "react-native-vector-icons/MaterialIcons";
import CardSection from "./CardSection";

class ImageUploader extends PureComponent {
  uploadImage(path) {
    return new Promise((resolve, reject) => {
      const sessionId = new Date().getTime();
      const imageRef = firebase
        .storage()
        .ref("images")
        .child(`${sessionId}`);
      this.props.setImageURL("");
      imageRef
        .putFile(path)
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  pickImage() {
    const options = {
      tintColor: Platform.OS === "ios" ? "#a6a2a0" : null,
      title: "Välj Bild",
      takePhotoButtonTitle: "Ta Foto",
      chooseFromLibraryButtonTitle: "Välj Från Galleri",
      maxWidth: 500,
      quality: 0.5
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let path = "";
        // Check if this works on iOS
        if (Platform.OS == "ios") path = response.uri;
        else {
          path = response.path;
        }
        this.uploadImage(path)
          .then(url => {
            this.props.setImageURL(url);
          })
          .catch(error => console.log(error));
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          switch (this.props.imageURL) {
            case null:
              return (
                <TouchableOpacity onPress={() => this.pickImage()}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("../images/uploadButton.png")} //eslint-disable-line
                  />
                </TouchableOpacity>
              );
            case "":
              return (
                <CardSection>
                  <ActivityIndicator />
                </CardSection>
              );
            default:
              return (
                <View>
                  <ImageBackground
                    source={{ uri: this.props.imageURL }}
                    style={styles.image}
                  >
                    <Icon
                      onPress={() => this.props.setImageURL(null)}
                      name="close"
                      size={30}
                      color="white"
                      style={styles.deleteButtonStyle}
                    />
                  </ImageBackground>
                </View>
              );
          }
        })()}
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    backgroundColor: "#373737"
  },
  upload: {
    textAlign: "center",
    color: "#333333",
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "gray"
  },
  deleteButtonStyle: {
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-end"
  }
};

export default ImageUploader;
