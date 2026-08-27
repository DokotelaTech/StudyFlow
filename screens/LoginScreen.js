import {View, Text,TouchableOpacity, Image, TextInput,StyleSheet } from 'react-native'
// import { TextInput } from 'react-native/types_generated/index'

export default function LoginScreen(){

    return(
        <View>
            <Image style={styles.img} source={{uri: 'https://img.icons8.com/liquid-glass-color/1200/user-male-circle.jpg'}}  alt='profile image'/>
            <Text style={styles.heading}>Welcome Back</Text>

            <Text>
                Username: 
                <TextInput placeholder="username..." />
            </Text>

            <Text>
                Password:
                <TextInput placeholder='password...' />
            </Text>

            <TouchableOpacity>
                <Text>
                    login
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: 120,
        height:  120,
        justifyContent:'flex-start',
        alignContent:'flex-start',
        alignSelf: 'flex-start',        
    },
    heading:{
        fontWeight: '700',
        fontSize: 23,
        fontFamily: 'Poppins'
    }
})