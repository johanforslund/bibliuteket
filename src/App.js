import React, { Component } from 'react';
import {
  Text,
  ScrollView
} from 'react-native';
import Card from './components/Card';
import CardSection from './components/CardSection';
import ListImage from './components/ListImage';


class App extends Component {
  render() {
    return (
      <ScrollView style={styles.backgroundStyle}>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler' }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>Analys</Text>
              <Text style={styles.locationStyle}>Norrköping</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>350 kr</Text>
                <Text style={styles.dateStyle}>idag 10.43</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/21106544_10208062315274429_5151985829344739890_n.jpg?oh=89af39d61c7a5e5cc5901e962bf58114&oe=5A6FEEBC' }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>Analys</Text>
              <Text style={styles.locationStyle}>Norrköping</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>350 kr</Text>
                <Text style={styles.dateStyle}>idag 10.43</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/21105801_10214323414187684_4605614080820153181_n.jpg?oh=87e9bb6e3fb8bfe1059b8f6006207230&oe=5A63E0A2' }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>Analys</Text>
              <Text style={styles.locationStyle}>Norrköping</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>350 kr</Text>
                <Text style={styles.dateStyle}>idag 10.43</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/20786017_10155132607032950_2851559539084136278_o.jpg?oh=71de244ca0e0c976f162ed1f538f7bcc&oe=5AA4A706' }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>Analys</Text>
              <Text style={styles.locationStyle}>Norrköping</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>350 kr</Text>
                <Text style={styles.dateStyle}>idag 10.43</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
        <Card>
          <CardSection style={styles.cardSectionAllStyle}>
            <ListImage source={{ uri: 'https://image.bokus.com/images2/9789144038698_200x_analys-i-flera-variabler' }} />
            <CardSection style={styles.cardSectionTextStyle}>
              <Text style={styles.titleStyle}>Analys</Text>
              <Text style={styles.locationStyle}>Norrköping</Text>
              <CardSection style={styles.cardSectionBottomStyle}>
                <Text style={styles.priceStyle}>350 kr</Text>
                <Text style={styles.dateStyle}>idag 10.43</Text>
              </CardSection>
            </CardSection>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#CFE3E9',
    flex: 1
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 30
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00C853',
    alignSelf: 'flex-end'
  }
};

export default App;
