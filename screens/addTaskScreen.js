import React, { useState } from 'react';
import { 
    Text, 
    ScrollView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    View
} from 'react-native';

export default function addTaskScreen() {

    const [priority, setPriority] = useState('');

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.heading}>New Task</Text>

            <Text style={styles.title}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g study for exam..."
                placeholderTextColor="grey"
                accessibilityLabel="Task Title"
                accessibilityHint="Enter the title of the task"
            />

            <Text style={styles.title}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your description..."
                placeholderTextColor="grey"
                accessibilityLabel="Task Description"
                accessibilityHint="Enter the description of the task"
            />

            <Text style={styles.title}>Due Date:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your due date..."
                placeholderTextColor="grey"
                accessibilityLabel="Due Date"
                accessibilityHint="Enter the due date for the task"
            />

            <Text style={styles.title}>Priority level:</Text>

            <View style={styles.priorityContainer} accessibilityRole="radiogroup">

                <TouchableOpacity
                    style={[
                        styles.level,
                        priority === 'Low' && styles.selectedLevel
                    ]}
                    onPress={() => setPriority('Low')}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: priority === 'Low' }}
                    accessibilityLabel="Low Priority"
                >
                    <Text style={styles.levelText}>Low</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.level,
                        priority === 'Medium' && styles.selectedLevel
                    ]}
                    onPress={() => setPriority('Medium')}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: priority === 'Medium' }}
                    accessibilityLabel="Medium Priority"
                >
                    <Text style={styles.levelText}>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.level,
                        priority === 'High' && styles.selectedLevel
                    ]}
                    onPress={() => setPriority('High')}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: priority === 'High' }}
                    accessibilityLabel="High Priority"
                >
                    <Text style={styles.levelText}>High</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.title}>Subject:</Text>
            <TextInput
                style={styles.input}
                placeholder="please enter your subject..."
                placeholderTextColor="grey"
                accessibilityLabel="Subject"
                accessibilityHint="Enter the subject for the task"
            />

            <TouchableOpacity 
                style={styles.addButton}
                accessibilityRole="button"
                accessibilityLabel="Add Task"
                accessibilityHint="Saves the new task"
            >
                <Text style={styles.addButtonText}>Add Task</Text>
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
        margin: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },

    title: {
        fontWeight: '600',
        fontSize: 13,
        color: '#575353',
        marginLeft: 10,
    },

    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 15,
    },

    level: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 5,
        paddingVertical: 9,
        paddingHorizontal: 25,
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

    addButton: {
        backgroundColor: '#4F46E5',
        margin: 10,
        padding: 13,
        borderRadius: 8,
        alignItems: 'center',
    },

    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },

});
