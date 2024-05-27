import React, { useRef, useState, } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const {register} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current);
    setLoading(false);

    console.log('got result: ', response);
    if(!response.success){
      Alert.alert('Sign Up', response.msg)
    }
    // Implement your login logic here
  }

  return (
    <CustomKeyboard>
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        {/* <View style={styles.box}>
          <Image style={styles.image} resizeMode="contain" source={require('../assets/images/sun.png')} />
        </View> */}
        <View style={styles.form}>
          <Text style={styles.signInText}>Registration</Text>
          <View style={styles.inputContainer}>
          <Ionicons name="people-outline" size={24} color="black" />
            <TextInput 
              onChangeText={value => usernameRef.current = value}
              style={styles.textInput}
              placeholder='Username'
              placeholderTextColor={'white'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <TextInput 
              onChangeText={value => emailRef.current = value}
              style={styles.textInput}
              placeholder='Email address'
              placeholderTextColor={'white'}
            />
          </View>
          <View style={[styles.inputContainer, styles.passwordInput]}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <TextInput 
              onChangeText={value => passwordRef.current = value}
              style={styles.textInput}
              placeholder='Password'
              secureTextEntry
              placeholderTextColor={'white'}
            />
          </View>
         
        </View>

        <View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading size={hp(8)} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleRegister} style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>

       

        <View style={styles.signUpContainer}>
          <Text>Already have an account ?</Text>
          <Pressable onPress={() => router.push('signIn')}>
            <Text style={styles.signUpText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
    </CustomKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp(25),
  },
  form: {
    marginTop: hp(1),
  },
  signInText: {
    fontSize: 24,
    fontWeight: '900',
  },

  inputContainer: {
    marginTop:20,
    height: hp(7),
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 5,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  passwordInput: {
    marginTop: 20,
  },
  textInput: {
    fontSize: hp(2),
    flex: 1,
  },
  forgotPassword: {
    marginTop: hp(1),
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  signInButton: {
    marginTop: hp(1),
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: hp(2.7),
  },
  signUpContainer: {
    marginTop: hp(1),
    alignItems: 'center',
  },
  signUpText: {
    marginTop: hp(1),
  },
});
