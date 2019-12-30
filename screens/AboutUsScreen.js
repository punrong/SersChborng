import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Image} from 'react-native-elements';
import { db } from '../Firebase_Config/db_config';

const DEVICE_WIDTH = Dimensions.get('window').width;
var ABOUTUS = {}
export default class AboutUsScreen extends React.Component {

    static navigationOptions = {
        title: 'About Us',
        headerStyle:{
          backgroundColor:  'rgba(0,122,255,0.5)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      };

      componentDidMount() {
        let AboutUS = {};
        ABOUTUS={}
           let ref = db.ref('AboutUS/');
           let message = ref.once('value', async (snapshot) => {
            snapshot.forEach( await function(childSnapshot) {
              AboutUS = {
                value:  childSnapshot.val().value,
                mission:  childSnapshot.val().mission,
                vision:  childSnapshot.val().vision,
                contact:  childSnapshot.val().contact,
                imageURI: childSnapshot.val().imageURI
              }
              ABOUTUS= AboutUS;
            })
            this.setState({aboutUs: ABOUTUS});
            console.log('state',this.state.aboutUs)
          });
      }

      constructor(props){
        super(props);
        this.state={
          aboutUs: []
        }
      }

    render() {
      return (
        <ScrollView 
            contentContainerStyle = {styles.scrollViewStyle}
            showsVerticalScrollIndicator={false}>
          <View>
            <Card
              containerStyle = {styles.cardImageContainerStyle}>
              <Image
                  source= {{ uri: this.state.aboutUs.imageURI }} 
                  style = {{height: DEVICE_WIDTH/3, width: DEVICE_WIDTH/3, margin: 5 }}
                  PlaceholderContent={<ActivityIndicator/>}/>
            </Card>
              
            <Card
              containerStyle = {styles.cardContainerStyle}
              wrapperStyle={{flex: 1}}>

              <TouchableOpacity disabled={true} style={{width:'100%'}}>
                  <Text style={styles.textBorder}>Our Value</Text>
              </TouchableOpacity>

              <Text style={styles.textDetail}>{this.state.aboutUs.value}</Text>

              <TouchableOpacity disabled={true} style={{width:'100%'}}>
                  <Text style={styles.textBorder}>Our Mission</Text>
              </TouchableOpacity>

              <Text style={styles.textDetail}>{this.state.aboutUs.mission}</Text>

              <TouchableOpacity disabled={true} style={{width:'100%'}}>
                  <Text style={styles.textBorder}>Our Vision</Text>
              </TouchableOpacity>

              <Text style={styles.textDetail}>{this.state.aboutUs.vision}</Text>

              <TouchableOpacity disabled={true} style={{width:'100%'}}>
                  <Text style={styles.textBorder}>Our Contact</Text>
              </TouchableOpacity>

              <Text style={styles.textDetail}>{this.state.aboutUs.contact}</Text>
            </Card>
          </View>
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({

    cardImageContainerStyle:{
      borderColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      alignItems: 'center',
      padding: 0,
      shadowOpacity: 0,
      width: DEVICE_WIDTH*0.9,
      shadowRadius: 0
    },

    cardContainerStyle: {
      borderRadius: 20, 
      borderColor: 'rgba(0,0,0,0.5)', 
      backgroundColor: '#fff', 
      width: DEVICE_WIDTH*0.9
    },

   textBorder: {
      color: "rgba(0,122,255,1)",
      borderWidth: 1,
      fontSize: 16,
      fontWeight: 'bold',
      borderRadius: 10,
      padding: 5,
      marginBottom: 10,
      marginTop: 10,
      borderColor: "rgba(0,122,255,1)",
      textAlign: "center"
    },

    scrollViewStyle: {
      flexGrow: 1, 
      paddingBottom: 10,
      alignItems: 'center'
    },

    textDetail: {
      fontSize: 14
    }
})