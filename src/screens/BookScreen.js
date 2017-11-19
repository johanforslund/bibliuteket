import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class BookView extends Component {
  render() {
    const {
      author,
      date,
      description,
      email,
      location,
      name,
      phone,
      pictureUrl,
      price,
      title
    } = this.props.book;

    return (
      <ScrollView>
        <Card style={{ flex: 1, backgroundColor: '#CFE3E9' }}>
          <Image style={styles.imageStyle} source={{ uri: pictureUrl }} />
        </Card>
        <Card>
         <CardSection>
           <Text style={styles.headingStyle}>
             { title }
           </Text>
           <Text style={styles.subHeadingStyle}>
             { author }
           </Text>
         </CardSection>
         <CardSection style={styles.rowCardStyle}>
           <View style={{ flexDirection: 'row' }}>
             <Icon name="location-on" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={[styles.subHeadingStyle, { alignSelf: 'center' }]}>
               { location }
             </Text>
           </View>
           <Text style={styles.priceStyle}>
              { price } kr
           </Text>
         </CardSection>
        </Card>
        <Card>
         <CardSection>
           <Text style={styles.descriptionHeadingStyle}>Beskrivning</Text>
           <Text style={styles.descriptionTextStyle}>
             { description }
           </Text>
         </CardSection>
        </Card>
        <Card>
         <CardSection>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="person" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { name }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="email" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { email }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="phone" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { phone }
             </Text>
           </View>
           <View style={{ flexDirection: 'row', marginBottom: 3 }}>
             <Icon name="access-time" size={20} color="#373737" style={styles.iconStyle} />
             <Text style={styles.infoStyle}>
               { date }
             </Text>
           </View>
         </CardSection>
        </Card>
     </ScrollView>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subHeadingStyle: {
    fontSize: 15,
    color: '#373737'
  },
  priceStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00C853',
  },
  rowCardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 375, height: 280, resizeMode: 'contain', backgroundColor: '#373737'
  },
  descriptionHeadingStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3
  },
  descriptionTextStyle: {
    fontSize: 14,
    color: '#373737'
  },
  infoStyle: {
    fontSize: 14,
    color: '#373737',
    marginBottom: 3,
  },
  iconStyle: {
    marginRight: 8
  }
};

export default BookView;
