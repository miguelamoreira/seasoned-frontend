import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export default function DataTab() {
    const [email, setEmail] = useState("email@email.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            console.log("New password and confirmation do not match.");
            return;
        }

        console.log("Success", "Changes saved successfully.");
    };

    const handleDeleteAccount = () => {
        console.log("Your account has been deleted.");
    };

    const handleLogout = () => {
        console.log("You have been logged out.");
    };

    return (
        <View>
            <Text style={styles.heading}>Personal data</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#FFF4E080"/>
                </Shadow>
            </View>

            <Text style={styles.heading}>Change password</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Password</Text>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TextInput style={styles.input} secureTextEntry={true} value={currentPassword} onChangeText={setCurrentPassword} placeholder="*****" placeholderTextColor="#FFF4E080"/>
                </Shadow>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TextInput style={styles.input} secureTextEntry={true} value={newPassword} onChangeText={setNewPassword} placeholder="*****" placeholderTextColor="#FFF4E080"/>
                </Shadow>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="*****" placeholderTextColor="#FFF4E080"/>
                </Shadow>
            </View>

            <View style={styles.buttonsContainer}>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TouchableOpacity style={[styles.button, styles.deleteAccountButton]} onPress={handleDeleteAccount}>
                        <Text style={styles.buttonText}>Delete account</Text>
                    </TouchableOpacity>
                </Shadow>

                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </Shadow>
            </View>

            <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                <TouchableOpacity style={[styles.logoutButton]} activeOpacity={0.9} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </Shadow>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontFamily: 'DMSerifText',
        marginVertical: 16,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontFamily: 'Arimo'
    },
    input: {
        width: 378,
        height: 48,
        paddingHorizontal: 12,
        backgroundColor: '#403127',
        borderRadius: 8,
        color: '#FFF4E0',
        fontSize: 16,
        fontFamily: 'Arimo',
        textAlignVertical: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginVertical: 24,
    },  
    button: {
        borderWidth: 2,
        borderColor: '#211B17',
        borderRadius: 8,
        height: 40, 
        justifyContent: 'center',
    },
    buttonText: {
        color: '#211B17',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Arimo',
        paddingVertical: 8
    },
    deleteAccountButton: {
        backgroundColor: '#EE6363',
        width: 180,
        height: 48,
    },
    saveButton: {
        backgroundColor: '#D8A84E',
        width: 180,
        height: 48,
    },
    logoutButton: {
        backgroundColor: '#EBCE97',
        borderWidth: 2,
        borderColor: '#211B17',
        borderRadius: 8,
    },
});