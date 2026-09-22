import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { auth } from '../services/firebase';

export default function HomeScreen({ navigation }) {

    const user = auth.currentUser;

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <View>
                    <Text style={styles.heading}>
                        Hi, {user?.displayName || 'User'} 👋
                    </Text>

                    <Text style={styles.welcome}>
                        Welcome to Dashboard!
                    </Text>
                </View>

                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                    }}
                />

            </View>

            <View style={styles.cardContainer}>

                <View style={styles.card}>
                    <Text style={styles.cardName}>Today's Tasks</Text>
                    <Text style={styles.cardNumber}>0</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardName}>Completed</Text>
                    <Text style={styles.cardNumber}>0</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardName}>Streak</Text>
                    <Text style={styles.cardNumber}>0</Text>
                </View>

            </View>

            <View style={styles.content}>

                <Text style={styles.sectionTitle}>
                    Upcoming Tasks
                </Text>

                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>
                        No upcoming tasks
                    </Text>
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

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 30,
    },

    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 5,
    },

    welcome: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4F46E5',
    },

    image: {
        width: 55,
        height: 55,
        borderRadius: 30,
    },

    cardContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
    },

    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    cardName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        textAlign: 'center',
    },

    cardNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#4F46E5',
        marginTop: 8,
    },

    content: {
        padding: 20,
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 15,
    },

    emptyBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 25,
        alignItems: 'center',
    },

    emptyText: {
        color: '#94A3B8',
        fontSize: 14,
    },

});
