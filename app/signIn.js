import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
import Loading from '../components/Loading';
import CustomKeyboard from '../components/CustomKeyboard';

const SignInScreen = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
        Alert.alert('Sign In', "Please fill all the fields!");
        return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (response.success) {
        router.replace('/(tabs)/upload'); // Ensure this path is correct
    } else {
        Alert.alert('Sign In', response.msg);
    }
};


  return (
    <CustomKeyboard>
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <View style={styles.box}>
            <Image style={styles.image} resizeMode="contain" source={require('../assets/images/sun.png')} />
          </View>
          <View style={styles.form}>
            <Text style={styles.signInText}>Sign In</Text>
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
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>

          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size={hp(8)} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signUpContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </CustomKeyboard>
  );
};

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

export default SignInScreen;
