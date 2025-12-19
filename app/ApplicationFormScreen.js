import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  TextInput,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { 
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplicationFormScreen = ({ job, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  
  // Voice guidance states
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState('english'); // 'english' or 'hindi'
  const [isSpeaking, setIsSpeaking] = useState(false);

  const USER_ID = '372e2695-79ad-4547-8627-3e95898938b4';
  const JOB_ID = job.id || 'cc0e8400-e29b-41d4-a716-446655440003';

  useEffect(() => {
    fetchUserData();
    
    // Cleanup function
    return () => {
      Speech.stop();
    };
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get the access token from AsyncStorage
      const token = await AsyncStorage.getItem('@access_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      console.log('Fetching user data with token...');

      const response = await fetch(
        `https://7e3777787c19.ngrok-free.app/api/users/${USER_ID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
        }
      );

      console.log('User data response status:', response.status);

      // Get raw response text first
      const rawText = await response.text();
      console.log('User data raw response:', rawText);

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error(`Server error: ${rawText.substring(0, 100)}`);
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data?.message || data?.detail || 'Failed to fetch user data');
      }

      console.log('User data fetched successfully:', data);
      setUserData(data);
      
      // Play welcome voice guidance after a short delay
      setTimeout(() => {
        if (voiceEnabled) {
          playVoiceGuidance('welcome');
        }
      }, 500);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to load your profile information. Please try again.',
        [{ text: 'OK', onPress: onBack }]
      );
    } finally {
      setLoading(false);
    }
  };

  const playVoiceGuidance = async (type) => {
    if (!voiceEnabled) return;

    const messages = {
      english: {
        welcome: 'Welcome to the application form. Please fill in your cover letter and optionally upload your resume.',
        coverLetter: 'Please enter your cover letter explaining why you are suitable for this position. Write at least 50 characters.',
        resume: 'You can optionally upload your resume document. Tap the upload button to select a PDF or Word document.',
        submit: 'Please review your application carefully before submitting. Make sure your cover letter is complete.',
        resumeAdded: 'Resume uploaded successfully.',
        resumeRemoved: 'Resume removed.',
      },
      hindi: {
        welcome: 'आवेदन पत्र में आपका स्वागत है। कृपया अपना कवर लेटर भरें और वैकल्पिक रूप से अपना रिज्यूमे अपलोड करें।',
        coverLetter: 'कृपया अपना कवर लेटर दर्ज करें जिसमें बताएं कि आप इस पद के लिए उपयुक्त क्यों हैं। कम से कम 50 अक्षर लिखें।',
        resume: 'आप वैकल्पिक रूप से अपना रिज्यूमे दस्तावेज़ अपलोड कर सकते हैं। पीडीएफ या वर्ड दस्तावेज़ चुनने के लिए अपलोड बटन दबाएं।',
        submit: 'कृपया जमा करने से पहले अपने आवेदन की सावधानीपूर्वक समीक्षा करें। सुनिश्चित करें कि आपका कवर लेटर पूर्ण है।',
        resumeAdded: 'रिज्यूमे सफलतापूर्वक अपलोड किया गया।',
        resumeRemoved: 'रिज्यूमे हटा दिया गया।',
      },
    };

    try {
      // Stop any ongoing speech
      await Speech.stop();
      
      const message = messages[language][type];
      const languageCode = language === 'hindi' ? 'hi-IN' : 'en-US';
      
      console.log('Playing voice guidance:', message);
      
      setIsSpeaking(true);
      
      await Speech.speak(message, {
        language: languageCode,
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch (error) {
      console.error('Error playing voice guidance:', error);
      setIsSpeaking(false);
    }
  };

  const stopVoiceGuidance = async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping voice guidance:', error);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success' || !result.canceled) {
        const file = result.assets ? result.assets[0] : result;
        setResume(file);
        Alert.alert('Success', `Resume "${file.name}" selected successfully!`);
        
        if (voiceEnabled) {
          playVoiceGuidance('resumeAdded');
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const removeResume = () => {
    Alert.alert(
      'Remove Resume',
      'Are you sure you want to remove the selected resume?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setResume(null);
            if (voiceEnabled) {
              playVoiceGuidance('resumeRemoved');
            }
          },
        },
      ]
    );
  };

  const validateForm = () => {
    if (!coverLetter.trim()) {
      Alert.alert('Validation Error', 'Please enter a cover letter.');
      return false;
    }

    if (coverLetter.trim().length < 50) {
      Alert.alert('Validation Error', 'Cover letter should be at least 50 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (voiceEnabled) {
      playVoiceGuidance('submit');
    }

    Alert.alert(
      'Submit Application',
      'Are you sure you want to submit your application?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: submitApplication,
        },
      ]
    );
  };

  const submitApplication = async () => {
    try {
      setSubmitting(true);

      // Get the access token from AsyncStorage
      const token = await AsyncStorage.getItem('@access_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Create FormData for multipart/form-data request
      const formData = new FormData();
      
      // CRITICAL FIX: Add the applicant UUID (required ForeignKey field)
      formData.append('applicant', USER_ID);
      
      // Add other required fields
      formData.append('applicant_name', userData.username);
      formData.append('applicant_phone', userData.phone_number);
      formData.append('applicant_email', userData.email);
      formData.append('cover_letter', coverLetter.trim());

      // Add resume if selected (optional field)
      if (resume) {
        formData.append('resume', {
          uri: resume.uri,
          type: resume.mimeType || 'application/pdf',
          name: resume.name,
        });
      }

      console.log('Submitting application...');
      console.log('FormData fields:', {
        applicant: USER_ID,
        applicant_name: userData.username,
        applicant_phone: userData.phone_number,
        applicant_email: userData.email,
        cover_letter_length: coverLetter.trim().length,
        has_resume: !!resume,
      });

      const response = await fetch(
        `https://7e3777787c19.ngrok-free.app/api/job-vacancies/${JOB_ID}/apply/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            // Don't set Content-Type for FormData, let the browser set it with boundary
          },
          body: formData,
        }
      );

      console.log('Application response status:', response.status);

      // Get raw response text first
      const rawText = await response.text();
      console.log('Application raw response:', rawText);

      // Try to parse JSON
      let result;
      try {
        result = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        if (response.ok) {
          // If response is OK but not JSON, consider it success
          result = { message: 'Application submitted successfully' };
        } else {
          throw new Error(`Server error: ${rawText.substring(0, 100)}`);
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(result?.message || result?.detail || 'Failed to submit application');
      }
      
      Alert.alert(
        'Success',
        'Your application has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSuccess) onSuccess();
              onBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert(
        'Submission Failed',
        error.message || 'Failed to submit your application. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading your information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application Form</Text>
        <TouchableOpacity 
          onPress={isSpeaking ? stopVoiceGuidance : null}
          style={styles.headerRight}
        >
          {isSpeaking && (
            <MaterialCommunityIcons name="volume-high" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
          {/* Job Info Banner */}
          <View style={styles.jobBanner}>
            <MaterialCommunityIcons name="briefcase" size={24} color="#1E3A8A" />
            <View style={styles.jobBannerText}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDepartment}>{job.department}</Text>
            </View>
          </View>

          {/* Voice Guidance Controls */}
          <View style={styles.voiceControlsContainer}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
              <Text style={styles.sectionTitle}>Voice Guidance</Text>
            </View>
            
            <View style={styles.voiceControls}>
              {/* Voice On/Off */}
              <View style={styles.controlRow}>
                <View style={styles.controlLabel}>
                  <MaterialCommunityIcons 
                    name={voiceEnabled ? "volume-high" : "volume-off"} 
                    size={20} 
                    color="#1E3A8A" 
                  />
                  <Text style={styles.controlText}>Enable Voice</Text>
                </View>
                <Switch
                  value={voiceEnabled}
                  onValueChange={(value) => {
                    setVoiceEnabled(value);
                    if (!value) {
                      stopVoiceGuidance();
                    }
                  }}
                  trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                  thumbColor={voiceEnabled ? '#1E3A8A' : '#64748B'}
                />
              </View>

              {/* Language Selection */}
              <View style={styles.controlRow}>
                <View style={styles.controlLabel}>
                  <MaterialCommunityIcons name="translate" size={20} color="#1E3A8A" />
                  <Text style={styles.controlText}>Language</Text>
                </View>
                <View style={styles.languageButtons}>
                  <TouchableOpacity
                    style={[
                      styles.languageButton,
                      language === 'english' && styles.languageButtonActive
                    ]}
                    onPress={() => {
                      setLanguage('english');
                      stopVoiceGuidance();
                    }}
                  >
                    <Text style={[
                      styles.languageButtonText,
                      language === 'english' && styles.languageButtonTextActive
                    ]}>
                      English
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.languageButton,
                      language === 'hindi' && styles.languageButtonActive
                    ]}
                    onPress={() => {
                      setLanguage('hindi');
                      stopVoiceGuidance();
                    }}
                  >
                    <Text style={[
                      styles.languageButtonText,
                      language === 'hindi' && styles.languageButtonTextActive
                    ]}>
                      हिंदी
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {isSpeaking && (
              <TouchableOpacity 
                style={styles.stopSpeakingButton}
                onPress={stopVoiceGuidance}
              >
                <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
                <Text style={styles.stopSpeakingText}>Stop Voice</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Personal Information (Non-editable) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="account" size={20} color="#1E3A8A" />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{userData.username}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{userData.phone_number}</Text>
              </View>
            </View>
            <Text style={styles.helperText}>
              This information cannot be edited
            </Text>
          </View>

          {/* Cover Letter */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="file-document-edit" size={20} color="#1E3A8A" />
              <Text style={styles.sectionTitle}>Cover Letter *</Text>
            </View>
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('coverLetter')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={18} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                Tap for voice guidance
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textArea}
              placeholder="Explain why you are suitable for this position..."
              placeholderTextColor="#94A3B8"
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
            <Text style={styles.characterCount}>
              {coverLetter.length} characters (minimum 50)
            </Text>
          </View>

          {/* Resume Upload */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="file-upload" size={20} color="#1E3A8A" />
              <Text style={styles.sectionTitle}>Resume (Optional)</Text>
            </View>
            
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('resume')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={18} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                Tap for voice guidance
              </Text>
            </TouchableOpacity>
            
            {!resume ? (
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={pickDocument}
              >
                <MaterialCommunityIcons name="cloud-upload" size={32} color="#1E3A8A" />
                <Text style={styles.uploadButtonText}>Upload Resume</Text>
                <Text style={styles.uploadButtonSubtext}>
                  PDF, DOC, or DOCX (Max 10MB)
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.fileCard}>
                <View style={styles.fileInfo}>
                  <MaterialCommunityIcons name="file-document" size={40} color="#10B981" />
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {resume.name}
                    </Text>
                    <Text style={styles.fileSize}>
                      {resume.size ? `${(resume.size / 1024).toFixed(2)} KB` : 'Unknown size'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeResume}
                >
                  <MaterialCommunityIcons name="close-circle" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton,
              submitting && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={submitting}
            activeOpacity={0.8}
          >
            {submitting ? (
              <>
                <ActivityIndicator size="small" color="#FFF" />
                <Text style={styles.submitButtonText}>Submitting...</Text>
              </>
            ) : (
              <>
                <MaterialCommunityIcons name="send" size={20} color="#FFF" />
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E3A8A',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
  jobBanner: {
    backgroundColor: '#DBEAFE',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  jobBannerText: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  jobDepartment: {
    fontSize: 14,
    color: '#3B82F6',
  },
  voiceControlsContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  voiceControls: {
    gap: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '600',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  languageButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  languageButtonTextActive: {
    color: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    fontStyle: 'italic',
  },
  voiceHintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  voiceHintText: {
    fontSize: 13,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#0F172A',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'right',
  },
  uploadButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 8,
  },
  uploadButtonSubtext: {
    fontSize: 13,
    color: '#64748B',
  },
  fileCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 13,
    color: '#64748B',
  },
  removeButton: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 24,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopSpeakingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  stopSpeakingText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  voiceHintTextDisabled: {
    color: '#CBD5E1',
  },
});

export default ApplicationFormScreen;