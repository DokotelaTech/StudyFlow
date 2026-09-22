import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
// Note: You must import 'db' alongside 'auth' for Firestore to work
import { auth, db } from '../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
    const user = auth.currentUser;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. GUARD: If nobody is logged in, stop immediately.
        if (!user) return;

        // 2. TARGET LOCATION: Tell Firebase exactly which folder (collection) to look in.
        const tasksRef = collection(db, 'tasks');

        // 3. FILTER (QUERY): We don't want ALL tasks in the database. 
        // We only want documents where the 'userId' field exactly matches the logged-in user's ID.
        const userTasksQuery = query(tasksRef, where('userId', '==', user.uid));

        // 4. THE LISTENER: Instead of using 'getDocs' (which fetches data just once), 
        // we use 'onSnapshot'. This opens a live, continuous connection to Firebase. 
        // Every time a task is added, edited, or deleted, Firebase instantly sends a new 'snapshot' to this function.
        const unsubscribe = onSnapshot(userTasksQuery, (snapshot) => {
            
            // Create a temporary empty array to hold the incoming data
            const fetchedTasks = [];
            
            // 5. EXTRACT DATA: Loop through every document in the snapshot
            snapshot.forEach((doc) => {
                // doc.id is the random string Firebase generated (e.g., "aBxY92...")
                // doc.data() is the actual object you saved (title, priority, etc.)
                // We merge them together into one object and push it to our temporary array.
                fetchedTasks.push({ id: doc.id, ...doc.data() });
            });
            
            // 6. UPDATE SCREEN: Save the final array into our React state. 
            // This triggers the screen to re-render and display the tasks in the FlatList.
            setTasks(fetchedTasks);
            setLoading(false); // Turn off the loading spinner
        });

        // 7. CLEANUP: When the user navigates away from the Home Screen, 
        // we call 'unsubscribe' to close the live connection so it doesn't drain memory/battery.
        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    // This function renders your top UI elements (Header + Cards) 
    // We pass this to the FlatList so it scrolls naturally with the tasks.
    const renderHeader = () => (
        <>
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
                        uri: user?.photoURL || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                    }}
                />
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardName}>Total Tasks</Text>
                    {/* Dynamically display the number of tasks fetched */}
                    <Text style={styles.cardNumber}>{tasks.length}</Text>
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

            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <FlatList 
                // data: Points to your state array
                data={tasks}
                // keyExtractor: Tells React Native how to uniquely identify each row
                keyExtractor={(item) => item.id}
                // ListHeaderComponent: Renders everything above the list
                ListHeaderComponent={renderHeader}
                // renderItem: How a single task should look
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskSubject}>{item.subject} • {item.dueDate}</Text>
                        </View>
                        <View style={[styles.priorityBadge, item.priority === 'High' && styles.highPriority]}>
                            <Text style={styles.priorityText}>{item.priority}</Text>
                        </View>
                    </View>
                )}
                // ListEmptyComponent: What to show if the 'tasks' array is empty
                ListEmptyComponent={() => (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>No upcoming tasks</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    listContent: {
        paddingBottom: 40,
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
        marginBottom: 20,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    emptyBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 25,
        marginHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    emptyText: {
        color: '#94A3B8',
        fontSize: 14,
    },
    // New styles for the rendered tasks
    taskItem: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 4,
    },
    taskSubject: {
        fontSize: 12,
        color: '#64748B',
    },
    priorityBadge: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    highPriority: {
        backgroundColor: '#FEE2E2',
    },
    priorityText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
    }
});