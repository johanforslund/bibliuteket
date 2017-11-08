//import libraries
import React from 'react';
import { Image } from 'react-native';

//Make Component
const ListImage = (props) => {
  const { imageStyle } = styles;
  return (
    <Image
      style={imageStyle}
      source={props.source}
    />
  );
};

//Style
const styles = {
  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  }
};

//Export Component
export default ListImage;
