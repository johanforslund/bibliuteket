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
    height: 150,
    width: 150,
    resizeMode: 'contain',
    backgroundColor: '#373737'
  }
};

//Export Component
export default ListImage;
