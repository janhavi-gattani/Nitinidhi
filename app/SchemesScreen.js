

import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, 
  SafeAreaView, Platform, Switch, Animated, Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import EligibleSchemesScreen from './EligibleSchemesScreen';
import ExploreSchemes from './ExploreSchemes';

const translations = {
  english: {
    headerTitle: 'Schemes', search: 'Search', bannerMain: 'Samagra Shiksha', bannerSub: 'समग्र शिक्षा',
    voiceGuidance: 'Voice Guidance', enableVoice: 'Enable Voice', replayGuidance: 'Replay Guidance',
    stopVoice: 'Stop Voice', eligibleSchemes: 'Eligible Schemes', eligibleSchemesDesc: 'Find schemes you qualify for',
    exploreSchemes: 'Explore Schemes', exploreSchemesDesc: 'Browse all available schemes', selectLanguage: 'Select Language',
    voiceMessages: {
      welcome: "Welcome to the Schemes page. Here you can find government schemes that may benefit you.",
      eligible: "The Eligible Schemes button shows you all the government schemes that you are eligible for based on your profile.",
      explore: "The Explore Schemes button lets you browse all available government schemes and learn more about them.",
      outro: "Tap on any button to get started.",
    }
  },
  hindi: {
    headerTitle: 'योजनाएं', search: 'खोजें', bannerMain: 'समग्र शिक्षा', bannerSub: 'Samagra Shiksha',
    voiceGuidance: 'आवाज मार्गदर्शन', enableVoice: 'आवाज सक्षम करें', replayGuidance: 'मार्गदर्शन दोबारा चलाएं',
    stopVoice: 'आवाज बंद करें', eligibleSchemes: 'योग्य योजनाएं', eligibleSchemesDesc: 'जिन योजनाओं के लिए आप पात्र हैं',
    exploreSchemes: 'योजनाओं का अन्वेषण करें', exploreSchemesDesc: 'सभी उपलब्ध योजनाओं को ब्राउज़ करें', selectLanguage: 'भाषा चुनें',
    voiceMessages: {
      welcome: "योजनाओं के पृष्ठ में आपका स्वागत है। यहां आप सरकारी योजनाएं पा सकते हैं जो आपके लिए फायदेमंद हो सकती हैं।",
      eligible: "योग्य योजनाएं बटन आपको आपकी प्रोफ़ाइल के आधार पर सभी सरकारी योजनाएं दिखाता है जिनके लिए आप पात्र हैं।",
      explore: "योजनाओं का अन्वेषण करें बटन आपको सभी उपलब्ध सरकारी योजनाओं को ब्राउज़ करने और उनके बारे में अधिक जानने देता है।",
      outro: "शुरू करने के लिए किसी भी बटन पर टैप करें।",
    }
  },
  marathi: {
    headerTitle: 'योजना', search: 'शोधा', bannerMain: 'समग्र शिक्षा', bannerSub: 'Samagra Shiksha',
    voiceGuidance: 'आवाज मार्गदर्शन', enableVoice: 'आवाज सक्षम करा', replayGuidance: 'मार्गदर्शन पुन्हा चालवा',
    stopVoice: 'आवाज बंद करा', eligibleSchemes: 'पात्र योजना', eligibleSchemesDesc: 'तुम्ही पात्र असलेल्या योजना शोधा',
    exploreSchemes: 'योजनांचा शोध घ्या', exploreSchemesDesc: 'सर्व उपलब्ध योजना पहा', selectLanguage: 'भाषा निवडा',
    voiceMessages: {
      welcome: "योजना पृष्ठावर आपले स्वागत आहे. येथे तुम्ही तुमच्यासाठी फायदेशीर असलेल्या सरकारी योजना शोधू शकता.",
      eligible: "पात्र योजना बटण तुम्हाला तुमच्या प्रोफाईलच्या आधारे तुम्ही पात्र असलेल्या सर्व सरकारी योजना दाखवते.",
      explore: "योजनांचा शोध घ्या बटण तुम्हाला सर्व उपलब्ध सरकारी योजना पाहण्याची आणि त्यांच्याबद्दल अधिक जाणून घेण्याची संधी देते.",
      outro: "सुरुवात करण्यासाठी कोणत्याही बटणावर टॅप करा.",
    }
  }
};

const SchemesScreen = ({ onBack }) => {
  const [showEligible, setShowEligible] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [language, setLanguage] = useState('english');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const voiceEnabledRef = useRef(voiceEnabled);
  const eligiblePulseAnim = useState(new Animated.Value(1))[0];
  const explorePulseAnim = useState(new Animated.Value(1))[0];
  const t = translations[language];

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    if (!voiceEnabled && isSpeaking) stopVoiceGuidance();
  }, [voiceEnabled]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (voiceEnabled) playVoiceGuidance();
    }, 500);
    return () => { clearTimeout(timer); Speech.stop(); };
  }, []);

  useEffect(() => {
    if (currentHighlight === 'eligible') startPulseAnimation(eligiblePulseAnim);
    else if (currentHighlight === 'explore') startPulseAnimation(explorePulseAnim);
  }, [currentHighlight]);

  const startPulseAnimation = (v) => {
    Animated.loop(Animated.sequence([
      Animated.timing(v, { toValue: 1.05, duration: 600, useNativeDriver: true }),
      Animated.timing(v, { toValue: 1, duration: 600, useNativeDriver: true }),
    ])).start();
  };

  const stopPulseAnimation = (v) => {
    v.stopAnimation();
    Animated.timing(v, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };

  const getLanguageCode = () => {
    switch(language) {
      case 'hindi': return 'hi-IN';
      case 'marathi': return 'mr-IN';
      default: return 'en-US';
    }
  };

  const playVoiceGuidance = async () => {
    if (!voiceEnabledRef.current) return;
    const m = t.voiceMessages;
    try {
      setIsSpeaking(true);
      const lc = getLanguageCode();
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await speakMessage(m.welcome, lc);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await delay(500);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      setCurrentHighlight('eligible');
      await speakMessage(m.eligible, lc);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      setCurrentHighlight(null);
      stopPulseAnimation(eligiblePulseAnim);
      await delay(500);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      setCurrentHighlight('explore');
      await speakMessage(m.explore, lc);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      setCurrentHighlight(null);
      stopPulseAnimation(explorePulseAnim);
      await delay(500);
      if (!voiceEnabledRef.current) throw new Error('Voice disabled');
      await speakMessage(m.outro, lc);
      setIsSpeaking(false);
    } catch (e) {
      if (e.message !== 'Voice disabled') console.error('Error:', e);
      setIsSpeaking(false);
      setCurrentHighlight(null);
      stopPulseAnimation(eligiblePulseAnim);
      stopPulseAnimation(explorePulseAnim);
    }
  };

  const speakMessage = (msg, lc) => new Promise((res, rej) => {
    Speech.speak(msg, { language: lc, pitch: 1.0, rate: 0.85, onDone: res, onStopped: res, onError: rej });
  });

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  const stopVoiceGuidance = async () => {
    try {
      await Speech.stop();
      setIsSpeaking(false);
      setCurrentHighlight(null);
      stopPulseAnimation(eligiblePulseAnim);
      stopPulseAnimation(explorePulseAnim);
    } catch (e) { console.error('Error stopping:', e); }
  };

  const handleLanguageChange = async (nl) => {
    setLanguage(nl);
    setShowLanguageModal(false);
    await stopVoiceGuidance();
    setTimeout(() => { if (voiceEnabledRef.current) playVoiceGuidance(); }, 300);
  };

  const handleVoiceToggle = async (v) => {
    setVoiceEnabled(v);
    voiceEnabledRef.current = v;
    if (!v) await stopVoiceGuidance();
  };

  const handleReplayGuidance = async () => {
    await stopVoiceGuidance();
    setTimeout(() => { if (voiceEnabledRef.current) playVoiceGuidance(); }, 300);
  };

  if (showEligible) return <EligibleSchemesScreen onBack={() => setShowEligible(false)} />;
  if (showExplore) return <ExploreSchemes onBack={() => setShowExplore(false)} />;

  return (
    <SafeAreaView style={s.c}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      <View style={s.h}>
        <View style={s.ht}>
          <TouchableOpacity onPress={onBack} style={s.bb}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={s.htl}>{t.headerTitle}</Text>
          <View style={s.hr}>
            {isSpeaking && <MaterialCommunityIcons name="volume-high" size={20} color="#FFF" style={{marginRight:8}} />}
            <TouchableOpacity onPress={() => setShowLanguageModal(true)} style={s.lib}>
              <MaterialCommunityIcons name="translate" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.sb}>
          <Text style={s.sp}>{t.search}</Text>
          <Ionicons name="search" size={20} color="#94a3b8" />
        </View>
      </View>

      <Modal visible={showLanguageModal} transparent animationType="fade" onRequestClose={() => setShowLanguageModal(false)}>
        <TouchableOpacity style={s.mo} activeOpacity={1} onPress={() => setShowLanguageModal(false)}>
          <View style={s.mc}>
            <Text style={s.mt}>{t.selectLanguage}</Text>
            {['english', 'hindi', 'marathi'].map(l => (
              <TouchableOpacity key={l} style={[s.lo, language===l && s.loa]} onPress={() => handleLanguageChange(l)}>
                <Text style={[s.lot, language===l && s.lota]}>
                  {l==='english'?'English':l==='hindi'?'हिंदी (Hindi)':'मराठी (Marathi)'}
                </Text>
                {language===l && <Ionicons name="checkmark-circle" size={24} color="#1E3A8A" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={s.mcb} onPress={() => setShowLanguageModal(false)}>
              <Text style={s.mcbt}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={s.sv} contentContainerStyle={s.svc} showsVerticalScrollIndicator={false}>
        <View style={s.bnc}>
          <View style={s.bnp}>
            <MaterialCommunityIcons name="school" size={40} color="#FFF" style={{opacity:0.8}} />
            <Text style={s.bm}>{t.bannerMain}</Text>
            <Text style={s.bs}>{t.bannerSub}</Text>
            <View style={[s.bol, {transform:[{rotate:'45deg'}], left:-20}]} />
            <View style={[s.bol, {transform:[{rotate:'45deg'}], left:40}]} />
          </View>
        </View>

        <View style={s.vcc}>
          <View style={s.shd}>
            <MaterialCommunityIcons name="account-voice" size={20} color="#1E3A8A" />
            <Text style={s.st}>{t.voiceGuidance}</Text>
          </View>
          <View style={s.vc}>
            <View style={s.cr}>
              <View style={s.cl}>
                <MaterialCommunityIcons name={voiceEnabled?"volume-high":"volume-off"} size={20} color="#1E3A8A" />
                <Text style={s.ct}>{t.enableVoice}</Text>
              </View>
              <Switch value={voiceEnabled} onValueChange={handleVoiceToggle} trackColor={{false:'#CBD5E1',true:'#93C5FD'}} thumbColor={voiceEnabled?'#1E3A8A':'#64748B'} />
            </View>
          </View>
          <View style={s.vab}>
            {isSpeaking ? (
              <TouchableOpacity style={s.ssb} onPress={stopVoiceGuidance}>
                <MaterialCommunityIcons name="stop-circle" size={20} color="#EF4444" />
                <Text style={s.sst}>{t.stopVoice}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={s.rb} onPress={handleReplayGuidance} disabled={!voiceEnabled}>
                <MaterialCommunityIcons name="replay" size={20} color={voiceEnabled?"#1E3A8A":"#CBD5E1"} />
                <Text style={[s.rbt, !voiceEnabled && s.rbtd]}>{t.replayGuidance}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={s.abc}>
          <Animated.View style={[s.abw, {transform:[{scale:eligiblePulseAnim}]}]}>
            <TouchableOpacity style={[s.ab, currentHighlight==='eligible'&&s.abh]} onPress={() => setShowEligible(true)} disabled={isSpeaking}>
              <View style={s.aic}><MaterialCommunityIcons name="clipboard-text-outline" size={32} color="#1F2937" /></View>
              <View style={s.abtc}>
                <Text style={s.abt}>{t.eligibleSchemes}</Text>
                <Text style={s.abst}>{t.eligibleSchemesDesc}</Text>
              </View>
              {currentHighlight==='eligible'&&<View style={s.hi}><MaterialCommunityIcons name="volume-high" size={20} color="#1E3A8A" /></View>}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[s.abw, {transform:[{scale:explorePulseAnim}]}]}>
            <TouchableOpacity style={[s.ab, currentHighlight==='explore'&&s.abh]} onPress={() => setShowExplore(true)} disabled={isSpeaking}>
              <View style={s.aic}><Ionicons name="search-outline" size={32} color="#1F2937" /></View>
              <View style={s.abtc}>
                <Text style={s.abt}>{t.exploreSchemes}</Text>
                <Text style={s.abst}>{t.exploreSchemesDesc}</Text>
              </View>
              {currentHighlight==='explore'&&<View style={s.hi}><MaterialCommunityIcons name="volume-high" size={20} color="#1E3A8A" /></View>}
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={{height:100}} />
      </ScrollView>

      <View style={s.fab}>
        <View style={s.fi}>
          <Text style={s.fat}>AI</Text>
          <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  c:{flex:1,backgroundColor:'#f3f4f6'}, h:{backgroundColor:'#1E3A8A',padding:20,paddingTop:Platform.OS==='android'?40:20,paddingBottom:20,borderBottomLeftRadius:20,borderBottomRightRadius:20},
  ht:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:16}, bb:{width:40,height:40,justifyContent:'center',alignItems:'center'},
  htl:{color:'#FFF',fontSize:18,fontWeight:'bold',flex:1,textAlign:'center'}, hr:{flexDirection:'row',alignItems:'center',width:40,justifyContent:'flex-end'},
  lib:{width:40,height:40,justifyContent:'center',alignItems:'center'}, sb:{backgroundColor:'#fff',borderRadius:12,flexDirection:'row',alignItems:'center',paddingHorizontal:15,height:48,shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.1,shadowRadius:4,elevation:3},
  sp:{flex:1,color:'#64748b',fontSize:16,fontWeight:'500'}, sv:{flex:1}, svc:{padding:20}, bnc:{borderRadius:16,overflow:'hidden',marginBottom:20,elevation:4,shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:4},
  bnp:{height:160,backgroundColor:'#0F172A',justifyContent:'center',alignItems:'center',position:'relative'}, bm:{color:'#F97316',fontSize:24,fontWeight:'bold',marginTop:10},
  bs:{color:'#FFF',fontSize:14,marginTop:2,fontStyle:'italic'}, bol:{position:'absolute',width:300,height:20,backgroundColor:'#FFF',opacity:0.1},
  vcc:{backgroundColor:'#FFF',padding:16,borderRadius:12,marginBottom:20,borderWidth:1,borderColor:'#E5E7EB',shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.1,shadowRadius:4,elevation:3},
  shd:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:12}, st:{fontSize:16,fontWeight:'bold',color:'#1E3A8A'}, vc:{gap:16},
  cr:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}, cl:{flexDirection:'row',alignItems:'center',gap:8}, ct:{fontSize:16,color:'#0F172A',fontWeight:'600'},
  vab:{marginTop:12}, ssb:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8,paddingVertical:10,paddingHorizontal:16,backgroundColor:'#FEE2E2',borderRadius:8,borderWidth:1,borderColor:'#FCA5A5'},
  sst:{fontSize:14,color:'#EF4444',fontWeight:'600'}, rb:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8,paddingVertical:10,paddingHorizontal:16,backgroundColor:'#DBEAFE',borderRadius:8,borderWidth:1,borderColor:'#93C5FD'},
  rbt:{fontSize:14,color:'#1E3A8A',fontWeight:'600'}, rbtd:{color:'#CBD5E1'}, abc:{gap:16}, abw:{width:'100%'},
  ab:{flexDirection:'row',alignItems:'center',backgroundColor:'#DBEAFE',borderRadius:12,padding:20,borderWidth:2,borderColor:'#BFDBFE',elevation:2,shadowColor:'#000',shadowOffset:{width:0,height:1},shadowOpacity:0.1,shadowRadius:2,position:'relative'},
  abh:{backgroundColor:'#FEF3C7',borderColor:'#FCD34D',borderWidth:3,elevation:8,shadowColor:'#F59E0B',shadowOffset:{width:0,height:4},shadowOpacity:0.4,shadowRadius:8},
  aic:{marginRight:16}, abtc:{flex:1}, abt:{fontSize:18,fontWeight:'bold',color:'#111827',marginBottom:4}, abst:{fontSize:13,color:'#4B5563',fontWeight:'500'},
  hi:{position:'absolute',top:10,right:10,backgroundColor:'#FFF',padding:6,borderRadius:20,elevation:4,shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.2,shadowRadius:4},
  fab:{position:'absolute',bottom:20,right:20,backgroundColor:'#fde047',width:60,height:60,borderRadius:30,justifyContent:'center',alignItems:'center',shadowOpacity:0.3,shadowRadius:5,elevation:8},
  fi:{alignItems:'center',justifyContent:'center'}, fat:{fontSize:10,fontWeight:'900',color:'#1E3A8A',marginBottom:-2},
  mo:{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}, mc:{backgroundColor:'#FFF',borderRadius:16,padding:24,width:'85%',maxWidth:400},
  mt:{fontSize:20,fontWeight:'bold',color:'#1E3A8A',marginBottom:20,textAlign:'center'}, lo:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16,borderRadius:12,borderWidth:1,borderColor:'#E5E7EB',marginBottom:12,backgroundColor:'#F9FAFB'},
  loa:{backgroundColor:'#DBEAFE',borderColor:'#3B82F6',borderWidth:2}, lot:{fontSize:16,color:'#374151',fontWeight:'500'}, lota:{color:'#1E3A8A',fontWeight:'700'},
  mcb:{marginTop:8,padding:14,backgroundColor:'#E5E7EB',borderRadius:8,alignItems:'center'}, mcbt:{color:'#374151',fontSize:16,fontWeight:'600'},
});

export default SchemesScreen;