import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';

import { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from '../services/firebase';


export default function SignupScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {

        //Validation, Check if fields are empty
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Missing information', 'Please fill in all fields.');
            return;
        }

        // Validation, Check passwords
        if (password !== confirmPassword) {
            Alert.alert('Password mismatch', 'Passwords do not match.');
            return;
        }

        try {
            // 1. Create the user first
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            const user = userCredential.user;
            
            // 2. Immediately update the profile with the username
            await updateProfile(user, {
                displayName: username
            });
            
            console.log('User created:', user.uid);
            console.log('Username saved as:', user.displayName);
            
            // 3. Show success and navigate
            Alert.alert(
                'Account Created',
                'Your StudyFlow account has been created!'
            );
            
            navigation.navigate('Home');
            
        } catch (error) {
            // 4. Handle any errors ONLY here
            console.log('Signup error:', error);
            Alert.alert('Signup failed', `${error.code}\n\n${error.message}`);
        }
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.signupContainer}>

                <Text style={styles.heading}>
                    Create an Account
                </Text>

                <Text style={styles.subHeading}>
                    Sign up to get started with StudyFlow
                </Text>


                <View style={styles.form}>

                    {/* Username */}

                    <Text style={styles.label}>
                        Username
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="#9CA3AF"
                        value={username}
                        onChangeText={setUsername}
                    />


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


                    {/* Confirm Password */}

                    <Text style={styles.label}>
                        Confirm Password
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />


                    {/* Sign Up Button */}

                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.8}
                        onPress={handleSignup}
                    >
                        <Text style={styles.btnTxt}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>


                    {/* Login */}

                    <View style={styles.loginContainer}>

                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Login')
                            }
                        >
                            <Text style={styles.loginLink}>
                                Login
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    signupContainer: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 50,
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
        marginBottom: 35,
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

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },

    loginText: {
        color: '#64748B',
        fontSize: 14,
    },

    loginLink: {
        color: '#4F46E5',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 5,
    },

});