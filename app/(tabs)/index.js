
// import React, { useState, useEffect } from 'react';
// import { 
//   StyleSheet, 
//   Text, 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   StatusBar, 
//   Platform,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authenticatedFetch } from '../Tokenutils';
// import { API_ENDPOINTS } from '../Config';
// // Import all your screen components
// import ComplaintFormScreen from '../ComplaintFormScreen';
// import SchemesScreen from '../SchemesScreen';
// import { AuthChoiceScreen, SignInScreen } from '../AuthScreens';
// import JobUpdateScreen from '../JobUpdateScreen';
// import NewsScreen from '../NewsScreen';
// import HelplineScreen from '../HelplineScreen';
// import DocumentsScreen from '../DocumentsScreen';
// import StatusScreen from '../StatusScreen';
// import ChatbotScreen from '../chatbot';
// import ProfileScreen from '../ProfileScreen'; // Add your ProfileScreen import

// // --- DASHBOARD HOME SCREEN ---
// const DashboardHomeScreen = ({ onNavigate, onLogout }) => {
//   const quickAccessItems = [
//     { id: 'schemes', label: 'Schemes', icon: 'file-document-edit-outline', lib: MaterialCommunityIcons },
//     { id: 'complaints', label: 'Complaints', icon: 'comment-alert-outline', lib: MaterialCommunityIcons },
//     { id: 'jobs', label: 'Job Updates', icon: 'briefcase-search-outline', lib: MaterialCommunityIcons },
//     { id: 'news', label: 'News', icon: 'newspaper-variant-outline', lib: MaterialCommunityIcons },
//     { id: 'documents', label: 'Documents', icon: 'file-document-multiple-outline', lib: MaterialCommunityIcons },
//     { id: 'helpline', label: 'Helpline', icon: 'phone-in-talk-outline', lib: MaterialCommunityIcons },
//   ];

//   const handleQuickAccessPress = (itemId) => {
//     console.log('Quick access pressed:', itemId);
//     switch(itemId) {
//       case 'schemes':
//         onNavigate('schemes');
//         break;
//       case 'complaints':
//         onNavigate('complaint_form');
//         break;
//       case 'jobs':
//         onNavigate('job_updates');
//         break;
//       case 'news':
//         onNavigate('news');
//         break;
//       case 'documents':
//         onNavigate('documents');
//         break;
//       case 'helpline':
//         onNavigate('helpline');
//         break;
//       default:
//         console.log('Unknown item:', itemId);
//     }
//   };

//   return (
//     <View style={styles.dashContainer}>
//       <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
//       <View style={styles.dashHeader}>
//         <View style={styles.dashHeaderTop}>
//           <View style={styles.dashLogoContainer}>
//              <MaterialCommunityIcons name="bank" size={24} color="#1E3A8A" />
//           </View>
//           <View style={styles.dashHeaderIcons}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="notifications-outline" size={24} color="#FFF" />
//               <View style={styles.notificationBadge}><Text style={styles.badgeText}>1</Text></View>
//             </TouchableOpacity>
//             {/* Profile Button - Navigate to Profile Screen */}
//             <TouchableOpacity 
//               style={styles.profileButton} 
//               onPress={() => onNavigate('profile')}
//             >
//               <View style={styles.avatarCircle} />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <Text style={styles.greetingText}>hello, janhavi</Text>
        
//         <View style={styles.searchBarContainer}>
//           <Text style={styles.searchPlaceholder}>Search</Text>
//           <Ionicons name="search" size={20} color="#6B7280" />
//         </View>
//       </View>

//       <ScrollView 
//         style={styles.dashScrollView} 
//         contentContainerStyle={styles.dashContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.bannerContainer}>
//           <View style={styles.bannerPlaceholder}>
//             <MaterialCommunityIcons name="school" size={40} color="#FFF" style={{opacity: 0.8}} />
//             <Text style={styles.bannerTextMain}>समग्र शिक्षा</Text>
//             <Text style={styles.bannerTextSub}>Samagra Shiksha</Text>
//             <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: -20 }]} />
//             <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: 40 }]} />
//           </View>
//         </View>

//         <Text style={styles.sectionHeading}>Quick Access</Text>
//         <View style={styles.quickAccessGrid}>
//           {quickAccessItems.map((item) => {
//             const IconComponent = item.lib;
//             return (
//               <TouchableOpacity 
//                 key={item.id} 
//                 style={styles.quickAccessCard}
//                 onPress={() => handleQuickAccessPress(item.id)}
//               >
//                 <IconComponent name={item.icon} size={32} color="#4B5563" />
//                 <Text style={styles.quickAccessLabel}>{item.label}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View style={styles.bottomActionRow}>
//           {/* Check Status Button */}
//           <TouchableOpacity 
//             style={styles.checkStatusBtn}
//             activeOpacity={0.7}
//             onPress={() => {
//               console.log('Check Status pressed');
//               onNavigate('status');
//             }}
//           >
//             <Text style={styles.checkStatusBtnText}>Check Status</Text>
//           </TouchableOpacity>
          
//           {/* AI Chatbot Button */}
//           <TouchableOpacity 
//             style={styles.aiBotBtn}
//             activeOpacity={0.7}
//             onPress={() => {
//               console.log('Chatbot pressed');
//               onNavigate('chatbot');
//             }}
//           >
//             <MaterialCommunityIcons name="message-text-outline" size={24} color="#1E3A8A" />
//             <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI</Text></View>
//           </TouchableOpacity>
//         </View>

//         <View style={{height: 100}} /> 
//       </ScrollView>

//       <View style={styles.bgPatternContainer} pointerEvents="none">
//          <MaterialCommunityIcons name="cube-outline" size={100} color="#E0E7FF" style={{position:'absolute', bottom: 100, left: -20, opacity: 0.5}} />
//          <MaterialCommunityIcons name="city-variant-outline" size={150} color="#E0E7FF" style={{position:'absolute', bottom: 50, right: -30, opacity: 0.3}} />
//       </View>
//     </View>
//   );
// };

// // --- MAIN COMPONENT WITH AUTH ---
// export const DashboardScreen = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authScreen, setAuthScreen] = useState('choice');
//   const [screen, setScreen] = useState('dashboard');
//   const [activeTab, setActiveTab] = useState('home');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const token = await AsyncStorage.getItem('@access_token');
//       setIsAuthenticated(!!token);
//     } catch (error) {
//       console.error('Auth check error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignIn = async (mobile, password) => {
//     try {
//       console.log('Attempting login with:', mobile);
      
//       const response = await authenticatedFetch(
//         'https://fe7a9c807ba2.ngrok-free.app/api/auth/token/',
//         {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true'
//           },
//           body: JSON.stringify({
//             username: mobile,
//             password,
//           }),
//         }
//       );

//       console.log('Response status:', response.status);

//       const rawText = await response.text();
//       console.log('Raw response:', rawText);

//       let data;
//       try {
//         data = JSON.parse(rawText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         throw new Error(`Server error: ${rawText.substring(0, 100)}...`);
//       }

//       if (!response.ok) {
//         const message = data?.detail || data?.message || 'Invalid credentials';
//         throw new Error(message);
//       }

//       if (!data?.access || !data?.refresh) {
//         throw new Error('Invalid server response - missing tokens');
//       }

//       await AsyncStorage.setItem('@access_token', data.access);
//       await AsyncStorage.setItem('@refresh_token', data.refresh);
      
//       setIsAuthenticated(true);
//       Alert.alert('Success', 'Login successful!');
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Login Failed', error.message);
//       throw error;
//     }
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await AsyncStorage.removeItem('@access_token');
//               await AsyncStorage.removeItem('@refresh_token');
//               setIsAuthenticated(false);
//               setAuthScreen('choice');
//               setScreen('dashboard');
//               setActiveTab('home');
//             } catch (error) {
//               console.error('Logout error:', error);
//               Alert.alert('Error', 'Failed to logout');
//             }
//           }
//         }
//       ]
//     );
//   };

//   const handleTabPress = (tabId) => {
//     setActiveTab(tabId);
//     switch(tabId) {
//       case 'home':
//         setScreen('dashboard');
//         break;
//       case 'schemes':
//         setScreen('schemes');
//         break;
//       case 'jobs':
//         setScreen('job_updates');
//         break;
//       case 'menu':
//         Alert.alert('Menu', 'Menu screen coming soon!');
//         break;
//       default:
//         setScreen('dashboard');
//     }
//   };

//   // Determine if bottom nav should be shown
//   const shouldShowBottomNav = () => {
//     const screensWithoutNav = [
//       'chatbot', 
//       'complaint_form', 
//       'status', 
//       'news', 
//       'helpline', 
//       'documents', 
//       'profile'
//     ];
//     return !screensWithoutNav.includes(screen);
//   };

//   const renderScreen = () => {
//     switch(screen) {
//       case 'dashboard':
//         return (
//           <DashboardHomeScreen 
//             onNavigate={setScreen} 
//             onLogout={handleLogout} 
//           />
//         );
//       case 'profile':
//         return (
//           <ProfileScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }}
//             onLogout={handleLogout}
//           />
//         );
//       case 'complaint_form':
//         return (
//           <ComplaintFormScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'schemes':
//         return (
//           <SchemesScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'job_updates':
//         return (
//           <JobUpdateScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'news':
//         return (
//           <NewsScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'helpline':
//         return (
//           <HelplineScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'documents':
//         return (
//           <DocumentsScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'status':
//         return (
//           <StatusScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'chatbot':
//         return (
//           <ChatbotScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       default:
//         return (
//           <DashboardHomeScreen 
//             onNavigate={setScreen} 
//             onLogout={handleLogout} 
//           />
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.mainContainer, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#1E3A8A" />
//       </View>
//     );
//   }

//   // Show auth screens if not authenticated
//   if (!isAuthenticated) {
//     if (authScreen === 'choice') {
//       return (
//         <AuthChoiceScreen 
//           onSignIn={() => setAuthScreen('signin')}
//           onCreateAccount={() => Alert.alert('Info', 'Account creation is currently disabled')}
//         />
//       );
//     }
//     if (authScreen === 'signin') {
//       return (
//         <SignInScreen
//           onBack={() => setAuthScreen('choice')}
//           onSubmit={handleSignIn}
//         />
//       );
//     }
//   }

//   // Show main app if authenticated
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.mainContent}>
//         {renderScreen()}
//       </View>

//       {/* Conditionally render bottom navigation */}
//       {shouldShowBottomNav() && (
//         <View style={styles.bottomNav}>
//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('home')}>
//             <View style={[styles.navIconContainer, activeTab === 'home' && styles.navIconActive]}>
//               <Ionicons name="home" size={24} color={activeTab === 'home' ? "#FFF" : "#6B7280"} />
//             </View>
//             <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('schemes')}>
//             <MaterialCommunityIcons name="file-document-outline" size={24} color={activeTab === 'schemes' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'schemes' && styles.navLabelActive]}>Schemes</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('jobs')}>
//             <MaterialCommunityIcons name="briefcase-search-outline" size={24} color={activeTab === 'jobs' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'jobs' && styles.navLabelActive]}>Jobs</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('menu')}>
//             <MaterialCommunityIcons name="view-grid-outline" size={24} color={activeTab === 'menu' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'menu' && styles.navLabelActive]}>Menu</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   mainContent: {
//     flex: 1,
//   },
//   centerContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dashContainer: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   dashHeader: {
//     backgroundColor: '#1E3A8A',
//     paddingTop: Platform.OS === 'android' ? 40 : 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   dashHeaderTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   dashLogoContainer: {
//     backgroundColor: '#E0E7FF',
//     padding: 8,
//     borderRadius: 8,
//   },
//   dashHeaderIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   iconButton: {
//     position: 'relative',
//   },
//   profileButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     backgroundColor: '#EF4444',
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#1E3A8A',
//   },
//   badgeText: {
//     color: '#FFF',
//     fontSize: 8,
//     fontWeight: 'bold',
//   },
//   avatarCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#D1D5DB',
//   },
//   greetingText: {
//     color: '#FFF',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   searchBarContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     height: 48,
//   },
//   searchPlaceholder: {
//     flex: 1,
//     color: '#374151',
//     fontSize: 14,
//   },
//   dashScrollView: {
//     flex: 1,
//     zIndex: 10,
//   },
//   dashContent: {
//     padding: 20,
//   },
//   bannerContainer: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 25,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bannerPlaceholder: {
//     height: 160,
//     backgroundColor: '#0F172A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   bannerTextMain: {
//     color: '#F97316',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   bannerTextSub: {
//     color: '#FFF',
//     fontSize: 14,
//     marginTop: 2,
//     fontStyle: 'italic',
//   },
//   bannerOverlayLine: {
//     position: 'absolute',
//     width: 300,
//     height: 20,
//     backgroundColor: '#FFF',
//     opacity: 0.1,
//   },
//   sectionHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     marginBottom: 15,
//   },
//   quickAccessGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 4,
//     marginBottom: 40,
//   },
//   quickAccessCard: {
//     width: '31%',
//     aspectRatio: 1,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   quickAccessLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#374151',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   bottomActionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   checkStatusBtn: {
//     flex: 1,
//     backgroundColor: '#1E3A8A',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginRight: 20,
//     elevation: 3,
//   },
//   checkStatusBtnText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   aiBotBtn: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#FDE047',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     position: 'relative',
//   },
//   aiBadge: {
//     position: 'absolute',
//     bottom: -5,
//     right: -5,
//     backgroundColor: '#F59E0B',
//     borderRadius: 10,
//     paddingHorizontal: 4,
//     paddingVertical: 1,
//   },
//   aiBadgeText: {
//     color: '#FFF',
//     fontSize: 9,
//     fontWeight: 'bold',
//   },
//   bgPatternContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 300,
//     overflow: 'hidden',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     paddingVertical: 10,
//     paddingBottom: Platform.OS === 'ios' ? 25 : 10,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     zIndex: 100
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   navIconContainer: {
//     padding: 6,
//     borderRadius: 20,
//   },
//   navIconActive: {
//     backgroundColor: '#818CF8',
//   },
//   navLabel: {
//     fontSize: 10,
//     color: '#6B7280',
//     marginTop: 2,
//     fontWeight: '500',
//   },
//   navLabelActive: {
//     color: '#1E3A8A',
//     fontWeight: '700',
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { 
//   StyleSheet, 
//   Text, 
//   View, 
//   ScrollView, 
//   TouchableOpacity, 
//   StatusBar, 
//   Platform,
//   Alert,
//   ActivityIndicator,
//   Modal
// } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { authenticatedFetch } from '../Tokenutils';
// import { API_ENDPOINTS } from '../Config';
// // Import all your screen components
// import ComplaintFormScreen from '../ComplaintFormScreen';
// import SchemesScreen from '../SchemesScreen';
// import { AuthChoiceScreen, SignInScreen } from '../AuthScreens';
// import JobUpdateScreen from '../JobUpdateScreen';
// import NewsScreen from '../NewsScreen';
// import HelplineScreen from '../HelplineScreen';
// import DocumentsScreen from '../DocumentsScreen';
// import StatusScreen from '../StatusScreen';
// import ChatbotScreen from '../chatbot';
// import ProfileScreen from '../ProfileScreen';

// // Translations object
// const translations = {
//   english: {
//     // Header
//     hello: 'hello',
//     search: 'Search',
    
//     // Banner
//     bannerMain: 'Samagra Shiksha',
//     bannerSub: 'समग्र शिक्षा',
    
//     // Quick Access
//     quickAccess: 'Quick Access',
//     schemes: 'Schemes',
//     complaints: 'Complaints',
//     jobUpdates: 'Job Updates',
//     news: 'News',
//     documents: 'Documents',
//     helpline: 'Helpline',
    
//     // Bottom Actions
//     checkStatus: 'Check Status',
    
//     // Bottom Navigation
//     home: 'Home',
//     jobs: 'Jobs',
//     menu: 'Menu',
    
//     // Modal
//     selectLanguage: 'Select Language',
//     close: 'Close',
    
//     // Alerts
//     menuComingSoon: 'Menu screen coming soon!',
//     logout: 'Logout',
//     logoutConfirm: 'Are you sure you want to logout?',
//     cancel: 'Cancel',
//     success: 'Success',
//     loginSuccessful: 'Login successful!',
//     loginFailed: 'Login Failed',
//     error: 'Error',
//     failedToLogout: 'Failed to logout',
//     accountCreationDisabled: 'Account creation is currently disabled',
//     info: 'Info',
//   },
//   hindi: {
//     // Header
//     hello: 'नमस्ते',
//     search: 'खोजें',
    
//     // Banner
//     bannerMain: 'समग्र शिक्षा',
//     bannerSub: 'Samagra Shiksha',
    
//     // Quick Access
//     quickAccess: 'त्वरित पहुंच',
//     schemes: 'योजनाएं',
//     complaints: 'शिकायतें',
//     jobUpdates: 'नौकरी अपडेट',
//     news: 'समाचार',
//     documents: 'दस्तावेज़',
//     helpline: 'हेल्पलाइन',
    
//     // Bottom Actions
//     checkStatus: 'स्थिति जांचें',
    
//     // Bottom Navigation
//     home: 'होम',
//     jobs: 'नौकरियां',
//     menu: 'मेनू',
    
//     // Modal
//     selectLanguage: 'भाषा चुनें',
//     close: 'बंद करें',
    
//     // Alerts
//     menuComingSoon: 'मेनू स्क्रीन जल्द आ रही है!',
//     logout: 'लॉगआउट',
//     logoutConfirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
//     cancel: 'रद्द करें',
//     success: 'सफलता',
//     loginSuccessful: 'लॉगिन सफल!',
//     loginFailed: 'लॉगिन विफल',
//     error: 'त्रुटि',
//     failedToLogout: 'लॉगआउट विफल',
//     accountCreationDisabled: 'खाता निर्माण वर्तमान में अक्षम है',
//     info: 'जानकारी',
//   },
//   marathi: {
//     // Header
//     hello: 'नमस्कार',
//     search: 'शोधा',
    
//     // Banner
//     bannerMain: 'समग्र शिक्षा',
//     bannerSub: 'Samagra Shiksha',
    
//     // Quick Access
//     quickAccess: 'द्रुत प्रवेश',
//     schemes: 'योजना',
//     complaints: 'तक्रारी',
//     jobUpdates: 'नोकरी अपडेट',
//     news: 'बातम्या',
//     documents: 'कागदपत्रे',
//     helpline: 'हेल्पलाइन',
    
//     // Bottom Actions
//     checkStatus: 'स्थिती तपासा',
    
//     // Bottom Navigation
//     home: 'होम',
//     jobs: 'नोकऱ्या',
//     menu: 'मेनू',
    
//     // Modal
//     selectLanguage: 'भाषा निवडा',
//     close: 'बंद करा',
    
//     // Alerts
//     menuComingSoon: 'मेनू स्क्रीन लवकरच येत आहे!',
//     logout: 'लॉगआउट',
//     logoutConfirm: 'तुम्हाला खात्री आहे की तुम्ही लॉगआउट करू इच्छिता?',
//     cancel: 'रद्द करा',
//     success: 'यश',
//     loginSuccessful: 'लॉगिन यशस्वी!',
//     loginFailed: 'लॉगिन अयशस्वी',
//     error: 'त्रुटी',
//     failedToLogout: 'लॉगआउट अयशस्वी',
//     accountCreationDisabled: 'खाते तयार करणे सध्या अक्षम आहे',
//     info: 'माहिती',
//   },
// };

// // --- DASHBOARD HOME SCREEN ---
// const DashboardHomeScreen = ({ onNavigate, onLogout, language, setShowLanguageModal }) => {
//   const t = translations[language];
  
//   const quickAccessItems = [
//     { id: 'schemes', label: t.schemes, icon: 'file-document-edit-outline', lib: MaterialCommunityIcons },
//     { id: 'complaints', label: t.complaints, icon: 'comment-alert-outline', lib: MaterialCommunityIcons },
//     { id: 'jobs', label: t.jobUpdates, icon: 'briefcase-search-outline', lib: MaterialCommunityIcons },
//     { id: 'news', label: t.news, icon: 'newspaper-variant-outline', lib: MaterialCommunityIcons },
//     { id: 'documents', label: t.documents, icon: 'file-document-multiple-outline', lib: MaterialCommunityIcons },
//     { id: 'helpline', label: t.helpline, icon: 'phone-in-talk-outline', lib: MaterialCommunityIcons },
//   ];

//   const handleQuickAccessPress = (itemId) => {
//     console.log('Quick access pressed:', itemId);
//     switch(itemId) {
//       case 'schemes':
//         onNavigate('schemes');
//         break;
//       case 'complaints':
//         onNavigate('complaint_form');
//         break;
//       case 'jobs':
//         onNavigate('job_updates');
//         break;
//       case 'news':
//         onNavigate('news');
//         break;
//       case 'documents':
//         onNavigate('documents');
//         break;
//       case 'helpline':
//         onNavigate('helpline');
//         break;
//       default:
//         console.log('Unknown item:', itemId);
//     }
//   };

//   return (
//     <View style={styles.dashContainer}>
//       <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
//       <View style={styles.dashHeader}>
//         <View style={styles.dashHeaderTop}>
//           <View style={styles.dashLogoContainer}>
//              <MaterialCommunityIcons name="bank" size={24} color="#1E3A8A" />
//           </View>
//           <View style={styles.dashHeaderIcons}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="notifications-outline" size={24} color="#FFF" />
//               <View style={styles.notificationBadge}><Text style={styles.badgeText}>1</Text></View>
//             </TouchableOpacity>
//             {/* Language Button */}
//             <TouchableOpacity 
//               style={styles.languageIconButton}
//               onPress={() => setShowLanguageModal(true)}
//             >
//               <MaterialCommunityIcons name="translate" size={24} color="#FFF" />
//             </TouchableOpacity>
//             {/* Profile Button */}
//             <TouchableOpacity 
//               style={styles.profileButton} 
//               onPress={() => onNavigate('profile')}
//             >
//               <View style={styles.avatarCircle} />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <Text style={styles.greetingText}>{t.hello}, janhavi</Text>
        
//         <View style={styles.searchBarContainer}>
//           <Text style={styles.searchPlaceholder}>{t.search}</Text>
//           <Ionicons name="search" size={20} color="#6B7280" />
//         </View>
//       </View>

//       <ScrollView 
//         style={styles.dashScrollView} 
//         contentContainerStyle={styles.dashContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.bannerContainer}>
//           <View style={styles.bannerPlaceholder}>
//             <MaterialCommunityIcons name="school" size={40} color="#FFF" style={{opacity: 0.8}} />
//             <Text style={styles.bannerTextMain}>{t.bannerMain}</Text>
//             <Text style={styles.bannerTextSub}>{t.bannerSub}</Text>
//             <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: -20 }]} />
//             <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: 40 }]} />
//           </View>
//         </View>

//         <Text style={styles.sectionHeading}>{t.quickAccess}</Text>
//         <View style={styles.quickAccessGrid}>
//           {quickAccessItems.map((item) => {
//             const IconComponent = item.lib;
//             return (
//               <TouchableOpacity 
//                 key={item.id} 
//                 style={styles.quickAccessCard}
//                 onPress={() => handleQuickAccessPress(item.id)}
//               >
//                 <IconComponent name={item.icon} size={32} color="#4B5563" />
//                 <Text style={styles.quickAccessLabel}>{item.label}</Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View style={styles.bottomActionRow}>
//           {/* Check Status Button */}
//           <TouchableOpacity 
//             style={styles.checkStatusBtn}
//             activeOpacity={0.7}
//             onPress={() => {
//               console.log('Check Status pressed');
//               onNavigate('status');
//             }}
//           >
//             <Text style={styles.checkStatusBtnText}>{t.checkStatus}</Text>
//           </TouchableOpacity>
          
//           {/* AI Chatbot Button */}
//           <TouchableOpacity 
//             style={styles.aiBotBtn}
//             activeOpacity={0.7}
//             onPress={() => {
//               console.log('Chatbot pressed');
//               onNavigate('chatbot');
//             }}
//           >
//             <MaterialCommunityIcons name="message-text-outline" size={24} color="#1E3A8A" />
//             <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI</Text></View>
//           </TouchableOpacity>
//         </View>

//         <View style={{height: 100}} /> 
//       </ScrollView>

//       <View style={styles.bgPatternContainer} pointerEvents="none">
//          <MaterialCommunityIcons name="cube-outline" size={100} color="#E0E7FF" style={{position:'absolute', bottom: 100, left: -20, opacity: 0.5}} />
//          <MaterialCommunityIcons name="city-variant-outline" size={150} color="#E0E7FF" style={{position:'absolute', bottom: 50, right: -30, opacity: 0.3}} />
//       </View>
//     </View>
//   );
// };

// // --- MAIN COMPONENT WITH AUTH ---
// export const DashboardScreen = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authScreen, setAuthScreen] = useState('choice');
//   const [screen, setScreen] = useState('dashboard');
//   const [activeTab, setActiveTab] = useState('home');
//   const [loading, setLoading] = useState(true);
//   const [language, setLanguage] = useState('english');
//   const [showLanguageModal, setShowLanguageModal] = useState(false);

//   const t = translations[language];

//   useEffect(() => {
//     checkAuth();
//     loadLanguagePreference();
//   }, []);

//   const loadLanguagePreference = async () => {
//     try {
//       const savedLanguage = await AsyncStorage.getItem('@language_preference');
//       if (savedLanguage) {
//         setLanguage(savedLanguage);
//       }
//     } catch (error) {
//       console.error('Error loading language preference:', error);
//     }
//   };

//   const handleLanguageChange = async (newLanguage) => {
//     setLanguage(newLanguage);
//     setShowLanguageModal(false);
//     try {
//       await AsyncStorage.setItem('@language_preference', newLanguage);
//     } catch (error) {
//       console.error('Error saving language preference:', error);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const token = await AsyncStorage.getItem('@access_token');
//       setIsAuthenticated(!!token);
//     } catch (error) {
//       console.error('Auth check error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignIn = async (mobile, password) => {
//     try {
//       console.log('Attempting login with:', mobile);
      
//       const response = await authenticatedFetch(
//         'https://b96570f5b678.ngrok-free.app/api/auth/token/',
//         {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true'
//           },
//           body: JSON.stringify({
//             username: mobile,
//             password,
//           }),
//         }
//       );

//       console.log('Response status:', response.status);

//       const rawText = await response.text();
//       console.log('Raw response:', rawText);

//       let data;
//       try {
//         data = JSON.parse(rawText);
//       } catch (parseError) {
//         console.error('Failed to parse JSON:', parseError);
//         throw new Error(`Server error: ${rawText.substring(0, 100)}...`);
//       }

//       if (!response.ok) {
//         const message = data?.detail || data?.message || 'Invalid credentials';
//         throw new Error(message);
//       }

//       if (!data?.access || !data?.refresh) {
//         throw new Error('Invalid server response - missing tokens');
//       }

//       await AsyncStorage.setItem('@access_token', data.access);
//       await AsyncStorage.setItem('@refresh_token', data.refresh);
      
//       setIsAuthenticated(true);
//       Alert.alert(t.success, t.loginSuccessful);
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert(t.loginFailed, error.message);
//       throw error;
//     }
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       t.logout,
//       t.logoutConfirm,
//       [
//         { text: t.cancel, style: 'cancel' },
//         {
//           text: t.logout,
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await AsyncStorage.removeItem('@access_token');
//               await AsyncStorage.removeItem('@refresh_token');
//               setIsAuthenticated(false);
//               setAuthScreen('choice');
//               setScreen('dashboard');
//               setActiveTab('home');
//             } catch (error) {
//               console.error('Logout error:', error);
//               Alert.alert(t.error, t.failedToLogout);
//             }
//           }
//         }
//       ]
//     );
//   };

//   const handleTabPress = (tabId) => {
//     setActiveTab(tabId);
//     switch(tabId) {
//       case 'home':
//         setScreen('dashboard');
//         break;
//       case 'schemes':
//         setScreen('schemes');
//         break;
//       case 'jobs':
//         setScreen('job_updates');
//         break;
//       case 'menu':
//         Alert.alert(t.menu, t.menuComingSoon);
//         break;
//       default:
//         setScreen('dashboard');
//     }
//   };

//   // Determine if bottom nav should be shown
//   const shouldShowBottomNav = () => {
//     const screensWithoutNav = [
//       'chatbot', 
//       'complaint_form', 
//       'status', 
//       'news', 
//       'helpline', 
//       'documents', 
//       'profile'
//     ];
//     return !screensWithoutNav.includes(screen);
//   };

//   const renderScreen = () => {
//     switch(screen) {
//       case 'dashboard':
//         return (
//           <DashboardHomeScreen 
//             onNavigate={setScreen} 
//             onLogout={handleLogout}
//             language={language}
//             setShowLanguageModal={setShowLanguageModal}
//           />
//         );
//       case 'profile':
//         return (
//           <ProfileScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }}
//             onLogout={handleLogout}
//           />
//         );
//       case 'complaint_form':
//         return (
//           <ComplaintFormScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'schemes':
//         return (
//           <SchemesScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'job_updates':
//         return (
//           <JobUpdateScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'news':
//         return (
//           <NewsScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'helpline':
//         return (
//           <HelplineScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'documents':
//         return (
//           <DocumentsScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'status':
//         return (
//           <StatusScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       case 'chatbot':
//         return (
//           <ChatbotScreen 
//             onBack={() => {
//               setScreen('dashboard');
//               setActiveTab('home');
//             }} 
//           />
//         );
//       default:
//         return (
//           <DashboardHomeScreen 
//             onNavigate={setScreen} 
//             onLogout={handleLogout}
//             language={language}
//             setShowLanguageModal={setShowLanguageModal}
//           />
//         );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.mainContainer, styles.centerContent]}>
//         <ActivityIndicator size="large" color="#1E3A8A" />
//       </View>
//     );
//   }

//   // Show auth screens if not authenticated
//   if (!isAuthenticated) {
//     if (authScreen === 'choice') {
//       return (
//         <AuthChoiceScreen 
//           onSignIn={() => setAuthScreen('signin')}
//           onCreateAccount={() => Alert.alert(t.info, t.accountCreationDisabled)}
//         />
//       );
//     }
//     if (authScreen === 'signin') {
//       return (
//         <SignInScreen
//           onBack={() => setAuthScreen('choice')}
//           onSubmit={handleSignIn}
//         />
//       );
//     }
//   }

//   // Show main app if authenticated
//   return (
//     <View style={styles.mainContainer}>
//       {/* Language Selection Modal */}
//       <Modal 
//         visible={showLanguageModal} 
//         transparent 
//         animationType="fade" 
//         onRequestClose={() => setShowLanguageModal(false)}
//       >
//         <TouchableOpacity 
//           style={styles.modalOverlay} 
//           activeOpacity={1} 
//           onPress={() => setShowLanguageModal(false)}
//         >
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{t.selectLanguage}</Text>
//             {['english', 'hindi', 'marathi'].map(lang => (
//               <TouchableOpacity 
//                 key={lang} 
//                 style={[styles.languageOption, language === lang && styles.languageOptionActive]} 
//                 onPress={() => handleLanguageChange(lang)}
//               >
//                 <Text style={[styles.languageOptionText, language === lang && styles.languageOptionTextActive]}>
//                   {lang === 'english' ? 'English' : lang === 'hindi' ? 'हिंदी (Hindi)' : 'मराठी (Marathi)'}
//                 </Text>
//                 {language === lang && <Ionicons name="checkmark-circle" size={24} color="#1E3A8A" />}
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowLanguageModal(false)}>
//               <Text style={styles.modalCloseButtonText}>{t.close}</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       <View style={styles.mainContent}>
//         {renderScreen()}
//       </View>

//       {/* Conditionally render bottom navigation */}
//       {shouldShowBottomNav() && (
//         <View style={styles.bottomNav}>
//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('home')}>
//             <View style={[styles.navIconContainer, activeTab === 'home' && styles.navIconActive]}>
//               <Ionicons name="home" size={24} color={activeTab === 'home' ? "#FFF" : "#6B7280"} />
//             </View>
//             <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>{t.home}</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('schemes')}>
//             <MaterialCommunityIcons name="file-document-outline" size={24} color={activeTab === 'schemes' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'schemes' && styles.navLabelActive]}>{t.schemes}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('jobs')}>
//             <MaterialCommunityIcons name="briefcase-search-outline" size={24} color={activeTab === 'jobs' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'jobs' && styles.navLabelActive]}>{t.jobs}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('menu')}>
//             <MaterialCommunityIcons name="view-grid-outline" size={24} color={activeTab === 'menu' ? "#1E3A8A" : "#6B7280"} />
//             <Text style={[styles.navLabel, activeTab === 'menu' && styles.navLabelActive]}>{t.menu}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   mainContent: {
//     flex: 1,
//   },
//   centerContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dashContainer: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//   },
//   dashHeader: {
//     backgroundColor: '#1E3A8A',
//     paddingTop: Platform.OS === 'android' ? 40 : 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   dashHeaderTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   dashLogoContainer: {
//     backgroundColor: '#E0E7FF',
//     padding: 8,
//     borderRadius: 8,
//   },
//   dashHeaderIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   iconButton: {
//     position: 'relative',
//   },
//   languageIconButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     backgroundColor: '#EF4444',
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#1E3A8A',
//   },
//   badgeText: {
//     color: '#FFF',
//     fontSize: 8,
//     fontWeight: 'bold',
//   },
//   avatarCircle: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#D1D5DB',
//   },
//   greetingText: {
//     color: '#FFF',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   searchBarContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     height: 48,
//   },
//   searchPlaceholder: {
//     flex: 1,
//     color: '#374151',
//     fontSize: 14,
//   },
//   dashScrollView: {
//     flex: 1,
//     zIndex: 10,
//   },
//   dashContent: {
//     padding: 20,
//   },
//   bannerContainer: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 25,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   bannerPlaceholder: {
//     height: 160,
//     backgroundColor: '#0F172A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   bannerTextMain: {
//     color: '#F97316',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   bannerTextSub: {
//     color: '#FFF',
//     fontSize: 14,
//     marginTop: 2,
//     fontStyle: 'italic',
//   },
//   bannerOverlayLine: {
//     position: 'absolute',
//     width: 300,
//     height: 20,
//     backgroundColor: '#FFF',
//     opacity: 0.1,
//   },
//   sectionHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     marginBottom: 15,
//   },
//   quickAccessGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 4,
//     marginBottom: 40,
//   },
//   quickAccessCard: {
//     width: '31%',
//     aspectRatio: 1,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   quickAccessLabel: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#374151',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   bottomActionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   checkStatusBtn: {
//     flex: 1,
//     backgroundColor: '#1E3A8A',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginRight: 20,
//     elevation: 3,
//   },
//   checkStatusBtnText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   aiBotBtn: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#FDE047',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     position: 'relative',
//   },
//   aiBadge: {
//     position: 'absolute',
//     bottom: -5,
//     right: -5,
//     backgroundColor: '#F59E0B',
//     borderRadius: 10,
//     paddingHorizontal: 4,
//     paddingVertical: 1,
//   },
//   aiBadgeText: {
//     color: '#FFF',
//     fontSize: 9,
//     fontWeight: 'bold',
//   },
//   bgPatternContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 300,
//     overflow: 'hidden',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     paddingVertical: 10,
//     paddingBottom: Platform.OS === 'ios' ? 25 : 10,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     zIndex: 100
//   },
//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   navIconContainer: {
//     padding: 6,
//     borderRadius: 20,
//   },
//   navIconActive: {
//     backgroundColor: '#818CF8',
//   },
//   navLabel: {
//     fontSize: 10,
//     color: '#6B7280',
//     marginTop: 2,
//     fontWeight: '500',
//   },
//   navLabelActive: {
//     color: '#1E3A8A',
//     fontWeight: '700',
//   },
//   // Modal styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 24,
//     width: '85%',
//     maxWidth: 400,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   languageOption: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     marginBottom: 12,
//     backgroundColor: '#F9FAFB',
//   },
//   languageOptionActive: {
//     backgroundColor: '#DBEAFE',
//     borderColor: '#3B82F6',
//     borderWidth: 2,
//   },
//   languageOptionText: {
//     fontSize: 16,
//     color: '#374151',
//     fontWeight: '500',
//   },
//   languageOptionTextActive: {
//     color: '#1E3A8A',
//     fontWeight: '700',
//   },
//   modalCloseButton: {
//     marginTop: 8,
//     padding: 14,
//     backgroundColor: '#E5E7EB',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   modalCloseButtonText: {
//     color: '#374151',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });



















import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { authenticatedFetch, clearTokens, parseJwt } from '../Tokenutils';
// Import all your screen components
import { AuthChoiceScreen, SignInScreen } from '../AuthScreens';
import ChatbotScreen from '../chatbot';
import ComplaintFormScreen from '../ComplaintFormScreen';
import DocumentsScreen from '../DocumentsScreen';
import HelplineScreen from '../HelplineScreen';
import JobUpdateScreen from '../JobUpdateScreen';
import NewsScreen from '../NewsScreen';
import ProfileScreen from '../ProfileScreen';
import SchemesScreen from '../SchemesScreen';
import StatusScreen from '../StatusScreen';

// Translations object
const translations = {
  english: {
    // Header
    hello: 'hello',
    search: 'Search',
    
    // Banner
    bannerMain: 'Samagra Shiksha',
    bannerSub: 'समग्र शिक्षा',
    banner2Main: 'Education Portal',
    banner2Sub: 'शैक्षणिक पोर्टल',
    banner3Main: 'Digital Learning',
    banner3Sub: 'डिजिटल शिक्षा',
    
    // Quick Access
    quickAccess: 'Quick Access',
    schemes: 'Schemes',
    complaints: 'Complaints',
    jobUpdates: 'Job Updates',
    news: 'News',
    documents: 'Documents',
    helpline: 'Helpline',
    
    // Bottom Actions
    checkStatus: 'Check Status',
    
    // Bottom Navigation
    home: 'Home',
    jobs: 'Jobs',
    menu: 'Menu',
    
    // Modal
    selectLanguage: 'Select Language',
    close: 'Close',
    
    // Alerts
    menuComingSoon: 'Menu screen coming soon!',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to logout?',
    cancel: 'Cancel',
    success: 'Success',
    loginSuccessful: 'Login successful!',
    loginFailed: 'Login Failed',
    error: 'Error',
    failedToLogout: 'Failed to logout',
    accountCreationDisabled: 'Account creation is currently disabled',
    info: 'Info',
  },
  hindi: {
    // Header
    hello: 'नमस्ते',
    search: 'खोजें',
    
    // Banner
    bannerMain: 'समग्र शिक्षा',
    bannerSub: 'Samagra Shiksha',
    banner2Main: 'शिक्षा पोर्टल',
    banner2Sub: 'Education Portal',
    banner3Main: 'डिजिटल शिक्षा',
    banner3Sub: 'Digital Learning',
    
    // Quick Access
    quickAccess: 'त्वरित पहुंच',
    schemes: 'योजनाएं',
    complaints: 'शिकायतें',
    jobUpdates: 'नौकरी अपडेट',
    news: 'समाचार',
    documents: 'दस्तावेज़',
    helpline: 'हेल्पलाइन',
    
    // Bottom Actions
    checkStatus: 'स्थिति जांचें',
    
    // Bottom Navigation
    home: 'होम',
    jobs: 'नौकरियां',
    menu: 'मेनू',
    
    // Modal
    selectLanguage: 'भाषा चुनें',
    close: 'बंद करें',
    
    // Alerts
    menuComingSoon: 'मेनू स्क्रीन जल्द आ रही है!',
    logout: 'लॉगआउट',
    logoutConfirm: 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
    cancel: 'रद्द करें',
    success: 'सफलता',
    loginSuccessful: 'लॉगिन सफल!',
    loginFailed: 'लॉगिन विफल',
    error: 'त्रुटि',
    failedToLogout: 'लॉगआउट विफल',
    accountCreationDisabled: 'खाता निर्माण वर्तमान में अक्षम है',
    info: 'जानकारी',
  },
  marathi: {
    // Header
    hello: 'नमस्कार',
    search: 'शोधा',
    
    // Banner
    bannerMain: 'समग्र शिक्षा',
    bannerSub: 'Samagra Shiksha',
    banner2Main: 'शिक्षण पोर्टल',
    banner2Sub: 'Education Portal',
    banner3Main: 'डिजिटल शिक्षण',
    banner3Sub: 'Digital Learning',
    
    // Quick Access
    quickAccess: 'द्रुत प्रवेश',
    schemes: 'योजना',
    complaints: 'तक्रारी',
    jobUpdates: 'नोकरी अपडेट',
    news: 'बातम्या',
    documents: 'कागदपत्रे',
    helpline: 'हेल्पलाइन',
    
    // Bottom Actions
    checkStatus: 'स्थिती तपासा',
    
    // Bottom Navigation
    home: 'होम',
    jobs: 'नोकऱ्या',
    menu: 'मेनू',
    
    // Modal
    selectLanguage: 'भाषा निवडा',
    close: 'बंद करा',
    
    // Alerts
    menuComingSoon: 'मेनू स्क्रीन लवकरच येत आहे!',
    logout: 'लॉगआउट',
    logoutConfirm: 'तुम्हाला खात्री आहे की तुम्ही लॉगआउट करू इच्छिता?',
    cancel: 'रद्द करा',
    success: 'यश',
    loginSuccessful: 'लॉगिन यशस्वी!',
    loginFailed: 'लॉगिन अयशस्वी',
    error: 'त्रुटी',
    failedToLogout: 'लॉगआउट अयशस्वी',
    accountCreationDisabled: 'खाते तयार करणे सध्या अक्षम आहे',
    info: 'माहिती',
  },
};

// --- DASHBOARD HOME SCREEN ---
const DashboardHomeScreen = ({ onNavigate, onLogout, language, setShowLanguageModal }) => {
  const t = translations[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollViewRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  
  const carouselItems = [
    {
      id: 1,
      title: t.bannerMain,
      subtitle: t.bannerSub,
      icon: 'school',
      bgColor: '#0F172A',
    },
    {
      id: 2,
      title: t.banner2Main,
      subtitle: t.banner2Sub,
      icon: 'book-open-variant',
      bgColor: '#1E40AF',
    },
    {
      id: 3,
      title: t.banner3Main,
      subtitle: t.banner3Sub,
      icon: 'laptop',
      bgColor: '#7C3AED',
    },
  ];

  const { width } = Dimensions.get('window');
  const CARD_WIDTH = width - 40;

  // Auto-play with pause on user interaction
  useEffect(() => {
    if (!isUserScrolling) {
      autoPlayTimerRef.current = setInterval(() => {
        setActiveSlide((prevSlide) => {
          const nextSlide = (prevSlide + 1) % carouselItems.length;
          
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: nextSlide * (CARD_WIDTH + 10),
              animated: true,
            });
          }
          
          return nextSlide;
        });
      }, 3000);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [CARD_WIDTH, carouselItems.length, isUserScrolling]);

  // Resume auto-play after user stops scrolling
  useEffect(() => {
    let resumeTimer;
    if (isUserScrolling) {
      resumeTimer = setTimeout(() => {
        setIsUserScrolling(false);
      }, 3000); // Resume after 3 seconds of no interaction
    }
    return () => clearTimeout(resumeTimer);
  }, [isUserScrolling]);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveSlide(activeIndex);
  };

  const handleScrollBeginDrag = () => {
    setIsUserScrolling(true);
  };


  
  const quickAccessItems = [
    { id: 'schemes', label: t.schemes, icon: 'file-document-edit-outline', lib: MaterialCommunityIcons },
    { id: 'complaints', label: t.complaints, icon: 'comment-alert-outline', lib: MaterialCommunityIcons },
    { id: 'jobs', label: t.jobUpdates, icon: 'briefcase-search-outline', lib: MaterialCommunityIcons },
    { id: 'news', label: t.news, icon: 'newspaper-variant-outline', lib: MaterialCommunityIcons },
    { id: 'documents', label: t.documents, icon: 'file-document-multiple-outline', lib: MaterialCommunityIcons },
    { id: 'helpline', label: t.helpline, icon: 'phone-in-talk-outline', lib: MaterialCommunityIcons },
  ];

  const handleQuickAccessPress = (itemId) => {
    console.log('Quick access pressed:', itemId);
    switch(itemId) {
      case 'schemes':
        onNavigate('schemes');
        break;
      case 'complaints':
        onNavigate('complaint_form');
        break;
      case 'jobs':
        onNavigate('job_updates');
        break;
      case 'news':
        onNavigate('news');
        break;
      case 'documents':
        onNavigate('documents');
        break;
      case 'helpline':
        onNavigate('helpline');
        break;
      default:
        console.log('Unknown item:', itemId);
    }
  };

  return (
    <View style={styles.dashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      <View style={styles.dashHeader}>
        <View style={styles.dashHeaderTop}>
          <View style={styles.dashLogoContainer}>
             <MaterialCommunityIcons name="bank" size={24} color="#1E3A8A" />
          </View>
          <View style={styles.dashHeaderIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge}><Text style={styles.badgeText}>1</Text></View>
            </TouchableOpacity>
            {/* Language Button */}
            <TouchableOpacity 
              style={styles.languageIconButton}
              onPress={() => setShowLanguageModal(true)}
            >
              <MaterialCommunityIcons name="translate" size={24} color="#FFF" />
            </TouchableOpacity>
            {/* Profile Button */}
            <TouchableOpacity 
              style={styles.profileButton} 
              onPress={() => onNavigate('profile')}
            >
              <View style={styles.avatarCircle} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.greetingText}>{t.hello}, janhavi</Text>
        
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchPlaceholder}>{t.search}</Text>
          <Ionicons name="search" size={20} color="#6B7280" />
        </View>
      </View>

      <ScrollView 
        style={styles.dashScrollView} 
        contentContainerStyle={styles.dashContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Carousel Banner */}
        <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 10}
          snapToAlignment="center"
          contentContainerStyle={styles.carouselContent}
        >
          {carouselItems.map((item, index) => (
            <View 
              key={item.id} 
              style={[styles.bannerPlaceholder, { 
                width: CARD_WIDTH,
                backgroundColor: item.bgColor,
                marginRight: index === carouselItems.length - 1 ? 0 : 10
              }]}
            >
              <MaterialCommunityIcons 
                name={item.icon} 
                size={40} 
                color="#FFF" 
                style={{opacity: 0.8}} 
              />
              <Text style={styles.bannerTextMain}>{item.title}</Text>
              <Text style={styles.bannerTextSub}>{item.subtitle}</Text>
              <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: -20 }]} />
              <View style={[styles.bannerOverlayLine, { transform: [{ rotate: '45deg' }], left: 40 }]} />
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.paginationContainer}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeSlide === index && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>

        <Text style={styles.sectionHeading}>{t.quickAccess}</Text>
        <View style={styles.quickAccessGrid}>
          {quickAccessItems.map((item) => {
            const IconComponent = item.lib;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickAccessCard}
                onPress={() => handleQuickAccessPress(item.id)}
              >
                <IconComponent name={item.icon} size={32} color="#4B5563" />
                <Text style={styles.quickAccessLabel}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomActionRow}>
          {/* Check Status Button */}
          <TouchableOpacity 
            style={styles.checkStatusBtn}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Check Status pressed');
              onNavigate('status');
            }}
          >
            <Text style={styles.checkStatusBtnText}>{t.checkStatus}</Text>
          </TouchableOpacity>
          
          {/* AI Chatbot Button */}
          <TouchableOpacity 
            style={styles.aiBotBtn}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Chatbot pressed');
              onNavigate('chatbot');
            }}
          >
            <MaterialCommunityIcons name="message-text-outline" size={24} color="#1E3A8A" />
            <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI</Text></View>
          </TouchableOpacity>
        </View>

        <View style={{height: 100}} /> 
      </ScrollView>

      <View style={styles.bgPatternContainer} pointerEvents="none">
         <MaterialCommunityIcons name="cube-outline" size={100} color="#E0E7FF" style={{position:'absolute', bottom: 100, left: -20, opacity: 0.5}} />
         <MaterialCommunityIcons name="city-variant-outline" size={150} color="#E0E7FF" style={{position:'absolute', bottom: 50, right: -30, opacity: 0.3}} />
      </View>
    </View>
  );
};

// --- MAIN COMPONENT WITH AUTH ---
export const DashboardScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState('choice');
  const [screen, setScreen] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('english');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const t = translations[language];

  useEffect(() => {
    checkAuth();
    loadLanguagePreference();
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
    try {
      await AsyncStorage.setItem('@language_preference', newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('@access_token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (mobile, password) => {
    try {
      console.log('Attempting login with:', mobile);
      
      const response = await authenticatedFetch(
        'https://raylene-unexpansive-krystal.ngrok-free.dev/api/auth/token/',
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            username: mobile,
            password,
          }),
        }
      );

      console.log('Response status:', response.status);

      const rawText = await response.text();
      console.log('Raw response:', rawText);

      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error(`Server error: ${rawText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        const message = data?.detail || data?.message || 'Invalid credentials';
        throw new Error(message);
      }

      if (!data?.access || !data?.refresh) {
        throw new Error('Invalid server response - missing tokens');
      }

      await AsyncStorage.setItem('@access_token', data.access);
      await AsyncStorage.setItem('@refresh_token', data.refresh);
      
      const payload = parseJwt(data.access);
      const userId = payload?.user_id || payload?.sub || payload?.id;
      if (userId) {
        await AsyncStorage.setItem('@user_id', String(userId));
        console.log('User ID stored from login:', userId);
      }
      
      setIsAuthenticated(true);
      Alert.alert(t.success, t.loginSuccessful);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(t.loginFailed, error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      t.logout,
      t.logoutConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.logout,
          style: 'destructive',
          onPress: async () => {
            try {
              await clearTokens();
              setIsAuthenticated(false);
              setAuthScreen('choice');
              setScreen('dashboard');
              setActiveTab('home');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(t.error, t.failedToLogout);
            }
          }
        }
      ]
    );
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch(tabId) {
      case 'home':
        setScreen('dashboard');
        break;
      case 'schemes':
        setScreen('schemes');
        break;
      case 'jobs':
        setScreen('job_updates');
        break;
      case 'menu':
        Alert.alert(t.menu, t.menuComingSoon);
        break;
      default:
        setScreen('dashboard');
    }
  };

  // Determine if bottom nav should be shown
  const shouldShowBottomNav = () => {
    const screensWithoutNav = [
      'chatbot', 
      'complaint_form', 
      'status', 
      'news', 
      'helpline', 
      'documents', 
      'profile'
    ];
    return !screensWithoutNav.includes(screen);
  };

  const renderScreen = () => {
    switch(screen) {
      case 'dashboard':
        return (
          <DashboardHomeScreen 
            onNavigate={setScreen} 
            onLogout={handleLogout}
            language={language}
            setShowLanguageModal={setShowLanguageModal}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }}
            onLogout={handleLogout}
          />
        );
      case 'complaint_form':
        return (
          <ComplaintFormScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'schemes':
        return (
          <SchemesScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'job_updates':
        return (
          <JobUpdateScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'news':
        return (
          <NewsScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'helpline':
        return (
          <HelplineScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'documents':
        return (
          <DocumentsScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'status':
        return (
          <StatusScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      case 'chatbot':
        return (
          <ChatbotScreen 
            onBack={() => {
              setScreen('dashboard');
              setActiveTab('home');
            }} 
          />
        );
      default:
        return (
          <DashboardHomeScreen 
            onNavigate={setScreen} 
            onLogout={handleLogout}
            language={language}
            setShowLanguageModal={setShowLanguageModal}
          />
        );
    }
  };

  if (loading) {
    return (
      <View style={[styles.mainContainer, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authScreen === 'choice') {
      return (
        <AuthChoiceScreen 
          onSignIn={() => setAuthScreen('signin')}
          onCreateAccount={() => Alert.alert(t.info, t.accountCreationDisabled)}
        />
      );
    }
    if (authScreen === 'signin') {
      return (
        <SignInScreen
          onBack={() => setAuthScreen('choice')}
          onSubmit={handleSignIn}
        />
      );
    }
  }

  // Show main app if authenticated
  return (
    <View style={styles.mainContainer}>
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.selectLanguage}</Text>
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
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowLanguageModal(false)}>
              <Text style={styles.modalCloseButtonText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.mainContent}>
        {renderScreen()}
      </View>

      {/* Conditionally render bottom navigation */}
      {shouldShowBottomNav() && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('home')}>
            <View style={[styles.navIconContainer, activeTab === 'home' && styles.navIconActive]}>
              <Ionicons name="home" size={24} color={activeTab === 'home' ? "#FFF" : "#6B7280"} />
            </View>
            <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>{t.home}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('schemes')}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color={activeTab === 'schemes' ? "#1E3A8A" : "#6B7280"} />
            <Text style={[styles.navLabel, activeTab === 'schemes' && styles.navLabelActive]}>{t.schemes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('jobs')}>
            <MaterialCommunityIcons name="briefcase-search-outline" size={24} color={activeTab === 'jobs' ? "#1E3A8A" : "#6B7280"} />
            <Text style={[styles.navLabel, activeTab === 'jobs' && styles.navLabelActive]}>{t.jobs}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('menu')}>
            <MaterialCommunityIcons name="view-grid-outline" size={24} color={activeTab === 'menu' ? "#1E3A8A" : "#6B7280"} />
            <Text style={[styles.navLabel, activeTab === 'menu' && styles.navLabelActive]}>{t.menu}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  mainContent: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  dashHeader: {
    backgroundColor: '#1E3A8A',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dashHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dashLogoContainer: {
    backgroundColor: '#E0E7FF',
    padding: 8,
    borderRadius: 8,
  },
  dashHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    position: 'relative',
  },
  languageIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E3A8A',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1D5DB',
  },
  greetingText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchBarContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 48,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
  },
  dashScrollView: {
    flex: 1,
    zIndex: 10,
  },
  dashContent: {
    padding: 20,
  },
  // Carousel styles
  carouselContainer: {
    marginBottom: 25,
  },
  carouselContent: {
    paddingHorizontal: 0,
  },
  bannerPlaceholder: {
    height: 160,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bannerTextMain: {
    color: '#F97316',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bannerTextSub: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 2,
    fontStyle: 'italic',
  },
  bannerOverlayLine: {
    position: 'absolute',
    width: 300,
    height: 20,
    backgroundColor: '#FFF',
    opacity: 0.1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  paginationDotActive: {
    backgroundColor: '#1E3A8A',
    width: 24,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 40,
  },
  quickAccessCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickAccessLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  checkStatusBtn: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 20,
    elevation: 3,
  },
  checkStatusBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aiBotBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDE047',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    position: 'relative',
  },
  aiBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  aiBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  bgPatternContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    overflow: 'hidden',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    zIndex: 100
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconContainer: {
    padding: 6,
    borderRadius: 20,
  },
  navIconActive: {
    backgroundColor: '#818CF8',
  },
  navLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
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
  modalCloseButton: {
    marginTop: 8,
    padding: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;