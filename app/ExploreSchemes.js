// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Platform,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   Switch,
//   Animated,
// } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Speech from 'expo-speech';
// import SchemeDetailsScreen from './SchemeDetailsScreen';

// const CATEGORIES = [
//   { id: '1', name: 'Agriculture', icon: 'leaf', isHighlighted: false },
//   { id: '2', name: 'Health', icon: 'medical', isHighlighted: false },
//   { id: '3', name: 'Business', icon: 'briefcase', isHighlighted: false },
//   { id: '4', name: 'Education', icon: 'book', isHighlighted: false },
//   { id: '5', name: 'Women', icon: 'woman', isHighlighted: false },
//   { id: '6', name: 'Housing', icon: 'home', isHighlighted: false },
//   { id: '7', name: 'Science', icon: 'flask', isHighlighted: false },
//   { id: '8', name: 'Sports', icon: 'basketball', isHighlighted: false },
//   { id: '9', name: 'Public Safety', icon: 'shield-checkmark', isHighlighted: false },
// ];

// const { width } = Dimensions.get('window');
// const cardWidth = (width - 56) / 3;

// // --- Sub Components DEFINED BEFORE MAIN COMPONENT ---

// const Header = ({ onBack, searchQuery, setSearchQuery, isSpeaking, stopVoiceGuidance }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.headerTop}>
//         <TouchableOpacity onPress={onBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#FFF" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Explore Schemes</Text>

//         <TouchableOpacity 
//           onPress={isSpeaking ? stopVoiceGuidance : null}
//           style={styles.headerIcons}
//         >
//           {isSpeaking && (
//             <MaterialCommunityIcons name="volume-high" size={24} color="#FFF" />
//           )}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <TextInput
//           placeholder="Search schemes..."
//           placeholderTextColor="#94a3b8"
//           style={styles.searchInput}
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Ionicons name="search" size={20} color="#94a3b8" />
//       </View>
//     </View>
//   );
// };

// const CategoryCard = ({ data, onPress, schemeCount, isLoading, isHighlighted, pulseAnim }) => {
//   return (
//     <Animated.View
//       style={[
//         styles.animatedCardWrapper,
//         {
//           transform: [{ scale: pulseAnim }],
//         },
//       ]}
//     >
//       <TouchableOpacity 
//         style={[
//           styles.card,
//           isHighlighted && styles.cardHighlighted
//         ]}
//         activeOpacity={0.7}
//         onPress={() => onPress(data.name)}
//         disabled={isLoading}
//       >
//         <View style={styles.iconWrapper}>
//           <Ionicons 
//             name={data.icon}
//             size={36} 
//             color="#374151"
//           />
//         </View>
//         <Text style={styles.cardText}>{data.name}</Text>
//         {schemeCount !== null && schemeCount > 0 && (
//           <View style={styles.countBadge}>
//             <Text style={styles.countText}>{schemeCount}</Text>
//           </View>
//         )}
//         {isHighlighted && (
//           <View style={styles.highlightIndicator}>
//             <MaterialCommunityIcons name="volume-high" size={16} color="#1E3A8A" />
//           </View>
//         )}
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const AIFloatingButton = () => {
//   return (
//     <View style={styles.fab}>
//       <View style={styles.fabInner}>
//         <Text style={styles.fabAiText}>AI</Text>
//         <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
//       </View>
//     </View>
//   );
// };

// // Category Schemes List Screen Component
// const CategorySchemesScreen = ({ category, schemes, onBack, onSchemeSelect, loading }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredSchemes = schemes.filter(scheme => 
//     scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getIcon = (scheme) => {
//     const dept = scheme.department.toLowerCase();
//     const cat = category.toLowerCase();
    
//     if (cat.includes('health') || dept.includes('health')) {
//       return { name: 'medical', color: '#ef4444', bg: '#fee2e2' };
//     } else if (cat.includes('business') || dept.includes('finance')) {
//       return { name: 'gold', color: '#fbbf24', bg: '#fef3c7', library: 'MaterialCommunityIcons' };
//     } else if (cat.includes('housing') || dept.includes('urban')) {
//       return { name: 'home', color: '#f97316', bg: '#ffedd5' };
//     } else if (cat.includes('agriculture') || dept.includes('agri')) {
//       return { name: 'sprout', color: '#22c55e', bg: '#dcfce7', library: 'MaterialCommunityIcons' };
//     } else if (cat.includes('education')) {
//       return { name: 'school', color: '#3b82f6', bg: '#dbeafe' };
//     } else if (cat.includes('sports')) {
//       return { name: 'basketball', color: '#8b5cf6', bg: '#ede9fe' };
//     } else if (cat.includes('science')) {
//       return { name: 'flask', color: '#06b6d4', bg: '#cffafe' };
//     } else if (cat.includes('women')) {
//       return { name: 'woman', color: '#ec4899', bg: '#fce7f3' };
//     } else if (cat.includes('safety')) {
//       return { name: 'shield-checkmark', color: '#10b981', bg: '#d1fae5' };
//     } else {
//       return { name: 'file-document', color: '#6b7280', bg: '#e5e7eb', library: 'MaterialCommunityIcons' };
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
//       <View style={styles.headerContainer}>
//         <View style={styles.headerTop}>
//           <TouchableOpacity onPress={onBack} style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="#FFF" />
//           </TouchableOpacity>

//           <Text style={styles.headerTitle}>{category} Schemes</Text>

//           <View style={styles.headerIcons}>
//             <View style={{ width: 40 }} />
//           </View>
//         </View>

//         <View style={styles.searchBar}>
//           <TextInput
//             placeholder="Search schemes..."
//             placeholderTextColor="#94a3b8"
//             style={styles.searchInput}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           {searchQuery ? (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Ionicons name="close-circle" size={20} color="#94a3b8" />
//             </TouchableOpacity>
//           ) : (
//             <Ionicons name="search" size={20} color="#94a3b8" />
//           )}
//         </View>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#1E3A8A" />
//           <Text style={styles.loadingText}>Loading {category} schemes...</Text>
//         </View>
//       ) : filteredSchemes.length === 0 ? (
//         <View style={styles.emptyState}>
//           <MaterialCommunityIcons name="file-document-alert-outline" size={80} color="#9ca3af" />
//           <Text style={styles.emptyText}>
//             {searchQuery ? 'No schemes found matching your search' : `No ${category} schemes available`}
//           </Text>
//           {searchQuery && (
//             <TouchableOpacity 
//               onPress={() => setSearchQuery('')}
//               style={styles.clearButton}
//             >
//               <Text style={styles.clearButtonText}>Clear Search</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       ) : (
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {filteredSchemes.map((scheme) => {
//             const iconData = getIcon(scheme);
//             const IconComponent = iconData.library === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
            
//             return (
//               <View key={scheme.id} style={styles.schemeCard}>
//                 <View style={styles.schemeCardHeader}>
//                   <View style={styles.schemeIconContainer}>
//                     <View style={[styles.schemeIcon, { backgroundColor: iconData.bg }]}>
//                       <IconComponent name={iconData.name} size={32} color={iconData.color} />
//                     </View>
//                   </View>
//                   <View style={styles.schemeInfo}>
//                     <Text style={styles.schemeTitle}>{scheme.name}</Text>
//                     <Text style={styles.schemeDepartment}>{scheme.department}</Text>
//                     <View style={styles.schemeTypeContainer}>
//                       <View style={[
//                         styles.schemeTypeBadge,
//                         { backgroundColor: scheme.scheme_type === 'state' ? '#dbeafe' : '#fef3c7' }
//                       ]}>
//                         <Text style={[
//                           styles.schemeTypeText,
//                           { color: scheme.scheme_type === 'state' ? '#1e40af' : '#92400e' }
//                         ]}>
//                           {scheme.scheme_type.toUpperCase()}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>

//                 <Text style={styles.schemeDescription} numberOfLines={2}>
//                   {scheme.description}
//                 </Text>

//                 <View style={styles.schemeDivider} />

//                 <View style={styles.schemeFooter}>
//                   <View style={styles.eligibilityContainer}>
//                     <Text style={styles.eligibilityLabel}>Eligibility:</Text>
//                     <Text style={styles.eligibilityText} numberOfLines={2}>
//                       {scheme.eligibility}
//                     </Text>
//                   </View>
//                   <TouchableOpacity 
//                     style={styles.applyButton}
//                     onPress={() => onSchemeSelect(scheme)}
//                   >
//                     <Text style={styles.applyButtonText}>Apply</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             );
//           })}
//           <View style={{ height: 100 }} />
//         </ScrollView>
//       )}

//       <AIFloatingButton />
//     </SafeAreaView>
//   );
// };

// // --- MAIN COMPONENT ---

// const ExploreSchemes = ({ onBack }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentScreen, setCurrentScreen] = useState('explore'); // 'explore', 'category', or 'details'
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedScheme, setSelectedScheme] = useState(null);
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryCounts, setCategoryCounts] = useState({});

//   // Voice guidance states
//   const [voiceEnabled, setVoiceEnabled] = useState(true);
//   const [language, setLanguage] = useState('english'); // 'english' or 'hindi'
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [currentHighlight, setCurrentHighlight] = useState(null); // category id being highlighted

//   // Animation values for each category
//   const [categoryAnims] = useState(
//     CATEGORIES.reduce((acc, cat) => {
//       acc[cat.id] = new Animated.Value(1);
//       return acc;
//     }, {})
//   );

//   // Fetch scheme count for each category on mount
//   useEffect(() => {
//     fetchAllCategoryCounts();
    
//     // Play welcome guidance after component mounts
//     const timer = setTimeout(() => {
//       if (voiceEnabled) {
//         playVoiceGuidance();
//       }
//     }, 800);

//     // Cleanup function
//     return () => {
//       clearTimeout(timer);
//       Speech.stop();
//     };
//   }, []);

//   // Animate highlighted category
//   useEffect(() => {
//     if (currentHighlight) {
//       startPulseAnimation(categoryAnims[currentHighlight]);
//     }
//   }, [currentHighlight]);

//   const startPulseAnimation = (animValue) => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(animValue, {
//           toValue: 1.08,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animValue, {
//           toValue: 1,
//           duration: 600,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   const stopPulseAnimation = (animValue) => {
//     animValue.stopAnimation();
//     Animated.timing(animValue, {
//       toValue: 1,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   const playVoiceGuidance = async () => {
//     if (!voiceEnabled) return;

//     const messages = {
//       english: {
//         welcome: "Welcome to Explore Schemes. Here you can browse government schemes by category.",
//         intro: "We have organized schemes into nine categories for easy access.",
//         agriculture: "Agriculture category contains schemes for farmers and agricultural development.",
//         health: "Health category includes medical and healthcare related schemes.",
//         business: "Business category features schemes for entrepreneurs and business development.",
//         education: "Education category offers schemes for students and educational institutions.",
//         women: "Women category has schemes specifically designed for women empowerment.",
//         housing: "Housing category contains schemes for home construction and urban development.",
//         science: "Science category includes schemes for research and scientific development.",
//         sports: "Sports category features schemes for athletes and sports development.",
//         safety: "Public Safety category includes schemes for security and safety initiatives.",
//         outro: "Tap on any category to explore the schemes available.",
//       },
//       hindi: {
//         welcome: "योजनाओं का अन्वेषण करें में आपका स्वागत है। यहां आप श्रेणी के अनुसार सरकारी योजनाओं को ब्राउज़ कर सकते हैं।",
//         intro: "हमने आसान पहुंच के लिए योजनाओं को नौ श्रेणियों में व्यवस्थित किया है।",
//         agriculture: "कृषि श्रेणी में किसानों और कृषि विकास के लिए योजनाएं हैं।",
//         health: "स्वास्थ्य श्रेणी में चिकित्सा और स्वास्थ्य संबंधी योजनाएं शामिल हैं।",
//         business: "व्यवसाय श्रेणी में उद्यमियों और व्यवसाय विकास के लिए योजनाएं हैं।",
//         education: "शिक्षा श्रेणी छात्रों और शैक्षिक संस्थानों के लिए योजनाएं प्रदान करती है।",
//         women: "महिला श्रेणी में महिला सशक्तिकरण के लिए विशेष रूप से डिज़ाइन की गई योजनाएं हैं।",
//         housing: "आवास श्रेणी में घर निर्माण और शहरी विकास के लिए योजनाएं हैं।",
//         science: "विज्ञान श्रेणी में अनुसंधान और वैज्ञानिक विकास के लिए योजनाएं शामिल हैं।",
//         sports: "खेल श्रेणी में एथलीटों और खेल विकास के लिए योजनाएं हैं।",
//         safety: "सार्वजनिक सुरक्षा श्रेणी में सुरक्षा और सुरक्षा पहल के लिए योजनाएं शामिल हैं।",
//         outro: "उपलब्ध योजनाओं का पता लगाने के लिए किसी भी श्रेणी पर टैप करें।",
//       },
//     };

//     try {
//       setIsSpeaking(true);
//       const languageCode = language === 'hindi' ? 'hi-IN' : 'en-US';

//       // Welcome message
//       await speakMessage(messages[language].welcome, languageCode);
//       await delay(500);

//       // Intro
//       await speakMessage(messages[language].intro, languageCode);
//       await delay(800);

//       // Go through each category
//       const categoryMessageKeys = [
//         'agriculture', 'health', 'business', 'education', 
//         'women', 'housing', 'science', 'sports', 'safety'
//       ];

//       for (let i = 0; i < CATEGORIES.length; i++) {
//         const category = CATEGORIES[i];
//         const messageKey = categoryMessageKeys[i];
        
//         // Highlight current category
//         setCurrentHighlight(category.id);
        
//         // Speak about the category
//         await speakMessage(messages[language][messageKey], languageCode);
        
//         // Remove highlight
//         setCurrentHighlight(null);
//         stopPulseAnimation(categoryAnims[category.id]);
        
//         // Small pause between categories
//         await delay(400);
//       }

//       // Outro message
//       await speakMessage(messages[language].outro, languageCode);

//       setIsSpeaking(false);
//     } catch (error) {
//       console.error('Error playing voice guidance:', error);
//       setIsSpeaking(false);
//       setCurrentHighlight(null);
//       // Stop all animations
//       Object.values(categoryAnims).forEach(anim => stopPulseAnimation(anim));
//     }
//   };

//   const speakMessage = (message, languageCode) => {
//     return new Promise((resolve, reject) => {
//       Speech.speak(message, {
//         language: languageCode,
//         pitch: 1.0,
//         rate: 0.85,
//         onDone: resolve,
//         onStopped: resolve,
//         onError: reject,
//       });
//     });
//   };

//   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//   const stopVoiceGuidance = async () => {
//     try {
//       await Speech.stop();
//       setIsSpeaking(false);
//       setCurrentHighlight(null);
//       // Stop all animations
//       Object.values(categoryAnims).forEach(anim => stopPulseAnimation(anim));
//     } catch (error) {
//       console.error('Error stopping voice guidance:', error);
//     }
//   };

//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     stopVoiceGuidance();
//   };

//   const handleVoiceToggle = (value) => {
//     setVoiceEnabled(value);
//     if (!value) {
//       stopVoiceGuidance();
//     }
//   };

//   const handleReplayGuidance = () => {
//     stopVoiceGuidance();
//     setTimeout(() => {
//       if (voiceEnabled) {
//         playVoiceGuidance();
//       }
//     }, 300);
//   };

//   const fetchAllCategoryCounts = async () => {
//     try {
//       const token = await AsyncStorage.getItem('@access_token');
//       if (!token) return;

//       const counts = {};
      
//       // Fetch count for each category
//       for (const category of CATEGORIES) {
//         try {
//           const response = await fetch(
//             `https://7e3777787c19.ngrok-free.app/api/schemes?department=${category.name}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 'ngrok-skip-browser-warning': 'true'
//               }
//             }
//           );

//           if (response.ok) {
//             const rawText = await response.text();
//             let data;
            
//             try {
//               data = JSON.parse(rawText);
//               const schemeArray = Array.isArray(data) ? data : (data.results || []);
//               counts[category.name] = schemeArray.length;
//             } catch (parseError) {
//               counts[category.name] = 0;
//             }
//           } else {
//             counts[category.name] = 0;
//           }
//         } catch (error) {
//           counts[category.name] = 0;
//         }
//       }

//       setCategoryCounts(counts);
//     } catch (error) {
//       console.error('Error fetching category counts:', error);
//     }
//   };

//   const fetchSchemesByCategory = async (categoryName) => {
//     try {
//       setLoading(true);
      
//       const token = await AsyncStorage.getItem('@access_token');
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.');
//       }

//       const response = await fetch(
//         `https://7e3777787c19.ngrok-free.app/api/schemes?department=${categoryName}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//             'ngrok-skip-browser-warning': 'true'
//           }
//         }
//       );

//       const rawText = await response.text();
//       let data;
      
//       try {
//         data = JSON.parse(rawText);
//       } catch (parseError) {
//         throw new Error(`Server error: ${rawText.substring(0, 100)}`);
//       }
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Session expired. Please login again.');
//         }
//         throw new Error(data?.message || 'Failed to fetch schemes');
//       }
      
//       if (Array.isArray(data)) {
//         setSchemes(data);
//       } else if (data.results && Array.isArray(data.results)) {
//         setSchemes(data.results);
//       } else {
//         throw new Error('Invalid response format from server');
//       }
//     } catch (error) {
//       console.error('Error fetching schemes:', error);
//       Alert.alert('Error', error.message || 'Failed to load schemes. Please try again.');
//       setSchemes([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter categories based on search query
//   const filteredCategories = CATEGORIES.filter(cat =>
//     cat.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCategoryPress = async (categoryName) => {
//     setSelectedCategory(categoryName);
//     setCurrentScreen('category');
//     await fetchSchemesByCategory(categoryName);
//   };

//   const handleBackToExplore = () => {
//     setCurrentScreen('explore');
//     setSelectedCategory('All');
//     setSchemes([]);
//   };

//   const handleSchemeSelect = (scheme) => {
//     setSelectedScheme(scheme);
//     setCurrentScreen('details');
//   };

//   const handleBackToCategory = () => {
//     setCurrentScreen('category');
//     setSelectedScheme(null);
//   };

//   const handleApplyNow = () => {
//     Alert.alert('Success', 'Application process started!');
//     setCurrentScreen('category');
//   };

//   // Show scheme details screen
//   if (currentScreen === 'details' && selectedScheme) {
//     return (
//       <SchemeDetailsScreen
//         scheme={selectedScheme}
//         onBack={handleBackToCategory}
//         onApplyNow={handleApplyNow}
//       />
//     );
//   }

//   // Show category schemes screen
//   if (currentScreen === 'category') {
//     return (
//       <CategorySchemesScreen
//         category={selectedCategory}
//         schemes={schemes}
//         onBack={handleBackToExplore}
//         onSchemeSelect={handleSchemeSelect}
//         loading={loading}
//       />
//     );
//   }

//   // Show explore schemes screen (categories)
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
//       <Header 
//         onBack={onBack} 
//         searchQuery={searchQuery} 
//         setSearchQuery={setSearchQuery}
//         isSpeaking={isSpeaking}
//         stopVoiceGuidance={stopVoiceGuidance}
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Voice Guidance Controls */}
//         <View style={styles.voiceControlsContainer}>
//           <View style={styles.sectionHeader}>
//             <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
//             <Text style={styles.voiceSectionTitle}>Voice Guidance</Text>
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
//                 onValueChange={handleVoiceToggle}
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
//                   onPress={() => handleLanguageChange('english')}
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
//                   onPress={() => handleLanguageChange('hindi')}
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

//           {/* Replay and Stop Buttons */}
//           <View style={styles.voiceActionButtons}>
//             {isSpeaking ? (
//               <TouchableOpacity 
//                 style={styles.stopSpeakingButton}
//                 onPress={stopVoiceGuidance}
//               >
//                 <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
//                 <Text style={styles.stopSpeakingText}>Stop Voice</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity 
//                 style={styles.replayButton}
//                 onPress={handleReplayGuidance}
//                 disabled={!voiceEnabled}
//               >
//                 <MaterialCommunityIcons 
//                   name="replay" 
//                   size={20} 
//                   color={voiceEnabled ? "#1E3A8A" : "#CBD5E1"} 
//                 />
//                 <Text style={[
//                   styles.replayButtonText,
//                   !voiceEnabled && styles.replayButtonTextDisabled
//                 ]}>
//                   Replay Guidance
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Categories</Text>
        
//         {filteredCategories.length > 0 ? (
//           <View style={styles.gridContainer}>
//             {filteredCategories.map((cat) => (
//               <CategoryCard 
//                 key={cat.id} 
//                 data={cat} 
//                 onPress={handleCategoryPress}
//                 schemeCount={categoryCounts[cat.name]}
//                 isLoading={loading || isSpeaking}
//                 isHighlighted={currentHighlight === cat.id}
//                 pulseAnim={categoryAnims[cat.id]}
//               />
//             ))}
//           </View>
//         ) : (
//           <View style={styles.emptyState}>
//             <MaterialCommunityIcons name="folder-search-outline" size={64} color="#CBD5E1" />
//             <Text style={styles.emptyText}>No categories found</Text>
//           </View>
//         )}

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       <AIFloatingButton />
//     </SafeAreaView>
//   );
// };

// // --- Styles ---

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 16,
//     marginTop: 8,
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
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 12,
//   },
//   voiceSectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
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
//   voiceActionButtons: {
//     marginTop: 12,
//   },
//   stopSpeakingButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
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
//   replayButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#DBEAFE',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#93C5FD',
//   },
//   replayButtonText: {
//     fontSize: 14,
//     color: '#1E3A8A',
//     fontWeight: '600',
//   },
//   replayButtonTextDisabled: {
//     color: '#CBD5E1',
//   },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     justifyContent: 'space-between',
//   },
//   animatedCardWrapper: {
//     width: cardWidth,
//   },
//   card: {
//     width: '100%',
//     height: cardWidth * 1.1,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     borderWidth: 2,
//     borderColor: '#e5e7eb',
//     position: 'relative',
//   },
//   cardHighlighted: {
//     backgroundColor: '#FEF3C7',
//     borderColor: '#FCD34D',
//     borderWidth: 3,
//     elevation: 8,
//     shadowColor: '#F59E0B',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//   },
//   iconWrapper: {
//     marginBottom: 8,
//     width: 48,
//     height: 48,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1f2937',
//     textAlign: 'center',
//   },
//   countBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#1E3A8A',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//     minWidth: 20,
//     alignItems: 'center',
//   },
//   countText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   highlightIndicator: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#FFF',
//     padding: 4,
//     borderRadius: 12,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   headerContainer: {
//     backgroundColor: '#1E3A8A',
//     padding: 20,
//     paddingTop: Platform.OS === 'android' ? 40 : 20,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
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
//   headerIcons: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#EF4444',
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 8,
//     fontWeight: 'bold',
//   },
//   searchBar: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     height: 48,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1a2b5d',
//     fontWeight: '500',
//   },
//   emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 80,
//   },
//   emptyText: {
//     color: '#374151',
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#6b7280',
//     fontSize: 14,
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
//     elevation: 8,
//   },
//   fabInner: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   fabAiText: {
//     fontSize: 10,
//     fontWeight: '900',
//     color: '#1E3A8A',
//     marginBottom: -2,
//   },
//   // Scheme Card Styles
//   schemeCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   schemeCardHeader: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   schemeIconContainer: {
//     marginRight: 16,
//     justifyContent: 'center',
//   },
//   schemeIcon: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   schemeInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   schemeTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 4,
//   },
//   schemeDepartment: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginBottom: 4,
//   },
//   schemeTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   schemeTypeBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   schemeTypeText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   schemeDescription: {
//     fontSize: 13,
//     color: '#4b5563',
//     lineHeight: 18,
//     marginBottom: 12,
//   },
//   schemeDivider: {
//     height: 1,
//     backgroundColor: '#e5e7eb',
//     marginVertical: 12,
//   },
//   schemeFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   eligibilityContainer: {
//     flex: 1,
//   },
//   eligibilityLabel: {
//     fontSize: 10,
//     color: '#9ca3af',
//     marginBottom: 2,
//   },
//   eligibilityText: {
//     fontSize: 12,
//     color: '#4b5563',
//     fontWeight: '500',
//   },
//   applyButton: {
//     backgroundColor: '#1E3A8A',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   applyButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   clearButton: {
//     marginTop: 20,
//     backgroundColor: '#1E3A8A',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   clearButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default ExploreSchemes;

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
  Switch,
  Animated,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import SchemeDetailsScreen from './SchemeDetailsScreen';

const CATEGORIES = [
  { id: '1', name: 'Agriculture', icon: 'leaf', isHighlighted: false },
  { id: '2', name: 'Health', icon: 'medical', isHighlighted: false },
  { id: '3', name: 'Business', icon: 'briefcase', isHighlighted: false },
  { id: '4', name: 'Education', icon: 'book', isHighlighted: false },
  { id: '5', name: 'Women', icon: 'woman', isHighlighted: false },
  { id: '6', name: 'Housing', icon: 'home', isHighlighted: false },
  { id: '7', name: 'Science', icon: 'flask', isHighlighted: false },
  { id: '8', name: 'Sports', icon: 'basketball', isHighlighted: false },
  { id: '9', name: 'Public Safety', icon: 'shield-checkmark', isHighlighted: false },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 56) / 3;

// --- Sub Components DEFINED BEFORE MAIN COMPONENT ---

const Header = ({ onBack, searchQuery, setSearchQuery, isSpeaking, stopVoiceGuidance }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Explore Schemes</Text>

        <TouchableOpacity 
          onPress={isSpeaking ? stopVoiceGuidance : null}
          style={styles.headerIcons}
        >
          {isSpeaking && (
            <MaterialCommunityIcons name="volume-high" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search schemes..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="#94a3b8" />
      </View>
    </View>
  );
};

const CategoryCard = ({ data, onPress, schemeCount, isLoading, isHighlighted, pulseAnim }) => {
  return (
    <Animated.View
      style={[
        styles.animatedCardWrapper,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity 
        style={[
          styles.card,
          isHighlighted && styles.cardHighlighted
        ]}
        activeOpacity={0.7}
        onPress={() => onPress(data.name)}
        disabled={isLoading}
      >
        <View style={styles.iconWrapper}>
          <Ionicons 
            name={data.icon}
            size={36} 
            color="#374151"
          />
        </View>
        <Text style={styles.cardText}>{data.name}</Text>
        {schemeCount !== null && schemeCount > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{schemeCount}</Text>
          </View>
        )}
        {isHighlighted && (
          <View style={styles.highlightIndicator}>
            <MaterialCommunityIcons name="volume-high" size={16} color="#1E3A8A" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const AIFloatingButton = () => {
  return (
    <View style={styles.fab}>
      <View style={styles.fabInner}>
        <Text style={styles.fabAiText}>AI</Text>
        <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
      </View>
    </View>
  );
};

// Category Schemes List Screen Component
const CategorySchemesScreen = ({ category, schemes, onBack, onSchemeSelect, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = schemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (scheme) => {
    const dept = scheme.department.toLowerCase();
    const cat = category.toLowerCase();
    
    if (cat.includes('health') || dept.includes('health')) {
      return { name: 'medical', color: '#ef4444', bg: '#fee2e2' };
    } else if (cat.includes('business') || dept.includes('finance')) {
      return { name: 'gold', color: '#fbbf24', bg: '#fef3c7', library: 'MaterialCommunityIcons' };
    } else if (cat.includes('housing') || dept.includes('urban')) {
      return { name: 'home', color: '#f97316', bg: '#ffedd5' };
    } else if (cat.includes('agriculture') || dept.includes('agri')) {
      return { name: 'sprout', color: '#22c55e', bg: '#dcfce7', library: 'MaterialCommunityIcons' };
    } else if (cat.includes('education')) {
      return { name: 'school', color: '#3b82f6', bg: '#dbeafe' };
    } else if (cat.includes('sports')) {
      return { name: 'basketball', color: '#8b5cf6', bg: '#ede9fe' };
    } else if (cat.includes('science')) {
      return { name: 'flask', color: '#06b6d4', bg: '#cffafe' };
    } else if (cat.includes('women')) {
      return { name: 'woman', color: '#ec4899', bg: '#fce7f3' };
    } else if (cat.includes('safety')) {
      return { name: 'shield-checkmark', color: '#10b981', bg: '#d1fae5' };
    } else {
      return { name: 'file-document', color: '#6b7280', bg: '#e5e7eb', library: 'MaterialCommunityIcons' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{category} Schemes</Text>

          <View style={styles.headerIcons}>
            <View style={{ width: 40 }} />
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search schemes..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search" size={20} color="#94a3b8" />
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Loading {category} schemes...</Text>
        </View>
      ) : filteredSchemes.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="file-document-alert-outline" size={80} color="#9ca3af" />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No schemes found matching your search' : `No ${category} schemes available`}
          </Text>
          {searchQuery && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear Search</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredSchemes.map((scheme) => {
            const iconData = getIcon(scheme);
            const IconComponent = iconData.library === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;
            
            return (
              <View key={scheme.id} style={styles.schemeCard}>
                <View style={styles.schemeCardHeader}>
                  <View style={styles.schemeIconContainer}>
                    <View style={[styles.schemeIcon, { backgroundColor: iconData.bg }]}>
                      <IconComponent name={iconData.name} size={32} color={iconData.color} />
                    </View>
                  </View>
                  <View style={styles.schemeInfo}>
                    <Text style={styles.schemeTitle}>{scheme.name}</Text>
                    <Text style={styles.schemeDepartment}>{scheme.department}</Text>
                    <View style={styles.schemeTypeContainer}>
                      <View style={[
                        styles.schemeTypeBadge,
                        { backgroundColor: scheme.scheme_type === 'state' ? '#dbeafe' : '#fef3c7' }
                      ]}>
                        <Text style={[
                          styles.schemeTypeText,
                          { color: scheme.scheme_type === 'state' ? '#1e40af' : '#92400e' }
                        ]}>
                          {scheme.scheme_type.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text style={styles.schemeDescription} numberOfLines={2}>
                  {scheme.description}
                </Text>

                <View style={styles.schemeDivider} />

                <View style={styles.schemeFooter}>
                  <View style={styles.eligibilityContainer}>
                    <Text style={styles.eligibilityLabel}>Eligibility:</Text>
                    <Text style={styles.eligibilityText} numberOfLines={2}>
                      {scheme.eligibility}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={() => onSchemeSelect(scheme)}
                  >
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      <AIFloatingButton />
    </SafeAreaView>
  );
};

// --- MAIN COMPONENT ---

const ExploreSchemes = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentScreen, setCurrentScreen] = useState('explore'); // 'explore', 'category', or 'details'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});

  // Voice guidance states
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [language, setLanguage] = useState('english'); // 'english' or 'hindi'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(null); // category id being highlighted

  // Ref to track voiceEnabled during async operations
  const voiceEnabledRef = useRef(voiceEnabled);

  // Animation values for each category
  const [categoryAnims] = useState(
    CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = new Animated.Value(1);
      return acc;
    }, {})
  );

  // Update ref when voiceEnabled changes
  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    // If voice was disabled while speaking, stop immediately
    if (!voiceEnabled && isSpeaking) {
      stopVoiceGuidance();
    }
  }, [voiceEnabled]);

  // Fetch scheme count for each category on mount
  useEffect(() => {
    fetchAllCategoryCounts();
    
    // Play welcome guidance after component mounts
    const timer = setTimeout(() => {
      if (voiceEnabled) {
        playVoiceGuidance();
      }
    }, 800);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      Speech.stop();
    };
  }, []);

  // Animate highlighted category
  useEffect(() => {
    if (currentHighlight) {
      startPulseAnimation(categoryAnims[currentHighlight]);
    }
  }, [currentHighlight]);

  const startPulseAnimation = (animValue) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1.08,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = (animValue) => {
    animValue.stopAnimation();
    Animated.timing(animValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const playVoiceGuidance = async () => {
    if (!voiceEnabledRef.current) return;

    const messages = {
      english: {
        welcome: "Welcome to Explore Schemes. Here you can browse government schemes by category.",
        intro: "We have organized schemes into nine categories for easy access.",
        agriculture: "Agriculture category contains schemes for farmers and agricultural development.",
        health: "Health category includes medical and healthcare related schemes.",
        business: "Business category features schemes for entrepreneurs and business development.",
        education: "Education category offers schemes for students and educational institutions.",
        women: "Women category has schemes specifically designed for women empowerment.",
        housing: "Housing category contains schemes for home construction and urban development.",
        science: "Science category includes schemes for research and scientific development.",
        sports: "Sports category features schemes for athletes and sports development.",
        safety: "Public Safety category includes schemes for security and safety initiatives.",
        outro: "Tap on any category to explore the schemes available.",
      },
      hindi: {
        welcome: "योजनाओं का अन्वेषण करें में आपका स्वागत है। यहां आप श्रेणी के अनुसार सरकारी योजनाओं को ब्राउज़ कर सकते हैं।",
        intro: "हमने आसान पहुंच के लिए योजनाओं को नौ श्रेणियों में व्यवस्थित किया है।",
        agriculture: "कृषि श्रेणी में किसानों और कृषि विकास के लिए योजनाएं हैं।",
        health: "स्वास्थ्य श्रेणी में चिकित्सा और स्वास्थ्य संबंधी योजनाएं शामिल हैं।",
        business: "व्यवसाय श्रेणी में उद्यमियों और व्यवसाय विकास के लिए योजनाएं हैं।",
        education: "शिक्षा श्रेणी छात्रों और शैक्षिक संस्थानों के लिए योजनाएं प्रदान करती है।",
        women: "महिला श्रेणी में महिला सशक्तिकरण के लिए विशेष रूप से डिज़ाइन की गई योजनाएं हैं।",
        housing: "आवास श्रेणी में घर निर्माण और शहरी विकास के लिए योजनाएं हैं।",
        science: "विज्ञान श्रेणी में अनुसंधान और वैज्ञानिक विकास के लिए योजनाएं शामिल हैं।",
        sports: "खेल श्रेणी में एथलीटों और खेल विकास के लिए योजनाएं हैं।",
        safety: "सार्वजनिक सुरक्षा श्रेणी में सुरक्षा और सुरक्षा पहल के लिए योजनाएं शामिल हैं।",
        outro: "उपलब्ध योजनाओं का पता लगाने के लिए किसी भी श्रेणी पर टैप करें।",
      },
    };

    try {
      setIsSpeaking(true);
      const languageCode = language === 'hindi' ? 'hi-IN' : 'en-US';

      // Welcome message
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await speakMessage(messages[language].welcome, languageCode);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await delay(500);

      // Intro
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await speakMessage(messages[language].intro, languageCode);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await delay(800);

      // Go through each category
      const categoryMessageKeys = [
        'agriculture', 'health', 'business', 'education', 
        'women', 'housing', 'science', 'sports', 'safety'
      ];

      for (let i = 0; i < CATEGORIES.length; i++) {
        // Check if voice is still enabled
        if (!voiceEnabledRef.current) throw new Error('Voice disabled');
        
        const category = CATEGORIES[i];
        const messageKey = categoryMessageKeys[i];
        
        // Highlight current category
        setCurrentHighlight(category.id);
        
        // Speak about the category
        await speakMessage(messages[language][messageKey], languageCode);
        
        // Check again after speaking
        if (!voiceEnabledRef.current) throw new Error('Voice disabled');
        
        // Remove highlight
        setCurrentHighlight(null);
        stopPulseAnimation(categoryAnims[category.id]);
        
        // Small pause between categories
        await delay(400);
      }

      // Outro message
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await speakMessage(messages[language].outro, languageCode);

      setIsSpeaking(false);
    } catch (error) {
      if (error.message !== 'Voice disabled') {
        console.error('Error playing voice guidance:', error);
      }
      setIsSpeaking(false);
      setCurrentHighlight(null);
      // Stop all animations
      Object.values(categoryAnims).forEach(anim => stopPulseAnimation(anim));
    }
  };

  const speakMessage = (message, languageCode) => {
    return new Promise((resolve, reject) => {
      Speech.speak(message, {
        language: languageCode,
        pitch: 1.0,
        rate: 0.85,
        onDone: resolve,
        onStopped: resolve,
        onError: reject,
      });
    });
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const stopVoiceGuidance = async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
      setCurrentHighlight(null);
      // Stop all animations
      Object.values(categoryAnims).forEach(anim => stopPulseAnimation(anim));
    } catch (error) {
      console.error('Error stopping voice guidance:', error);
    }
  };

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    await stopVoiceGuidance();
  };

  const handleVoiceToggle = async (value) => {
    setVoiceEnabled(value);
    voiceEnabledRef.current = value; // Update ref immediately
    if (!value) {
      await stopVoiceGuidance();
    }
  };

  const handleReplayGuidance = async () => {
    await stopVoiceGuidance();
    setTimeout(() => {
      if (voiceEnabledRef.current) {
        playVoiceGuidance();
      }
    }, 300);
  };

  const fetchAllCategoryCounts = async () => {
    try {
      const token = await AsyncStorage.getItem('@access_token');
      if (!token) return;

      const counts = {};
      
      // Fetch count for each category
      for (const category of CATEGORIES) {
        try {
          const response = await fetch(
            `https://cdfd8e09fcfe.ngrok-free.app/api/schemes?department=${category.name}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
              }
            }
          );

          if (response.ok) {
            const rawText = await response.text();
            let data;
            
            try {
              data = JSON.parse(rawText);
              const schemeArray = Array.isArray(data) ? data : (data.results || []);
              counts[category.name] = schemeArray.length;
            } catch (parseError) {
              counts[category.name] = 0;
            }
          } else {
            counts[category.name] = 0;
          }
        } catch (error) {
          counts[category.name] = 0;
        }
      }

      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error fetching category counts:', error);
    }
  };

  const fetchSchemesByCategory = async (categoryName) => {
    try {
      setLoading(true);
      
      const token = await AsyncStorage.getItem('@access_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch(
        `https://cdfd8e09fcfe.ngrok-free.app/api/schemes?department=${categoryName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      const rawText = await response.text();
      let data;
      
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error(`Server error: ${rawText.substring(0, 100)}`);
      }
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data?.message || 'Failed to fetch schemes');
      }
      
      if (Array.isArray(data)) {
        setSchemes(data);
      } else if (data.results && Array.isArray(data.results)) {
        setSchemes(data.results);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error fetching schemes:', error);
      Alert.alert('Error', error.message || 'Failed to load schemes. Please try again.');
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search query
  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = async (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentScreen('category');
    await fetchSchemesByCategory(categoryName);
  };

  const handleBackToExplore = () => {
    setCurrentScreen('explore');
    setSelectedCategory('All');
    setSchemes([]);
  };

  const handleSchemeSelect = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentScreen('details');
  };

  const handleBackToCategory = () => {
    setCurrentScreen('category');
    setSelectedScheme(null);
  };

  const handleApplyNow = () => {
    Alert.alert('Success', 'Application process started!');
    setCurrentScreen('category');
  };

  // Show scheme details screen
  if (currentScreen === 'details' && selectedScheme) {
    return (
      <SchemeDetailsScreen
        scheme={selectedScheme}
        onBack={handleBackToCategory}
        onApplyNow={handleApplyNow}
      />
    );
  }

  // Show category schemes screen
  if (currentScreen === 'category') {
    return (
      <CategorySchemesScreen
        category={selectedCategory}
        schemes={schemes}
        onBack={handleBackToExplore}
        onSchemeSelect={handleSchemeSelect}
        loading={loading}
      />
    );
  }

  // Show explore schemes screen (categories)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      <Header 
        onBack={onBack} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        isSpeaking={isSpeaking}
        stopVoiceGuidance={stopVoiceGuidance}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Voice Guidance Controls */}
        <View style={styles.voiceControlsContainer}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
            <Text style={styles.voiceSectionTitle}>Voice Guidance</Text>
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
                onValueChange={handleVoiceToggle}
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
                  onPress={() => handleLanguageChange('english')}
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
                  onPress={() => handleLanguageChange('hindi')}
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

          {/* Replay and Stop Buttons */}
          <View style={styles.voiceActionButtons}>
            {isSpeaking ? (
              <TouchableOpacity 
                style={styles.stopSpeakingButton}
                onPress={stopVoiceGuidance}
              >
                <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
                <Text style={styles.stopSpeakingText}>Stop Voice</Text>
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
                  Replay Guidance
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        
        {filteredCategories.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredCategories.map((cat) => (
              <CategoryCard 
                key={cat.id} 
                data={cat} 
                onPress={handleCategoryPress}
                schemeCount={categoryCounts[cat.name]}
                isLoading={loading || isSpeaking}
                isHighlighted={currentHighlight === cat.id}
                pulseAnim={categoryAnims[cat.id]}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="folder-search-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>No categories found</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <AIFloatingButton />
    </SafeAreaView>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    marginTop: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  voiceSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  animatedCardWrapper: {
    width: cardWidth,
  },
  card: {
    width: '100%',
    height: cardWidth * 1.1,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  cardHighlighted: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    borderWidth: 3,
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  iconWrapper: {
    marginBottom: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  highlightIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFF',
    padding: 4,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContainer: {
    backgroundColor: '#1E3A8A',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  headerIcons: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a2b5d',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
    fontSize: 14,
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
    elevation: 8,
  },
  fabInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabAiText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#1E3A8A',
    marginBottom: -2,
  },
  // Scheme Card Styles
  schemeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  schemeCardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  schemeIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  schemeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  schemeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  schemeDepartment: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  schemeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  schemeTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  schemeTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  schemeDescription: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  schemeDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  schemeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eligibilityContainer: {
    flex: 1,
  },
  eligibilityLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 2,
  },
  eligibilityText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#1E3A8A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ExploreSchemes;