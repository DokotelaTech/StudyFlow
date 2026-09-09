import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../services/firebase';


export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {

        // Check fields
        if (!email || !password) {
            Alert.alert(
                'Missing information',
                'Please enter your email and password.'
            );
            return;
        }


        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            console.log('Logged in user:', user.uid);

            Alert.alert(
                'Login Successful',
                'Welcome back to StudyFlow!'
            );

            navigation.navigate('Home');

        } catch (error) {

            console.log('Login error:', error);

            Alert.alert(
                'Login failed',
                'Invalid email or password.'
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.loginContainer}>

                <Text style={styles.heading}>
                    Welcome Back
                </Text>

                <Text style={styles.subHeading}>
                    Login to continue using StudyFlow
                </Text>


                <View style={styles.form}>

                    {/* Email */}

                    <Text style={styles.label}>
                        Email
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />


                    {/* Password */}

                    <Text style={styles.label}>
                        Password
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />


                    {/* Login Button */}

                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.8}
                        onPress={handleLogin}
                    >
                        <Text style={styles.btnTxt}>
                            Login
                        </Text>
                    </TouchableOpacity>


                    {/* Signup */}

                    <View style={styles.signupContainer}>

                        <Text style={styles.signupText}>
                            Don't have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Signup')
                            }
                        >
                            <Text style={styles.signupLink}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    loginContainer: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 70,
    },

    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },

    subHeading: {
        fontSize: 15,
        color: '#64748B',
        marginBottom: 40,
        lineHeight: 22,
    },

    form: {
        width: '100%',
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
        marginTop: 15,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#1E293B',
        backgroundColor: '#FFFFFF',
    },

    btn: {
        height: 52,
        backgroundColor: '#4F46E5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    btnTxt: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },

    signupText: {
        color: '#64748B',
        fontSize: 14,
    },

    signupLink: {
        color: '#4F46E5',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 5,
    },

});