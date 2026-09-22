import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
    const user = auth.currentUser;

    // Extracted data to avoid hardcoding values directly in the JSX
    const userStats = [
        { id: 1, value: user?.totalTasks || 48, label: 'Total Tasks', valueColor: '#1A202C' },
        { id: 2, value: user?.completedTasks || 36, label: 'Completed', valueColor: '#059669' },
        { id: 3, value: user?.maxStreak || '18d', label: 'Max Streak', valueColor: '#D97706' }
    ];

    const userSettings = [
        { id: 'notifications', icon: '🔔', title: 'Push Notifications', status: user?.notifications || 'Enabled' },
        { id: 'theme', icon: '🎨', title: 'App Theme', status: user?.theme || 'Light Academic' },
        { id: 'about', icon: 'ℹ️', title: 'About StudyFlow', status: 'v1.4.2' }
    ];

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                
                {/* Profile Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.imageRing}>
                        <Image 
                            style={styles.image} 
                            source={{ uri: user?.photoURL || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg' }} 
                            alt="profile image" 
                        />
                    </View>
                    <Text style={styles.nameText}>{user?.displayName || 'Loading Name...'}</Text>
                    <Text style={styles.emailText}>{user?.email || 'Loading Email...'}</Text>
                </View>

                {/* Stats Section */}
                <View style={styles.statsRow}>
                    {userStats.map((stat) => (
                        <View key={stat.id} style={styles.statCard}>
                            <Text style={[styles.statValue, { color: stat.valueColor }]}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Settings Section */}
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.settingsContainer}>
                    {userSettings.map((setting, index) => (
                        <TouchableOpacity 
                            key={setting.id} 
                            style={[
                                styles.settingRow, 
                                index === userSettings.length - 1 && styles.lastSettingRow
                            ]}
                        >
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>{setting.icon}</Text>
                                <Text style={styles.settingTitle}>{setting.title}</Text>
                            </View>
                            <View style={styles.settingRight}>
                                <Text style={styles.settingStatus}>{setting.status}</Text>
                                <Text style={styles.chevron}>›</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity 
                    style={styles.logoutBtn} 
                    onPress={handleLogout}
                    accessibilityRole="button"
                    accessibilityLabel="Log Out"
                >
                    <Text style={styles.logoutBtnTxt}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F6F9',
    },
    container: {
        padding: 24,
        paddingBottom: 40,
    },
    /* Header Styles */
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    imageRing: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: '#5B42F3',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 44,
        backgroundColor: '#E2E8F0',
    },
    nameText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A202C',
        marginBottom: 4,
    },
    emailText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '400',
    },
    /* Stats Styles */
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginHorizontal: 4,
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    /* Settings Styles */
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 12,
        marginLeft: 4,
    },
    settingsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    lastSettingRow: {
        borderBottomWidth: 0,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        fontSize: 16,
        marginRight: 12,
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A202C',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingStatus: {
        fontSize: 14,
        color: '#94A3B8',
        marginRight: 8,
    },
    chevron: {
        fontSize: 20,
        color: '#CBD5E1',
        lineHeight: 20,
    },
    /* Logout Button Styles */
    logoutBtn: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    logoutBtnTxt: {
        color: '#1E293B',
        fontWeight: '700',
        fontSize: 16,
    }
});