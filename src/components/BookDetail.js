import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ListImage from './ListImage';


class App extends Component {
  render() {
    const { pictureUrl, title, location, price, date } = this.props.book;

    return (
      <View>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: pictureUrl }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>{ title }</Text>
              <Text style={styles.locationStyle}>{ location }</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>{ price } kr</Text>
                <Text style={styles.dateStyle}>{ date }</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  locationStyle: {
    fontSize: 15

  },
  cardSectionAllStyle: {
    flexDirection: 'row'
  },
  cardSectionBottomStyle: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    justifyContent: 'space-between',
  },
  dateStyle: {
    alignSelf: 'flex-end',
    paddingBottom: 3
  },
  cardSectionTextStyle: {
    flex: 1
  },
  priceStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00C853',
    alignSelf: 'flex-end'
  }
};

export default App;
