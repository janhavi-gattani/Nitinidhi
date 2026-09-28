// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   Platform,
//   Alert,
//   ActivityIndicator,
//   Switch,
//   Modal,
// } from 'react-native';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// import * as Speech from 'expo-speech';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ComplaintFormScreen = ({ onBack, onSuccess }) => {
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [userData, setUserData] = useState(null);
  
//   // Form fields
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [categoryLabel, setCategoryLabel] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [locationLabel, setLocationLabel] = useState('');
//   const [isUrban, setIsUrban] = useState(false);

//   // Dropdown states
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);

//   // Voice guidance states
//   const [voiceEnabled, setVoiceEnabled] = useState(true);
//   const [language, setLanguage] = useState('english'); // 'english' or 'hindi'
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const USER_ID = '372e2695-79ad-4547-8627-3e95898938b4';

//   // Category options
//   const CATEGORIES = [
//     { value: 'water_supply', label: 'Water Supply' },
//     { value: 'sanitation', label: 'Sanitation' },
//     { value: 'electricity', label: 'Electricity' },
//     { value: 'roads', label: 'Roads & Infrastructure' },
//     { value: 'healthcare', label: 'Healthcare' },
//     { value: 'education', label: 'Education' },
//     { value: 'agriculture', label: 'Agriculture' },
//     { value: 'public_safety', label: 'Public Safety' },
//     { value: 'welfare_schemes', label: 'Welfare Schemes' },
//     { value: 'land_disputes', label: 'Land Disputes' },
//   ];

//   // Location options
//   const LOCATIONS = [
//     { id: 'a4a7c926-440b-452a-b14f-90602555117b', name: 'Ambegaon' },
//     { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Baramati' },
//     { id: 'd4b567f8-4ec4-4332-8d16-91a89cdae82e', name: 'Bhor' },
//     { id: 'e54ffd2b-a5eb-4c43-bba9-6cce694f034a', name: 'Daund' },
//     { id: '8b9e0ada-585f-4706-abd8-ba71bbc58dc2', name: 'Haveli' },
//     { id: '9d309ddd-9bd1-476b-b6a8-44ccecb7cda0', name: 'Indapur' },
//     { id: 'bb5ee307-05c5-41eb-9c4c-f2b75475495c', name: 'Junnar' },
//     { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Khed' },
//     { id: 'a4d6b520-0d8c-4646-bbde-4131accfcad0', name: 'Malegaon' },
//     { id: '7cc11935-1954-4b1e-81b2-5a50f4f6f68b', name: 'Maval' },
//     { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Mulshi' },
//     { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Pune City' },
//     { id: '42c89214-b48d-4893-86d1-ac868b24c5a0', name: 'Purandhar' },
//     { id: '88af3126-7492-4c6d-941d-24876fbd97ab', name: 'Rajgurunagar' },
//     { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Shirur' },
//     { id: '69b00002-26fb-4e6b-8510-6bda902299ca', name: 'Velhe' },
//   ];

//   useEffect(() => {
//     fetchUserData();
    
//     // Cleanup function
//     return () => {
//       Speech.stop();
//     };
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
      
//       // Get the access token from AsyncStorage
//       const token = await AsyncStorage.getItem('@access_token');
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.');
//       }

//       console.log('Fetching user data with token...');

//       const response = await fetch(
//         `https://fe7a9c807ba2.ngrok-free.app/api/users/${USER_ID}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//             'ngrok-skip-browser-warning': 'true'
//           },
//         }
//       );

//       console.log('User data response status:', response.status);

//       // Get raw response text first
//       const rawText = await response.text();
//       console.log('User data raw response:', rawText);

//       // Try to parse JSON
//       let data;
//       try {
//         data = JSON.parse(rawText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         throw new Error(`Server error: ${rawText.substring(0, 100)}`);
//       }

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Session expired. Please login again.');
//         }
//         throw new Error(data?.message || data?.detail || 'Failed to fetch user data');
//       }

//       console.log('User data fetched successfully:', data);
//       setUserData(data);
      
//       // Play welcome voice guidance after a short delay
//       setTimeout(() => {
//         if (voiceEnabled) {
//           playVoiceGuidance('welcome');
//         }
//       }, 500);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       Alert.alert(
//         'Error',
//         error.message || 'Failed to load your profile information. Please try again.',
//         [{ text: 'OK', onPress: onBack }]
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const playVoiceGuidance = async (type) => {
//     if (!voiceEnabled) return;

//     const messages = {
//       english: {
//         welcome: 'Welcome to the complaint form. Please fill in all required fields to submit your complaint.',
//         title: 'Enter a brief title that summarizes your complaint.',
//         category: 'Select the category that best matches your complaint from the dropdown list.',
//         location: 'Select your location from the dropdown list.',
//         description: 'Provide a detailed description of your complaint. Write at least 20 characters.',
//         submit: 'Please review your complaint carefully before submitting. Make sure all required fields are filled.',
//         categorySelected: 'Category selected.',
//         locationSelected: 'Location selected.',
//       },
//       hindi: {
//         welcome: 'शिकायत फॉर्म में आपका स्वागत है। कृपया अपनी शिकायत सबमिट करने के लिए सभी आवश्यक फ़ील्ड भरें।',
//         title: 'एक संक्षिप्त शीर्षक दर्ज करें जो आपकी शिकायत का सारांश देता है।',
//         category: 'ड्रॉपडाउन सूची से वह श्रेणी चुनें जो आपकी शिकायत से सबसे अच्छी तरह मेल खाती है।',
//         location: 'ड्रॉपडाउन सूची से अपना स्थान चुनें।',
//         description: 'अपनी शिकायत का विस्तृत विवरण प्रदान करें। कम से कम 20 अक्षर लिखें।',
//         submit: 'कृपया जमा करने से पहले अपनी शिकायत की सावधानीपूर्वक समीक्षा करें। सुनिश्चित करें कि सभी आवश्यक फ़ील्ड भरे गए हैं।',
//         categorySelected: 'श्रेणी चयनित।',
//         locationSelected: 'स्थान चयनित।',
//       },
//     };

//     try {
//       // Stop any ongoing speech
//       await Speech.stop();
      
//       const message = messages[language][type];
//       const languageCode = language === 'hindi' ? 'hi-IN' : 'en-US';
      
//       console.log('Playing voice guidance:', message);
      
//       setIsSpeaking(true);
      
//       await Speech.speak(message, {
//         language: languageCode,
//         pitch: 1.0,
//         rate: 0.9,
//         onDone: () => setIsSpeaking(false),
//         onStopped: () => setIsSpeaking(false),
//         onError: () => setIsSpeaking(false),
//       });
//     } catch (error) {
//       console.error('Error playing voice guidance:', error);
//       setIsSpeaking(false);
//     }
//   };

//   const stopVoiceGuidance = async () => {
//     try {
//       await Speech.stop();
//       setIsSpeaking(false);
//     } catch (error) {
//       console.error('Error stopping voice guidance:', error);
//     }
//   };

//   const handleCategorySelect = (value, label) => {
//     setCategory(value);
//     setCategoryLabel(label);
//     setShowCategoryDropdown(false);
//     if (voiceEnabled) {
//       playVoiceGuidance('categorySelected');
//     }
//   };

//   const handleLocationSelect = (id, name) => {
//     setLocation(id);
//     setLocationLabel(name);
//     setShowLocationDropdown(false);
    
//     // Determine if location is urban (Pune City is urban)
//     setIsUrban(id === '550e8400-e29b-41d4-a716-446655440001');
    
//     if (voiceEnabled) {
//       playVoiceGuidance('locationSelected');
//     }
//   };

//   const validateForm = () => {
//     if (!title.trim()) {
//       Alert.alert('Validation Error', 'Please enter a complaint title.');
//       return false;
//     }

//     if (!category) {
//       Alert.alert('Validation Error', 'Please select a category.');
//       return false;
//     }

//     if (!location) {
//       Alert.alert('Validation Error', 'Please select a location.');
//       return false;
//     }

//     if (!description.trim()) {
//       Alert.alert('Validation Error', 'Please enter a description.');
//       return false;
//     }

//     if (description.trim().length < 20) {
//       Alert.alert('Validation Error', 'Description should be at least 20 characters long.');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     if (voiceEnabled) {
//       playVoiceGuidance('submit');
//     }

//     Alert.alert(
//       'Submit Complaint',
//       'Are you sure you want to submit your complaint?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Submit',
//           onPress: submitComplaint,
//         },
//       ]
//     );
//   };

//   const submitComplaint = async () => {
//     try {
//       setSubmitting(true);

//       // Get the access token from AsyncStorage
//       const token = await AsyncStorage.getItem('@access_token');
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.');
//       }

//       const complaintData = {
//         title: title.trim(),
//         description: description.trim(),
//         category: category,
//         location: location,
//         citizen_name: userData.username,
//         citizen_phone: userData.phone_number,
//         is_urban: isUrban,
//       };

//       console.log('Submitting complaint:', complaintData);

//       const response = await fetch(
//         'https://fe7a9c807ba2.ngrok-free.app/api/complaints/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json',
//             'ngrok-skip-browser-warning': 'true',
//           },
//           body: JSON.stringify(complaintData),
//         }
//       );

//       console.log('Complaint response status:', response.status);

//       // Get raw response text first
//       const rawText = await response.text();
//       console.log('Complaint raw response:', rawText);

//       // Try to parse JSON
//       let result;
//       try {
//         result = JSON.parse(rawText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         if (response.ok) {
//           // If response is OK but not JSON, consider it success
//           result = { message: 'Complaint submitted successfully' };
//         } else {
//           throw new Error(`Server error: ${rawText.substring(0, 100)}`);
//         }
//       }

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Session expired. Please login again.');
//         }
//         throw new Error(result?.message || result?.detail || 'Failed to submit complaint');
//       }
      
//       Alert.alert(
//         'Success',
//         'Your complaint has been submitted successfully!',
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               if (onSuccess) onSuccess();
//               onBack();
//             },
//           },
//         ]
//       );
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       Alert.alert(
//         'Submission Failed',
//         error.message || 'Failed to submit your complaint. Please try again.',
//         [{ text: 'OK' }]
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#1E3A8A" />
//           <Text style={styles.loadingText}>Loading your information...</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <TouchableOpacity onPress={onBack} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="#FFF" />
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>File a Complaint</Text>

//           <TouchableOpacity 
//             onPress={isSpeaking ? stopVoiceGuidance : null}
//             style={styles.headerActions}
//           >
//             {isSpeaking && (
//               <MaterialCommunityIcons name="volume-high" size={24} color="#FFF" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Scrollable Form Content */}
//       <ScrollView 
//         style={styles.content} 
//         contentContainerStyle={styles.scrollContent} 
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={styles.pageTitle}>File a new Complaint</Text>

//         {/* Voice Guidance Controls */}
//         <View style={styles.voiceControlsContainer}>
//           <View style={styles.sectionHeader}>
//             <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
//             <Text style={styles.sectionTitle}>Voice Guidance</Text>
//           </View>
          
//           <View style={styles.voiceControls}>
//             {/* Voice On/Off */}
//             <View style={styles.controlRow}>
//               <View style={styles.controlLabel}>
//                 <MaterialCommunityIcons 
//                   name={voiceEnabled ? "volume-high" : "volume-off"} 
//                   size={20} 
//                   color="#1E3A8A" 
//                 />
//                 <Text style={styles.controlText}>Enable Voice</Text>
//               </View>
//               <Switch
//                 value={voiceEnabled}
//                 onValueChange={(value) => {
//                   setVoiceEnabled(value);
//                   if (!value) {
//                     stopVoiceGuidance();
//                   }
//                 }}
//                 trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
//                 thumbColor={voiceEnabled ? '#1E3A8A' : '#64748B'}
//               />
//             </View>

//             {/* Language Selection */}
//             <View style={styles.controlRow}>
//               <View style={styles.controlLabel}>
//                 <MaterialCommunityIcons name="translate" size={20} color="#1E3A8A" />
//                 <Text style={styles.controlText}>Language</Text>
//               </View>
//               <View style={styles.languageButtons}>
//                 <TouchableOpacity
//                   style={[
//                     styles.languageButton,
//                     language === 'english' && styles.languageButtonActive
//                   ]}
//                   onPress={() => {
//                     setLanguage('english');
//                     stopVoiceGuidance();
//                   }}
//                 >
//                   <Text style={[
//                     styles.languageButtonText,
//                     language === 'english' && styles.languageButtonTextActive
//                   ]}>
//                     English
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.languageButton,
//                     language === 'hindi' && styles.languageButtonActive
//                   ]}
//                   onPress={() => {
//                     setLanguage('hindi');
//                     stopVoiceGuidance();
//                   }}
//                 >
//                   <Text style={[
//                     styles.languageButtonText,
//                     language === 'hindi' && styles.languageButtonTextActive
//                   ]}>
//                     हिंदी
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           {isSpeaking && (
//             <TouchableOpacity 
//               style={styles.stopSpeakingButton}
//               onPress={stopVoiceGuidance}
//             >
//               <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
//               <Text style={styles.stopSpeakingText}>Stop Voice</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Personal Information (Non-editable) */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <MaterialCommunityIcons name="account" size={20} color="#1E3A8A" />
//             <Text style={styles.sectionTitle}>Your Information</Text>
//           </View>
          
//           <View style={styles.infoCard}>
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Name</Text>
//               <Text style={styles.infoValue}>{userData.username}</Text>
//             </View>
//             <View style={styles.divider} />
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Phone</Text>
//               <Text style={styles.infoValue}>{userData.phone_number}</Text>
//             </View>
//           </View>
//           <Text style={styles.helperText}>
//             This information cannot be edited
//           </Text>
//         </View>

//         <View style={styles.formCard}>
//           {/* Title Input */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Title: *</Text>
//             <TouchableOpacity
//               style={styles.voiceHintButton}
//               onPress={() => playVoiceGuidance('title')}
//               disabled={!voiceEnabled}
//             >
//               <MaterialCommunityIcons 
//                 name="help-circle" 
//                 size={16} 
//                 color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
//               />
//               <Text style={[
//                 styles.voiceHintText,
//                 !voiceEnabled && styles.voiceHintTextDisabled
//               ]}>
//                 Tap for voice guidance
//               </Text>
//             </TouchableOpacity>
//             <TextInput 
//               style={styles.input} 
//               placeholderTextColor="#9CA3AF"
//               placeholder="Enter complaint title"
//               value={title}
//               onChangeText={setTitle}
//             />
//           </View>

//           {/* Category Dropdown */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Category: *</Text>
//             <TouchableOpacity
//               style={styles.voiceHintButton}
//               onPress={() => playVoiceGuidance('category')}
//               disabled={!voiceEnabled}
//             >
//               <MaterialCommunityIcons 
//                 name="help-circle" 
//                 size={16} 
//                 color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
//               />
//               <Text style={[
//                 styles.voiceHintText,
//                 !voiceEnabled && styles.voiceHintTextDisabled
//               ]}>
//                 Tap for voice guidance
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.dropdownInput}
//               onPress={() => setShowCategoryDropdown(true)}
//             >
//               <Text style={categoryLabel ? styles.dropdownText : styles.dropdownPlaceholder}>
//                 {categoryLabel || 'Select category'}
//               </Text>
//               <Ionicons name="chevron-down" size={20} color="#4B5563" />
//             </TouchableOpacity>
//           </View>

//           {/* Location Dropdown */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Location: *</Text>
//             <TouchableOpacity
//               style={styles.voiceHintButton}
//               onPress={() => playVoiceGuidance('location')}
//               disabled={!voiceEnabled}
//             >
//               <MaterialCommunityIcons 
//                 name="help-circle" 
//                 size={16} 
//                 color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
//               />
//               <Text style={[
//                 styles.voiceHintText,
//                 !voiceEnabled && styles.voiceHintTextDisabled
//               ]}>
//                 Tap for voice guidance
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={styles.dropdownInput}
//               onPress={() => setShowLocationDropdown(true)}
//             >
//               <Text style={locationLabel ? styles.dropdownText : styles.dropdownPlaceholder}>
//                 {locationLabel || 'Select location'}
//               </Text>
//               <Ionicons name="chevron-down" size={20} color="#4B5563" />
//             </TouchableOpacity>
//           </View>

//           {/* Description Input */}
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Description: *</Text>
//             <TouchableOpacity
//               style={styles.voiceHintButton}
//               onPress={() => playVoiceGuidance('description')}
//               disabled={!voiceEnabled}
//             >
//               <MaterialCommunityIcons 
//                 name="help-circle" 
//                 size={16} 
//                 color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
//               />
//               <Text style={[
//                 styles.voiceHintText,
//                 !voiceEnabled && styles.voiceHintTextDisabled
//               ]}>
//                 Tap for voice guidance
//               </Text>
//             </TouchableOpacity>
//             <TextInput 
//               style={[styles.input, styles.textArea]} 
//               multiline 
//               numberOfLines={4}
//               textAlignVertical="top"
//               placeholderTextColor="#9CA3AF"
//               placeholder="Describe your complaint in detail..."
//               value={description}
//               onChangeText={setDescription}
//             />
//             <Text style={styles.characterCount}>
//               {description.length} characters (minimum 20)
//             </Text>
//           </View>
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity 
//           style={[
//             styles.submitBtn,
//             submitting && styles.submitBtnDisabled
//           ]}
//           activeOpacity={0.8}
//           onPress={handleSubmit}
//           disabled={submitting}
//         >
//           {submitting ? (
//             <>
//               <ActivityIndicator size="small" color="#FFF" />
//               <Text style={styles.submitBtnText}>Submitting...</Text>
//             </>
//           ) : (
//             <>
//               <MaterialCommunityIcons name="send" size={20} color="#FFF" />
//               <Text style={styles.submitBtnText}>Submit</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <View style={{height: 40}} />
//       </ScrollView>

//       {/* Category Dropdown Modal */}
//       <Modal
//         visible={showCategoryDropdown}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowCategoryDropdown(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setShowCategoryDropdown(false)}
//         >
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Category</Text>
//               <TouchableOpacity onPress={() => setShowCategoryDropdown(false)}>
//                 <Ionicons name="close" size={24} color="#1E3A8A" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.modalList}>
//               {CATEGORIES.map((cat) => (
//                 <TouchableOpacity
//                   key={cat.value}
//                   style={[
//                     styles.modalItem,
//                     category === cat.value && styles.modalItemSelected
//                   ]}
//                   onPress={() => handleCategorySelect(cat.value, cat.label)}
//                 >
//                   <Text style={[
//                     styles.modalItemText,
//                     category === cat.value && styles.modalItemTextSelected
//                   ]}>
//                     {cat.label}
//                   </Text>
//                   {category === cat.value && (
//                     <Ionicons name="checkmark" size={20} color="#1E3A8A" />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Location Dropdown Modal */}
//       <Modal
//         visible={showLocationDropdown}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowLocationDropdown(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setShowLocationDropdown(false)}
//         >
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Location</Text>
//               <TouchableOpacity onPress={() => setShowLocationDropdown(false)}>
//                 <Ionicons name="close" size={24} color="#1E3A8A" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView style={styles.modalList}>
//               {LOCATIONS.map((loc) => (
//                 <TouchableOpacity
//                   key={loc.id}
//                   style={[
//                     styles.modalItem,
//                     location === loc.id && styles.modalItemSelected
//                   ]}
//                   onPress={() => handleLocationSelect(loc.id, loc.name)}
//                 >
//                   <Text style={[
//                     styles.modalItemText,
//                     location === loc.id && styles.modalItemTextSelected
//                   ]}>
//                     {loc.name}
//                   </Text>
//                   {location === loc.id && (
//                     <Ionicons name="checkmark" size={20} color="#1E3A8A" />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* Static AI Button */}
//       <View style={styles.fab}>
//         <View style={styles.fabInner}>
//           <Text style={styles.fabAiText}>AI</Text>
//           <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   header: {
//     backgroundColor: '#1E3A8A',
//     paddingTop: Platform.OS === 'android' ? 40 : 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   headerActions: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 24,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#64748B',
//   },
//   pageTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     marginBottom: 16,
//   },
//   voiceControlsContainer: {
//     backgroundColor: '#FFF',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   voiceControls: {
//     gap: 16,
//   },
//   controlRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   controlLabel: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   controlText: {
//     fontSize: 16,
//     color: '#0F172A',
//     fontWeight: '600',
//   },
//   languageButtons: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   languageButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#F1F5F9',
//     borderWidth: 1,
//     borderColor: '#CBD5E1',
//   },
//   languageButtonActive: {
//     backgroundColor: '#1E3A8A',
//     borderColor: '#1E3A8A',
//   },
//   languageButtonText: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '600',
//   },
//   languageButtonTextActive: {
//     color: '#FFF',
//   },
//   stopSpeakingButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     marginTop: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#FEE2E2',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#FCA5A5',
//   },
//   stopSpeakingText: {
//     fontSize: 14,
//     color: '#EF4444',
//     fontWeight: '600',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//   },
//   infoCard: {
//     backgroundColor: '#FFF',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#64748B',
//     fontWeight: '600',
//   },
//   infoValue: {
//     fontSize: 15,
//     color: '#0F172A',
//     fontWeight: '500',
//     flex: 1,
//     textAlign: 'right',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 4,
//   },
//   helperText: {
//     fontSize: 12,
//     color: '#64748B',
//     marginTop: 8,
//     fontStyle: 'italic',
//   },
//   formCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#4B5563',
//     marginBottom: 6,
//     marginLeft: 4,
//   },
//   voiceHintButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     marginBottom: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     backgroundColor: '#DBEAFE',
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   voiceHintText: {
//     fontSize: 12,
//     color: '#1E3A8A',
//     fontWeight: '600',
//   },
//   voiceHintTextDisabled: {
//     color: '#CBD5E1',
//   },
//   input: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     height: 48,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: '#1F2937',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   dropdownInput: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     height: 48,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#1F2937',
//     flex: 1,
//   },
//   dropdownPlaceholder: {
//     fontSize: 16,
//     color: '#9CA3AF',
//     flex: 1,
//   },
//   textArea: {
//     height: 112,
//     paddingTop: 12,
//   },
//   characterCount: {
//     fontSize: 12,
//     color: '#64748B',
//     marginTop: 8,
//     textAlign: 'right',
//   },
//   submitBtn: {
//     backgroundColor: '#1E3A8A',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     gap: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   submitBtnDisabled: {
//     backgroundColor: '#94A3B8',
//   },
//   submitBtnText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     maxHeight: '70%',
//     paddingBottom: 20,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//   },
//   modalList: {
//     maxHeight: 400,
//   },
//   modalItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   modalItemSelected: {
//     backgroundColor: '#DBEAFE',
//   },
//   modalItemText: {
//     fontSize: 16,
//     color: '#1F2937',
//     flex: 1,
//   },
//   modalItemTextSelected: {
//     color: '#1E3A8A',
//     fontWeight: '600',
//   },
//   fab: { 
//     position: 'absolute', 
//     bottom: 20, 
//     right: 20, 
//     backgroundColor: '#fde047', 
//     width: 60, 
//     height: 60, 
//     borderRadius: 30, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     shadowOpacity: 0.3, 
//     shadowRadius: 5, 
//     elevation: 8 
//   },
//   fabInner: { 
//     alignItems: 'center', 
//     justifyContent: 'center' 
//   },
//   fabAiText: { 
//     fontSize: 10, 
//     fontWeight: '900', 
//     color: '#1E3A8A', 
//     marginBottom: -2 
//   },
// });

// export default ComplaintFormScreen;

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
  Switch,
  Modal,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUserId, authenticatedFetch } from './Tokenutils';
import { DJANGO_API_URL } from './Config';

// Translations object
const translations = {
  english: {
    // Header
    headerTitle: 'File a Complaint',
    pageTitle: 'File a new Complaint',
    
    // Voice Guidance Section
    voiceGuidance: 'Voice Guidance',
    enableVoice: 'Enable Voice',
    stopVoice: 'Stop Voice',
    replayGuidance: 'Replay Guidance',
    selectLanguage: 'Select Language',
    close: 'Close',
    
    // Personal Information
    yourInformation: 'Your Information',
    name: 'Name',
    phone: 'Phone',
    cannotEdit: 'This information cannot be edited',
    
    // Form Labels
    titleLabel: 'Title:',
    categoryLabel: 'Category:',
    locationLabel: 'Location:',
    descriptionLabel: 'Description:',
    required: '*',
    
    // Placeholders
    titlePlaceholder: 'Enter complaint title',
    categoryPlaceholder: 'Select category',
    locationPlaceholder: 'Select location',
    descriptionPlaceholder: 'Describe your complaint in detail...',
    
    // Helper Text
    voiceHint: 'Tap for voice guidance',
    characterCount: 'characters (minimum 20)',
    
    // Categories
    waterSupply: 'Water Supply',
    sanitation: 'Sanitation',
    electricity: 'Electricity',
    roads: 'Roads & Infrastructure',
    healthcare: 'Healthcare',
    education: 'Education',
    agriculture: 'Agriculture',
    publicSafety: 'Public Safety',
    welfareSchemes: 'Welfare Schemes',
    landDisputes: 'Land Disputes',
    
    // Modal Titles
    selectCategory: 'Select Category',
    selectLocation: 'Select Location',
    
    // Buttons
    submit: 'Submit',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    ok: 'OK',
    
    // Alerts
    validationError: 'Validation Error',
    enterTitle: 'Please enter a complaint title.',
    selectCategoryAlert: 'Please select a category.',
    selectLocationAlert: 'Please select a location.',
    enterDescription: 'Please enter a description.',
    descriptionLength: 'Description should be at least 20 characters long.',
    submitComplaintTitle: 'Submit Complaint',
    submitConfirm: 'Are you sure you want to submit your complaint?',
    success: 'Success',
    complaintSubmitted: 'Your complaint has been submitted successfully!',
    submissionFailed: 'Submission Failed',
    failedToSubmit: 'Failed to submit your complaint. Please try again.',
    error: 'Error',
    loadingInfo: 'Loading your information...',
    
    // Voice Messages
    voiceWelcome: 'Welcome to the complaint form. Please fill in all required fields to submit your complaint.',
    voiceTitle: 'Enter a brief title that summarizes your complaint.',
    voiceCategory: 'Select the category that best matches your complaint from the dropdown list.',
    voiceLocation: 'Select your location from the dropdown list.',
    voiceDescription: 'Provide a detailed description of your complaint. Write at least 20 characters.',
    voiceSubmit: 'Please review your complaint carefully before submitting. Make sure all required fields are filled.',
    voiceCategorySelected: 'Category selected.',
    voiceLocationSelected: 'Location selected.',
  },
  hindi: {
    // Header
    headerTitle: 'शिकायत दर्ज करें',
    pageTitle: 'नई शिकायत दर्ज करें',
    
    // Voice Guidance Section
    voiceGuidance: 'आवाज मार्गदर्शन',
    enableVoice: 'आवाज सक्षम करें',
    stopVoice: 'आवाज बंद करें',
    replayGuidance: 'मार्गदर्शन दोबारा चलाएं',
    selectLanguage: 'भाषा चुनें',
    close: 'बंद करें',
    
    // Personal Information
    yourInformation: 'आपकी जानकारी',
    name: 'नाम',
    phone: 'फोन',
    cannotEdit: 'यह जानकारी संपादित नहीं की जा सकती',
    
    // Form Labels
    titleLabel: 'शीर्षक:',
    categoryLabel: 'श्रेणी:',
    locationLabel: 'स्थान:',
    descriptionLabel: 'विवरण:',
    required: '*',
    
    // Placeholders
    titlePlaceholder: 'शिकायत का शीर्षक दर्ज करें',
    categoryPlaceholder: 'श्रेणी चुनें',
    locationPlaceholder: 'स्थान चुनें',
    descriptionPlaceholder: 'अपनी शिकायत का विस्तार से वर्णन करें...',
    
    // Helper Text
    voiceHint: 'आवाज मार्गदर्शन के लिए टैप करें',
    characterCount: 'अक्षर (न्यूनतम 20)',
    
    // Categories
    waterSupply: 'जल आपूर्ति',
    sanitation: 'स्वच्छता',
    electricity: 'बिजली',
    roads: 'सड़कें और बुनियादी ढांचा',
    healthcare: 'स्वास्थ्य सेवा',
    education: 'शिक्षा',
    agriculture: 'कृषि',
    publicSafety: 'सार्वजनिक सुरक्षा',
    welfareSchemes: 'कल्याण योजनाएं',
    landDisputes: 'भूमि विवाद',
    
    // Modal Titles
    selectCategory: 'श्रेणी चुनें',
    selectLocation: 'स्थान चुनें',
    
    // Buttons
    submit: 'जमा करें',
    submitting: 'जमा हो रहा है...',
    cancel: 'रद्द करें',
    ok: 'ठीक है',
    
    // Alerts
    validationError: 'सत्यापन त्रुटि',
    enterTitle: 'कृपया शिकायत का शीर्षक दर्ज करें।',
    selectCategoryAlert: 'कृपया एक श्रेणी चुनें।',
    selectLocationAlert: 'कृपया एक स्थान चुनें।',
    enterDescription: 'कृपया विवरण दर्ज करें।',
    descriptionLength: 'विवरण कम से कम 20 अक्षरों का होना चाहिए।',
    submitComplaintTitle: 'शिकायत जमा करें',
    submitConfirm: 'क्या आप वाकई अपनी शिकायत सबमिट करना चाहते हैं?',
    success: 'सफलता',
    complaintSubmitted: 'आपकी शिकायत सफलतापूर्वक सबमिट कर दी गई है!',
    submissionFailed: 'सबमिशन विफल',
    failedToSubmit: 'आपकी शिकायत सबमिट करने में विफल। कृपया पुन: प्रयास करें।',
    error: 'त्रुटि',
    loadingInfo: 'आपकी जानकारी लोड हो रही है...',
    
    // Voice Messages
    voiceWelcome: 'शिकायत फॉर्म में आपका स्वागत है। कृपया अपनी शिकायत सबमिट करने के लिए सभी आवश्यक फ़ील्ड भरें।',
    voiceTitle: 'एक संक्षिप्त शीर्षक दर्ज करें जो आपकी शिकायत का सारांश देता है।',
    voiceCategory: 'ड्रॉपडाउन सूची से वह श्रेणी चुनें जो आपकी शिकायत से सबसे अच्छी तरह मेल खाती है।',
    voiceLocation: 'ड्रॉपडाउन सूची से अपना स्थान चुनें।',
    voiceDescription: 'अपनी शिकायत का विस्तृत विवरण प्रदान करें। कम से कम 20 अक्षर लिखें।',
    voiceSubmit: 'कृपया जमा करने से पहले अपनी शिकायत की सावधानीपूर्वक समीक्षा करें। सुनिश्चित करें कि सभी आवश्यक फ़ील्ड भरे गए हैं।',
    voiceCategorySelected: 'श्रेणी चयनित।',
    voiceLocationSelected: 'स्थान चयनित।',
  },
  marathi: {
    // Header
    headerTitle: 'तक्रार नोंदवा',
    pageTitle: 'नवीन तक्रार नोंदवा',
    
    // Voice Guidance Section
    voiceGuidance: 'आवाज मार्गदर्शन',
    enableVoice: 'आवाज सक्षम करा',
    stopVoice: 'आवाज बंद करा',
    replayGuidance: 'मार्गदर्शन पुन्हा चालवा',
    selectLanguage: 'भाषा निवडा',
    close: 'बंद करा',
    
    // Personal Information
    yourInformation: 'तुमची माहिती',
    name: 'नाव',
    phone: 'फोन',
    cannotEdit: 'ही माहिती संपादित केली जाऊ शकत नाही',
    
    // Form Labels
    titleLabel: 'शीर्षक:',
    categoryLabel: 'श्रेणी:',
    locationLabel: 'स्थान:',
    descriptionLabel: 'वर्णन:',
    required: '*',
    
    // Placeholders
    titlePlaceholder: 'तक्रार शीर्षक प्रविष्ट करा',
    categoryPlaceholder: 'श्रेणी निवडा',
    locationPlaceholder: 'स्थान निवडा',
    descriptionPlaceholder: 'तुमच्या तक्रारीचे तपशीलवार वर्णन करा...',
    
    // Helper Text
    voiceHint: 'आवाज मार्गदर्शनासाठी टॅप करा',
    characterCount: 'अक्षरे (किमान 20)',
    
    // Categories
    waterSupply: 'पाणी पुरवठा',
    sanitation: 'स्वच्छता',
    electricity: 'वीज',
    roads: 'रस्ते आणि पायाभूत सुविधा',
    healthcare: 'आरोग्य सेवा',
    education: 'शिक्षण',
    agriculture: 'शेती',
    publicSafety: 'सार्वजनिक सुरक्षा',
    welfareSchemes: 'कल्याण योजना',
    landDisputes: 'जमीन विवाद',
    
    // Modal Titles
    selectCategory: 'श्रेणी निवडा',
    selectLocation: 'स्थान निवडा',
    
    // Buttons
    submit: 'सबमिट करा',
    submitting: 'सबमिट होत आहे...',
    cancel: 'रद्द करा',
    ok: 'ठीक आहे',
    
    // Alerts
    validationError: 'प्रमाणीकरण त्रुटी',
    enterTitle: 'कृपया तक्रार शीर्षक प्रविष्ट करा.',
    selectCategoryAlert: 'कृपया श्रेणी निवडा.',
    selectLocationAlert: 'कृपया स्थान निवडा.',
    enterDescription: 'कृपया वर्णन प्रविष्ट करा.',
    descriptionLength: 'वर्णन किमान 20 अक्षरांचे असावे.',
    submitComplaintTitle: 'तक्रार सबमिट करा',
    submitConfirm: 'तुम्हाला खात्री आहे की तुम्ही तुमची तक्रार सबमिट करू इच्छिता?',
    success: 'यश',
    complaintSubmitted: 'तुमची तक्रार यशस्वीरित्या सबमिट केली गेली आहे!',
    submissionFailed: 'सबमिशन अयशस्वी',
    failedToSubmit: 'तुमची तक्रार सबमिट करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    error: 'त्रुटी',
    loadingInfo: 'तुमची माहिती लोड होत आहे...',
    
    // Voice Messages
    voiceWelcome: 'तक्रार फॉर्ममध्ये आपले स्वागत आहे. कृपया तुमची तक्रार सबमिट करण्यासाठी सर्व आवश्यक फील्ड भरा.',
    voiceTitle: 'तुमच्या तक्रारीचा सारांश देणारे संक्षिप्त शीर्षक प्रविष्ट करा.',
    voiceCategory: 'ड्रॉपडाउन सूचीमधून तुमच्या तक्रारीशी सर्वोत्तम जुळणारी श्रेणी निवडा.',
    voiceLocation: 'ड्रॉपडाउन सूचीमधून तुमचे स्थान निवडा.',
    voiceDescription: 'तुमच्या तक्रारीचे तपशीलवार वर्णन द्या. किमान 20 अक्षरे लिहा.',
    voiceSubmit: 'कृपया सबमिट करण्यापूर्वी तुमच्या तक्रारीचे काळजीपूर्वक पुनरावलोकन करा. सर्व आवश्यक फील्ड भरले आहेत याची खात्री करा.',
    voiceCategorySelected: 'श्रेणी निवडली.',
    voiceLocationSelected: 'स्थान निवडले.',
  },
};

const ComplaintFormScreen = ({ onBack, onSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [language, setLanguage] = useState('english');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationLabel, setLocationLabel] = useState('');
  const [isUrban, setIsUrban] = useState(false);

  // Dropdown states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Voice guidance states
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voiceEnabledRef = useRef(voiceEnabled);
  const t = translations[language];

  // Get category options with translations
  const getCategoryOptions = () => [
    { value: 'water_supply', label: t.waterSupply },
    { value: 'sanitation', label: t.sanitation },
    { value: 'electricity', label: t.electricity },
    { value: 'roads', label: t.roads },
    { value: 'healthcare', label: t.healthcare },
    { value: 'education', label: t.education },
    { value: 'agriculture', label: t.agriculture },
    { value: 'public_safety', label: t.publicSafety },
    { value: 'welfare_schemes', label: t.welfareSchemes },
    { value: 'land_disputes', label: t.landDisputes },
  ];

  // Dynamic Location options fetched from API
  const [locationsList, setLocationsList] = useState([
    { id: '5ca7e581-3f0a-45b4-aa1a-50daa397c02a', name: 'bibwewadi (Pune)' },
    { id: 'e72c08a2-0a7b-46f4-8792-7ad2cd1bcce1', name: 'vasai (palghar)' },
  ]);

  const fetchLocations = async () => {
    try {
      console.log('Fetching locations from backend...');
      const response = await authenticatedFetch(
        `${DJANGO_API_URL}/api/locations/`,
        {
          method: 'GET',
        }
      );
      if (response.ok) {
        const data = await response.json();
        const results = data.results || data || [];
        if (Array.isArray(results) && results.length > 0) {
          const mapped = results.map(loc => ({
            id: loc.id,
            name: `${loc.name}${loc.district ? ` (${loc.district})` : ''}`,
            rawName: loc.name
          }));
          console.log('Locations fetched successfully:', mapped);
          setLocationsList(mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.error('Error fetching locations API:', err);
    }
    return null;
  };

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    if (!voiceEnabled && isSpeaking) {
      stopVoiceGuidance();
    }
  }, [voiceEnabled]);

  useEffect(() => {
    fetchUserData();
    loadLanguagePreference();
    
    return () => {
      Speech.stop();
    };
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('@language_preference');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageModal(false);
    await stopVoiceGuidance();
    
    try {
      await AsyncStorage.setItem('@language_preference', newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
    
    setTimeout(() => {
      if (voiceEnabledRef.current) {
        playVoiceGuidance('welcome');
      }
    }, 300);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      const userId = await getCurrentUserId();
      
      if (!userId) {
        throw new Error('No user session found. Please login again.');
      }

      console.log('Fetching user data for user ID:', userId);

      // Fetch locations dynamically
      await fetchLocations();

      const response = await authenticatedFetch(
        `${DJANGO_API_URL}/api/users/${userId}`,
        {
          method: 'GET',
        }
      );

      console.log('User data response status:', response.status);

      const rawText = await response.text();
      console.log('User data raw response:', rawText);

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
        console.warn('User query returned error, using fallback profile data:', data?.detail || data?.message);
        setUserData({ username: 'Citizen User', phone_number: 'N/A' });
        return;
      }

      console.log('User data fetched successfully:', data);
      setUserData(data);

      if (data?.panchayat_name && (!location || location === '')) {
        const match = locationsList.find(l => 
          l.name.toLowerCase().includes(data.panchayat_name.toLowerCase()) || 
          (l.rawName && l.rawName.toLowerCase() === data.panchayat_name.toLowerCase())
        );
        if (match) {
          setLocation(match.id);
          setLocationLabel(match.name);
          console.log('Auto-selected location from user profile:', match.name);
        }
      }
      
      setTimeout(() => {
        if (voiceEnabled) {
          playVoiceGuidance('welcome');
        }
      }, 500);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback user data so the form can still be used without crashing
      setUserData({ username: 'Citizen User', phone_number: 'N/A' });
    } finally {
      setLoading(false);
    }
  };

  const getLanguageCode = () => {
    switch(language) {
      case 'hindi': return 'hi-IN';
      case 'marathi': return 'mr-IN';
      default: return 'en-US';
    }
  };

  const playVoiceGuidance = async (type) => {
    if (!voiceEnabledRef.current) return;

    const voiceMessages = {
      welcome: t.voiceWelcome,
      title: t.voiceTitle,
      category: t.voiceCategory,
      location: t.voiceLocation,
      description: t.voiceDescription,
      submit: t.voiceSubmit,
      categorySelected: t.voiceCategorySelected,
      locationSelected: t.voiceLocationSelected,
    };

    try {
      await Speech.stop();
      
      const message = voiceMessages[type];
      const languageCode = getLanguageCode();
      
      console.log('Playing voice guidance:', message);
      
      setIsSpeaking(true);
      
      await Speech.speak(message, {
        language: languageCode,
        pitch: 1.0,
        rate: 0.85,
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

  const handleReplayGuidance = async () => {
    await stopVoiceGuidance();
    setTimeout(() => {
      if (voiceEnabledRef.current) {
        playVoiceGuidance('welcome');
      }
    }, 300);
  };

  const handleCategorySelect = (value, label) => {
    setCategory(value);
    setCategoryLabel(label);
    setShowCategoryDropdown(false);
    if (voiceEnabled) {
      playVoiceGuidance('categorySelected');
    }
  };

  const handleLocationSelect = (id, name) => {
    setLocation(id);
    setLocationLabel(name);
    setShowLocationDropdown(false);
    
    setIsUrban(id === '550e8400-e29b-41d4-a716-446655440001');
    
    if (voiceEnabled) {
      playVoiceGuidance('locationSelected');
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert(t.validationError, t.enterTitle);
      return false;
    }

    if (!category) {
      Alert.alert(t.validationError, t.selectCategoryAlert);
      return false;
    }

    if (!location) {
      Alert.alert(t.validationError, t.selectLocationAlert);
      return false;
    }

    if (!description.trim()) {
      Alert.alert(t.validationError, t.enterDescription);
      return false;
    }

    if (description.trim().length < 20) {
      Alert.alert(t.validationError, t.descriptionLength);
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
      t.submitComplaintTitle,
      t.submitConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.submit,
          onPress: submitComplaint,
        },
      ]
    );
  };

  const submitComplaint = async () => {
    try {
      setSubmitting(true);

      const complaintData = {
        title: title.trim(),
        description: description.trim(),
        category: category,
        location: location,
        citizen_name: userData?.username || 'Citizen User',
        citizen_phone: userData?.phone_number || '',
        is_urban: isUrban,
      };

      console.log('Submitting complaint:', complaintData);

      const response = await authenticatedFetch(
        `${DJANGO_API_URL}/api/complaints/`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          },
          body: JSON.stringify(complaintData),
        }
      );

      console.log('Complaint response status:', response.status);

      const rawText = await response.text();
      console.log('Complaint raw response:', rawText);

      let result;
      try {
        result = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        if (response.ok) {
          result = { message: 'Complaint submitted successfully' };
        } else {
          throw new Error(`Server error: ${rawText.substring(0, 100)}`);
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        let errMsg = result?.message || result?.detail;
        if (!errMsg && typeof result === 'object') {
          const keys = Object.keys(result);
          if (keys.length > 0) {
            const field = keys[0];
            const val = Array.isArray(result[field]) ? result[field].join(', ') : result[field];
            errMsg = `${field}: ${val}`;
          }
        }
        throw new Error(errMsg || 'Failed to submit complaint');
      }
      
      Alert.alert(
        t.success,
        t.complaintSubmitted,
        [
          {
            text: t.ok,
            onPress: () => {
              if (onSuccess) onSuccess();
              onBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting complaint:', error);
      Alert.alert(
        t.submissionFailed,
        error.message || t.failedToSubmit,
        [{ text: t.ok }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>{t.loadingInfo}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t.headerTitle}</Text>

          <View style={styles.headerRight}>
            {isSpeaking && (
              <MaterialCommunityIcons 
                name="volume-high" 
                size={20} 
                color="#FFF" 
                style={{marginRight: 8}} 
              />
            )}
            <TouchableOpacity 
              onPress={() => setShowLanguageModal(true)}
              style={styles.languageIconButton}
            >
              <MaterialCommunityIcons name="translate" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Language Selection Modal */}
      <Modal 
        visible={showLanguageModal} 
        transparent 
        animationType="fade" 
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.languageModalContent}>
            <Text style={styles.languageModalTitle}>{t.selectLanguage}</Text>
            {['english', 'hindi', 'marathi'].map(lang => (
              <TouchableOpacity 
                key={lang} 
                style={[styles.languageOption, language === lang && styles.languageOptionActive]} 
                onPress={() => handleLanguageChange(lang)}
              >
                <Text style={[styles.languageOptionText, language === lang && styles.languageOptionTextActive]}>
                  {lang === 'english' ? 'English' : lang === 'hindi' ? 'हिंदी (Hindi)' : 'मराठी (Marathi)'}
                </Text>
                {language === lang && <Ionicons name="checkmark-circle" size={24} color="#1E3A8A" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.languageModalCloseButton} onPress={() => setShowLanguageModal(false)}>
              <Text style={styles.languageModalCloseButtonText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Scrollable Form Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>{t.pageTitle}</Text>

        {/* Voice Guidance Controls */}
        <View style={styles.voiceControlsContainer}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
            <Text style={styles.sectionTitle}>{t.voiceGuidance}</Text>
          </View>
          
          <View style={styles.voiceControls}>
            <View style={styles.controlRow}>
              <View style={styles.controlLabel}>
                <MaterialCommunityIcons 
                  name={voiceEnabled ? "volume-high" : "volume-off"} 
                  size={20} 
                  color="#1E3A8A" 
                />
                <Text style={styles.controlText}>{t.enableVoice}</Text>
              </View>
              <Switch
                value={voiceEnabled}
                onValueChange={(value) => {
                  setVoiceEnabled(value);
                  voiceEnabledRef.current = value;
                  if (!value) {
                    stopVoiceGuidance();
                  }
                }}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={voiceEnabled ? '#1E3A8A' : '#64748B'}
              />
            </View>
          </View>

          <View style={styles.voiceActionButtons}>
            {isSpeaking ? (
              <TouchableOpacity 
                style={styles.stopSpeakingButton}
                onPress={stopVoiceGuidance}
              >
                <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
                <Text style={styles.stopSpeakingText}>{t.stopVoice}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.replayButton}
                onPress={handleReplayGuidance}
                disabled={!voiceEnabled}
              >
                <MaterialCommunityIcons 
                  name="replay" 
                  size={20} 
                  color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
                />
                <Text style={[
                  styles.replayButtonText,
                  !voiceEnabled && styles.replayButtonTextDisabled
                ]}>
                  {t.replayGuidance}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account" size={20} color="#1E3A8A" />
            <Text style={styles.sectionTitle}>{t.yourInformation}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.name}</Text>
              <Text style={styles.infoValue}>{userData?.username || 'Citizen User'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.phone}</Text>
              <Text style={styles.infoValue}>{userData?.phone_number || 'N/A'}</Text>
            </View>
          </View>
          <Text style={styles.helperText}>{t.cannotEdit}</Text>
        </View>

        <View style={styles.formCard}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.titleLabel} {t.required}</Text>
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('title')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={16} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                {t.voiceHint}
              </Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.input} 
              placeholderTextColor="#9CA3AF"
              placeholder={t.titlePlaceholder}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Category Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.categoryLabel} {t.required}</Text>
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('category')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={16} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                {t.voiceHint}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setShowCategoryDropdown(true)}
            >
              <Text style={categoryLabel ? styles.dropdownText : styles.dropdownPlaceholder}>
                {categoryLabel || t.categoryPlaceholder}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Location Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.locationLabel} {t.required}</Text>
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('location')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={16} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                {t.voiceHint}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownInput}
              onPress={() => setShowLocationDropdown(true)}
            >
              <Text style={locationLabel ? styles.dropdownText : styles.dropdownPlaceholder}>
                {locationLabel || t.locationPlaceholder}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.descriptionLabel} {t.required}</Text>
            <TouchableOpacity
              style={styles.voiceHintButton}
              onPress={() => playVoiceGuidance('description')}
              disabled={!voiceEnabled}
            >
              <MaterialCommunityIcons 
                name="help-circle" 
                size={16} 
                color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
              />
              <Text style={[
                styles.voiceHintText,
                !voiceEnabled && styles.voiceHintTextDisabled
              ]}>
                {t.voiceHint}
              </Text>
            </TouchableOpacity>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              multiline 
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChangeText={setDescription}
            />
            <Text style={styles.characterCount}>
              {description.length} {t.characterCount}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[
            styles.submitBtn,
            submitting && styles.submitBtnDisabled
          ]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <ActivityIndicator size="small" color="#FFF" />
              <Text style={styles.submitBtnText}>{t.submitting}</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="send" size={20} color="#FFF" />
              <Text style={styles.submitBtnText}>{t.submit}</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{height: 40}} />
      </ScrollView>

      {/* Category Dropdown Modal */}
      <Modal
        visible={showCategoryDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.dropdownModalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryDropdown(false)}
        >
          <View style={styles.dropdownModalContent}>
            <View style={styles.dropdownModalHeader}>
              <Text style={styles.dropdownModalTitle}>{t.selectCategory}</Text>
              <TouchableOpacity onPress={() => setShowCategoryDropdown(false)}>
                <Ionicons name="close" size={24} color="#1E3A8A" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.dropdownModalList}>
              {getCategoryOptions().map((cat) => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    styles.dropdownModalItem,
                    category === cat.value && styles.dropdownModalItemSelected
                  ]}
                  onPress={() => handleCategorySelect(cat.value, cat.label)}
                >
                  <Text style={[
                    styles.dropdownModalItemText,
                    category === cat.value && styles.dropdownModalItemTextSelected
                  ]}>
                    {cat.label}
                  </Text>
                  {category === cat.value && (
                    <Ionicons name="checkmark" size={20} color="#1E3A8A" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Location Dropdown Modal */}
      <Modal
        visible={showLocationDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.dropdownModalOverlay}
          activeOpacity={1}
          onPress={() => setShowLocationDropdown(false)}
        >
          <View style={styles.dropdownModalContent}>
            <View style={styles.dropdownModalHeader}>
              <Text style={styles.dropdownModalTitle}>{t.selectLocation}</Text>
              <TouchableOpacity onPress={() => setShowLocationDropdown(false)}>
                <Ionicons name="close" size={24} color="#1E3A8A" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.dropdownModalList}>
              {locationsList.map((loc) => (
                <TouchableOpacity
                  key={loc.id}
                  style={[
                    styles.dropdownModalItem,
                    location === loc.id && styles.dropdownModalItemSelected
                  ]}
                  onPress={() => handleLocationSelect(loc.id, loc.name)}
                >
                  <Text style={[
                    styles.dropdownModalItemText,
                    location === loc.id && styles.dropdownModalItemTextSelected
                  ]}>
                    {loc.name}
                  </Text>
                  {location === loc.id && (
                    <Ionicons name="checkmark" size={20} color="#1E3A8A" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Static AI Button */}
      <View style={styles.fab}>
        <View style={styles.fabInner}>
          <Text style={styles.fabAiText}>AI</Text>
          <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    justifyContent: 'flex-end',
  },
  languageIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
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
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  voiceControlsContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  voiceActionButtons: {
    marginTop: 12,
  },
  stopSpeakingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  replayButtonText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  replayButtonTextDisabled: {
    color: '#CBD5E1',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    fontStyle: 'italic',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
    marginLeft: 4,
  },
  voiceHintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#DBEAFE',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  voiceHintText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  voiceHintTextDisabled: {
    color: '#CBD5E1',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#9CA3AF',
    flex: 1,
  },
  textArea: {
    height: 112,
    paddingTop: 12,
  },
  characterCount: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'right',
  },
  submitBtn: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Language Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  languageModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },
  languageOptionActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  languageOptionTextActive: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
  languageModalCloseButton: {
    marginTop: 8,
    padding: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  languageModalCloseButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  // Dropdown Modal Styles
  dropdownModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dropdownModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  dropdownModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dropdownModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  dropdownModalList: {
    maxHeight: 400,
  },
  dropdownModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownModalItemSelected: {
    backgroundColor: '#DBEAFE',
  },
  dropdownModalItemText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  dropdownModalItemTextSelected: {
    color: '#1E3A8A',
    fontWeight: '600',
  },
  fab: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: '#fde047', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 8 
  },
  fabInner: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  fabAiText: { 
    fontSize: 10, 
    fontWeight: '900', 
    color: '#1E3A8A', 
    marginBottom: -2 
  },
});

export default ComplaintFormScreen;