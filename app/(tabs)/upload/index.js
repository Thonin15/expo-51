import React, { useState, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../../frebaseConfig';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const AddPostScreen = forwardRef((props, ref) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCategoryList();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                // Handle user not authenticated case
            }
        });
    }, []);

    const getCategoryList = async () => {
        setCategoryList([]);
        const querySnapshot = await getDocs(collection(db, 'Category'));
        querySnapshot.forEach((doc) => {
            console.log("Docs:", doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()]);
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitMethod = async (value) => {
        if (!currentUser) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setLoading(true);

        try {
            const resp = await axios.get(image, { responseType: 'blob' });
            const blob = new Blob([resp.data], { type: resp.data.type });
            const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");

            const snapshot = await uploadBytes(storageRef, blob);
            console.log('Uploaded a blob or file');
            const downloadUrl = await getDownloadURL(storageRef);
            console.log(downloadUrl);

            value.image = downloadUrl;
            value.userName = currentUser.displayName || 'Anonymous';
            value.userEmail = currentUser.email;
            value.userImage = currentUser.photoURL || '';
            value.createdAt = new Date();

            const docRef = await addDoc(collection(db, "UserPost"), value);
            if (docRef.id) {
                setLoading(false);
                Alert.alert('Success!!!', 'Post Added');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Network Request Failed',
                text2: 'Please try again later.',
            });
        }
    }

    return (
        <KeyboardAvoidingView ref={ref} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Add New Post</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/images/sun.png')}
                                style={styles.image}
                            />
                        )}
                    </TouchableOpacity>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder='Title'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="title"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.title && <Text style={styles.errorText}>This is required.</Text>}

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder='Price'
                                keyboardType='number-pad'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="price"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    {errors.price && <Text style={styles.errorText}>This is required.</Text>}

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder='Description'
                                numberOfLines={5}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="desc"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder='Address'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="address"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Picker
                                selectedValue={value}
                                style={styles.input}
                                onValueChange={itemValue => onChange(itemValue)}
                            >
                                {categoryList && categoryList.map((item, index) => (
                                    <Picker.Item key={index} label={item?.name} value={item?.name} />
                                ))}
                            </Picker>
                        )}
                        name="category"
                        defaultValue=""
                    />

                    <TouchableOpacity onPress={handleSubmit(onSubmitMethod)}
                        style={[styles.submitButton, { backgroundColor: loading ? '#ccc' : '#007BFF' }]}
                        disabled={loading}
                    >
                        {loading ?
                            <ActivityIndicator color='#fff' />
                            :
                            <Text style={styles.submitButtonText}>Submit</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
           

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    width: windowWidth * 0.9,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 20,
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});