import React, { useState } from 'react';
import { 
    Text, 
    ScrollView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
// Adjust this import path if your firebase.js is located elsewhere
import { db, auth } from '../services/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AddTaskScreen({ navigation }) {
    // 1. Add state for all form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 2. Create the submit handler
    const handleAddTask = async () => {
        // Basic validation
        if (!title.trim() || !priority) {
            Alert.alert('Missing Fields', 'Please enter a title and select a priority.');
            return;
        }

        setIsLoading(true);

        try {
            // Get current user ID to associate the task with them (optional but recommended)
            const userId = auth.currentUser?.uid || 'anonymous';

            // 3. Save to Firestore
            await addDoc(collection(db, 'tasks'), {
                userId,
                title: title.trim(),
                description: description.trim(),
                dueDate: dueDate.trim(),
                priority,
                subject: subject.trim(),
                createdAt: serverTimestamp(), // Let Firebase handle the exact time
                isCompleted: false
            });

            Alert.alert('Success', 'Task added successfully!');
            
            // Clear the form after saving
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('');
            setSubject('');
            
            // Optional: navigate back to the previous screen
            // navigation.goBack(); 

        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Could not save the task. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>New Task</Text>

            <Text style={styles.title}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g study for exam..."
                placeholderTextColor="grey"
                value={title}
                onChangeText={setTitle}
                accessibilityLabel="Task Title"
            />

            <Text style={styles.title}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your description..."
                placeholderTextColor="grey"
                value={description}
                onChangeText={setDescription}
                accessibilityLabel="Task Description"
            />

            <Text style={styles.title}>Due Date:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your due date..."
                placeholderTextColor="grey"
                value={dueDate}
                onChangeText={setDueDate}
                accessibilityLabel="Due Date"
            />

            <Text style={styles.title}>Priority level:</Text>
            <View style={styles.priorityContainer} accessibilityRole="radiogroup">
                {['Low', 'Medium', 'High'].map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.level,
                            priority === level && styles.selectedLevel
                        ]}
                        onPress={() => setPriority(level)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: priority === level }}
                        accessibilityLabel={`${level} Priority`}
                    >
                        <Text style={[
                            styles.levelText,
                            priority === level && styles.selectedLevelText
                        ]}>
                            {level}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.title}>Subject:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your subject..."
                placeholderTextColor="grey"
                value={subject}
                onChangeText={setSubject}
                accessibilityLabel="Subject"
            />

            <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddTask}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Add Task"
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.addButtonText}>Add Task</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        marginHorizontal: 10,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontWeight: '600',
        fontSize: 13,
        color: '#575353',
        marginLeft: 10,
        marginBottom: 5,
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
        marginBottom: 10,
    },
    level: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 5,
        paddingVertical: 9,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    selectedLevel: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    levelText: {
        fontWeight: 'bold',
        color: '#475569',
    },
    selectedLevelText: {
        color: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#4F46E5',
        margin: 10,
        marginTop: 20,
        padding: 13,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});