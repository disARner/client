/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import api from '../../api';

import Colors from '../../constants/Colors';

const RegisterScreen = ({navigation: {goBack}}) => {
  // const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth = Dimensions.get('screen').width;

  const handleSubmit = async () => {
    //dispatch()
    try {
      await api({
        method: 'POST',
        url: '/register',
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      ToastAndroid.showWithGravity(
        'Register success, please login.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      goBack();
    } catch (err) {
      ToastAndroid.showWithGravity(
        err.response.data[0].message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View style={{...styles.container, width: windowWidth, marginBottom: 50}}>
        <Text style={styles.titleText}>Register</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            onChangeText={text => setUsername(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            autoCompleteType="off"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            ...styles.button,
            width: 150,
            marginVertical: 20,
            paddingHorizontal: 5,
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              ...styles.buttonText,
              fontSize: 15,
              fontFamily: 'AirbnbCerealMedium',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    color: '#37315e',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AirbnbCerealMedium',
  },
  inputGroup: {
    padding: 5,
    margin: 10,
  },
  inputLabel: {
    // fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontFamily: 'AirbnbCerealBook',
  },
  textInput: {
    height: 40,
    backgroundColor: '#fdfdfd',
    borderRadius: 15,
    width: 300,
    paddingHorizontal: 10,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.blackish,
    width: 200,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fdfdfd',
    fontFamily: 'AirbnbCerealLight',
    backgroundColor: 'transparent',
  },
});

export default RegisterScreen;
