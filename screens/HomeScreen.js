import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { auth } from '../services/firebase';

// Import signOut here
import { signOut } from 'firebase/auth';
export default function HomeScreen({ navigation }) {

    //  Get the current user from Firebase
    const user = auth.currentUser;

    console.log(user.displayName)

    const handleLogout = async () => {

        try{
            await signOut(auth);
            navigation.navigate('Login');
        }catch(error){
            console.log('Logout error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            
                <Text style={styles.heading}>
                    Hi, {user.displayName}

                </Text>

                {/* top 3 card for dshaboard */}
                <View style={styles.cardContainer}>

                    <View style={styles.cards}>
                        <Text style={styles.cardName}>Today's tasks</Text>
                        <Text style={styles.cardNumber}>0</Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={styles.cardName}>Completed</Text>
                        <Text style={styles.cardNumber}>0</Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={styles.cardName}>Streak</Text>
                         <Text style={styles.cardNumber}>0</Text>
                    </View>

                </View>

            <ScrollView>

            <View style={styles.content}>
                
                {/* 🎯 TODO 3: Replace "Student" with the user's displayName */}

                <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                    <Text style={styles.btnTxt}>Log Out</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#F8FAFC'
        },

    content:{ 
        padding:25,
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center'
     },

    heading: { 
        top: 15,
        fontSize: 17,
         fontWeight: '700',
         marginLeft: 16,
        //  fontFamily: 'san'
        color: 'grey'
         },

    btn: {
         height: 52
         , backgroundColor: '#EF4444',
          borderRadius: 10,
           justifyContent: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         },

    btnTxt: {
         color: '#FFFFFF',
          fontSize: 16,
           fontWeight: '700',
         },

    cardContainer: {
        top: 15,
        flexDirection: 'row',
        gap: 15,
        margin: 'auto'
    },
    cards: {
        backgroundColor: "#ebdbdb",
        borderRadius: 10,
        padding: 15,
    },
    cardNumber:{
        fontWeight: 'bold',
        margin: "auto",
        fontSize: 20
    },
    cardName:{
        fontWeight: 'bold',
        margin: "auto",
        fontSize: 14 
       }
});



