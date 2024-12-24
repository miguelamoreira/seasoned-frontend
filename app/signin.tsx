import React from 'react';
import { Image, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                <TouchableOpacity style={styles.backButton} activeOpacity={0.9} onPress={() => router.push('/')}>
                    <Image source={require('../assets/icons/back.png')} style={styles.buttonIcon}/>
                </TouchableOpacity>
            </Shadow>

            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Sign in</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#FFF4E080"/>
                    </Shadow>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                        <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#FFF4E080" secureTextEntry={true}/>
                    </Shadow>
                </View>
            </View>

            <View style={styles.optionsContainer}>
                <Shadow distance={2} startColor={'#211B17'} offset={[2, 4]}>
                    <TouchableOpacity style={styles.signinButton} activeOpacity={0.9}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </Shadow>
                <Text style={styles.footerText}>
                    Are you new? <Text style={styles.boldText} onPress={() => router.push('/register')}>Create an account</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF4E0',
        paddingHorizontal: 16,
        paddingVertical: 42,
        color: '#211B17',
    },
    backButton: {
        backgroundColor: '#6A4A36',
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: 'center',
    },
    buttonIcon: {
        alignSelf: 'center',
    },
    headingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'DMSerifText',
        fontSize: 40,
        textAlign: 'center',
        lineHeight: 45,
    },
    formContainer: {
        marginTop: 40,
        gap: 24,
    },
    inputGroup: {
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontFamily: 'Arimo',
        marginBottom: 8,
    },
    input: {
        width: 378,
        height: 48,
        paddingHorizontal: 12,
        backgroundColor: '#403127',
        borderRadius: 8,
        color: '#FFF4E0',
        fontSize: 16,
        textAlignVertical: 'center',
    },
    optionsContainer: {
        alignItems: 'center',
        marginTop: 60,
        gap: 20,
    },
    signinButton: {
        backgroundColor: '#D8A84E',
        width: 220,
        paddingVertical: 10,
        borderRadius: 8,
        borderColor: '#211B17',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Arimo',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 16,
        fontFamily: 'Arimo',
        color: '#211B17',
    },
    boldText: {
        fontWeight: '700',
    },
});
