import { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Firebase imports
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase'; // Adjust path if needed

// Auth screens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

// Main app screens
import HomeScreen from './screens/HomeScreen';
import SubjectScreen from './screens/SubjectScreen';
import addTaskScreen from './screens/addTaskScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Subjects') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Add Task') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Subjects" options={{ headerShown: false }} component={SubjectScreen} />
      <Tab.Screen name="Add Task" options={{ headerShown: false }} component={addTaskScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Stop the loading spinner once Firebase checks the state
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // Show a loading spinner while Firebase is checking if the user is logged in
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Conditional Rendering: If user exists, show MainApp. Otherwise, show Auth screens */}
        {user ? (
          <Stack.Screen 
            name="MainApp" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}  component={LoginScreen} />
            <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}