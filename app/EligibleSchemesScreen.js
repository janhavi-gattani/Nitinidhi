import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SchemeDetailsScreen from './SchemeDetailsScreen';

// Hardcoded schemes for self-employed women with 2.5-5 lakhs annual income
const SCHEMES = [
  {
    id: '1',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    department: 'Ministry of Finance',
    scheme_type: 'central',
    description: 'Provides collateral-free loans up to ₹10 lakh to women entrepreneurs for starting or expanding small businesses.',
    eligibility: 'Self-employed women, non-farm income generating activities, annual income 2.5-5 lakhs',
    benefits: [
      'Collateral-free loans up to ₹10 lakh',
      'Three categories: Shishu (up to ₹50,000), Kishore (₹50,000-₹5 lakh), Tarun (₹5-10 lakh)',
      'Low interest rates (8-12% annually)',
      'No processing fees for Shishu loans',
      'Flexible repayment terms'
    ],
    documents: [
      'Aadhaar Card',
      'PAN Card',
      'Business plan/proposal',
      'Income proof',
      'Bank account statements (6 months)',
      'Address proof',
      'Business registration documents'
    ],
    application_process: [
      'Visit nearest bank or NBFC',
      'Fill loan application form',
      'Submit required documents',
      'Bank will verify and process',
      'Loan disbursed within 7-15 days'
    ]
  },
  {
    id: '2',
    name: 'Stand-Up India Scheme',
    department: 'Ministry of Finance',
    scheme_type: 'central',
    description: 'Facilitates bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs for greenfield enterprises.',
    eligibility: 'Women entrepreneurs, SC/ST, starting new enterprise, annual income up to ₹5 lakhs',
    benefits: [
      'Loans from ₹10 lakh to ₹1 crore',
      'Composite loan (term + working capital)',
      'Repayment period up to 7 years',
      'Interest rate concessions',
      'Free credit guarantee coverage',
      'Handholding support through government agencies'
    ],
    documents: [
      'Aadhaar Card',
      'PAN Card',
      'Business plan with project cost',
      'Income certificate',
      'Caste certificate (if applicable)',
      'Educational qualifications',
      'Address proof',
      'Bank statements'
    ],
    application_process: [
      'Apply online on Stand-Up India portal',
      'Or visit nearest branch of scheduled commercial bank',
      'Submit detailed project report',
      'Bank appraisal and sanctioning',
      'Loan disbursement'
    ]
  },
  {
    id: '3',
    name: 'Mahila Udyam Nidhi Scheme',
    department: 'Small Industries Development Bank of India (SIDBI)',
    scheme_type: 'central',
    description: 'Soft loan scheme for women entrepreneurs in small scale industries, providing loans up to ₹10 lakh.',
    eligibility: 'Women entrepreneurs in small industries, manufacturing/service sector, annual income up to ₹5 lakhs',
    benefits: [
      'Soft loans up to ₹10 lakh',
      'Concessional interest rates',
      'No collateral for loans up to ₹2 lakh',
      'Preferential treatment to women',
      'Quick processing',
      'Technical and entrepreneurial guidance'
    ],
    documents: [
      'Aadhaar Card',
      'Business registration certificate',
      'Project report',
      'Income proof',
      'Bank account details',
      'Educational certificates',
      'Property documents (if loan > ₹2 lakh)'
    ],
    application_process: [
      'Contact SIDBI regional office',
      'Submit application with project report',
      'Technical evaluation by SIDBI',
      'Loan sanction and disbursement',
      'Periodic monitoring'
    ]
  },
  {
    id: '4',
    name: 'Atal Pension Yojana (APY)',
    department: 'Pension Fund Regulatory and Development Authority',
    scheme_type: 'central',
    description: 'Government-backed pension scheme providing guaranteed pension after 60 years, ideal for self-employed women.',
    eligibility: 'Age 18-40 years, self-employed, Indian citizen, annual income up to ₹5 lakhs',
    benefits: [
      'Guaranteed pension: ₹1,000 to ₹5,000 per month',
      'Government co-contribution (for eligible subscribers)',
      'Pension for spouse after subscriber\'s death',
      'Return of corpus to nominee',
      'Low monthly contributions based on age',
      'Tax benefits under Section 80CCD'
    ],
    documents: [
      'Aadhaar Card',
      'Bank account details',
      'Mobile number',
      'Age proof',
      'Income certificate'
    ],
    application_process: [
      'Visit your bank where you have savings account',
      'Fill APY registration form',
      'Provide Aadhaar and bank details',
      'Choose pension amount (₹1,000-₹5,000)',
      'Auto-debit starts for monthly contribution'
    ]
  },
  {
    id: '5',
    name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    department: 'Ministry of Finance',
    scheme_type: 'central',
    description: 'Life insurance scheme offering ₹2 lakh coverage for just ₹436 per year, providing security to self-employed women.',
    eligibility: 'Age 18-50 years, savings bank account holder, annual income criteria flexible',
    benefits: [
      'Life cover of ₹2 lakh',
      'Annual premium only ₹436',
      'Renewable annually',
      'Death coverage (any reason)',
      'Simple enrollment process',
      'No medical examination required'
    ],
    documents: [
      'Aadhaar Card',
      'Bank account details',
      'Consent form',
      'Nominee details'
    ],
    application_process: [
      'Visit your bank',
      'Fill PMJJBY enrollment form',
      'Give consent for auto-debit',
      'Submit Aadhaar details',
      'Coverage starts immediately after premium debit'
    ]
  },
  {
    id: '6',
    name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    department: 'Ministry of Finance',
    scheme_type: 'central',
    description: 'Accidental insurance scheme providing ₹2 lakh coverage for just ₹20 per year.',
    eligibility: 'Age 18-70 years, savings bank account holder, self-employed individuals',
    benefits: [
      'Accidental death: ₹2 lakh',
      'Permanent total disability: ₹2 lakh',
      'Permanent partial disability: ₹1 lakh',
      'Annual premium only ₹20',
      'Renewable annually',
      'Easy enrollment'
    ],
    documents: [
      'Aadhaar Card',
      'Bank account details',
      'Consent form',
      'Nominee details'
    ],
    application_process: [
      'Visit your bank',
      'Fill PMSBY enrollment form',
      'Give auto-debit consent',
      'Submit Aadhaar',
      'Instant coverage activation'
    ]
  },
  {
    id: '7',
    name: 'Mahila Samridhi Yojana',
    department: 'Department of Women and Child Development',
    scheme_type: 'central',
    description: 'Special scheme for women in rural areas engaged in self-employment activities, providing training and financial assistance.',
    eligibility: 'Rural women, self-employed, age 18-45 years, annual income up to ₹5 lakhs',
    benefits: [
      'Financial assistance up to ₹60,000',
      'Subsidy on interest rates',
      'Free skill development training',
      'Marketing support',
      'Networking opportunities',
      'Easy loan repayment terms'
    ],
    documents: [
      'Aadhaar Card',
      'Income certificate',
      'Rural residence proof',
      'Self-employment proof',
      'Bank account details',
      'Business plan'
    ],
    application_process: [
      'Apply through local Self Help Group (SHG)',
      'Or visit District Industries Centre',
      'Submit application with documents',
      'Attend skill training program',
      'Receive financial assistance',
      'Start/expand business'
    ]
  },
  {
    id: '8',
    name: 'Annapurna Scheme',
    department: 'Ministry of Food and Public Distribution',
    scheme_type: 'central',
    description: 'Provides food security to indigent senior citizens, beneficial for self-employed women supporting elderly family members.',
    eligibility: 'Senior citizens (60+) in the household, self-employed family, annual income up to ₹5 lakhs',
    benefits: [
      '10 kg of food grains per month free',
      'Helps reduce household expenses',
      'No application fees',
      'Covers rice, wheat, or both',
      'Long-term benefit'
    ],
    documents: [
      'Aadhaar Card of senior citizen',
      'Age proof (60+ years)',
      'Income certificate',
      'Address proof',
      'BPL card (if applicable)'
    ],
    application_process: [
      'Visit local Food Supply Office',
      'Submit application form',
      'Provide required documents',
      'Verification by authorities',
      'Annapurna card issued',
      'Collect monthly ration'
    ]
  },
  {
    id: '9',
    name: 'National Skill Development Scheme for Women',
    department: 'Ministry of Skill Development',
    scheme_type: 'central',
    description: 'Free skill training programs for women to enhance employability and entrepreneurship skills.',
    eligibility: 'Women aged 18-45, self-employed or aspiring entrepreneurs, all income groups',
    benefits: [
      'Free skill training programs',
      'Certification after completion',
      'Placement assistance',
      'Tool kit worth ₹5,000-₹10,000',
      'Stipend during training',
      'Access to government schemes post-training'
    ],
    documents: [
      'Aadhaar Card',
      'Age proof',
      'Educational certificates',
      'Income certificate',
      'Address proof',
      'Passport size photographs'
    ],
    application_process: [
      'Visit Skill India portal or PMKVY center',
      'Choose training program',
      'Submit online/offline application',
      'Attend training sessions',
      'Complete assessment',
      'Receive certificate and benefits'
    ]
  },
  {
    id: '10',
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    department: 'Ministry of Rural Development',
    scheme_type: 'central',
    description: 'Skill training and placement program for rural women from poor families, including self-employed individuals.',
    eligibility: 'Rural women from poor families, age 15-35 years, annual income below ₹5 lakhs',
    benefits: [
      'Free residential skill training',
      'Training allowance provided',
      '70%+ placement guarantee',
      'Post-placement tracking',
      'Advanced training modules',
      'Career progression support'
    ],
    documents: [
      'Aadhaar Card',
      'Income certificate',
      'Rural residence certificate',
      'Age proof',
      'Educational certificates',
      'Bank account details'
    ],
    application_process: [
      'Visit DDU-GKY portal or local center',
      'Register for training program',
      'Submit documents',
      'Complete skill training',
      'Get placement assistance',
      'Receive post-placement support'
    ]
  }
];

const EligibleSchemesScreen = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigateToSchemeDetails = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentScreen('details');
  };

  const handleBackToList = () => {
    setCurrentScreen('list');
  };

  const handleApplyNow = () => {
    alert('Application process started!');
    setCurrentScreen('list');
  };

  // Filter schemes based on search query
  const filteredSchemes = SCHEMES.filter(scheme => 
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentScreen === 'details' && selectedScheme) {
    return (
      <SchemeDetailsScreen
        scheme={selectedScheme}
        onBack={handleBackToList}
        onApplyNow={handleApplyNow}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      <Header onBack={onBack} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredSchemes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialCommunityIcons name="file-document-alert-outline" size={80} color="#9ca3af" />
          <Text style={{ fontSize: 18, color: '#4b5563', marginTop: 20, textAlign: 'center' }}>
            No schemes found matching your search
          </Text>
          <TouchableOpacity 
            onPress={() => setSearchQuery('')}
            style={{
              marginTop: 20,
              backgroundColor: '#1E3A8A',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Clear Search</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredSchemes.map((scheme) => (
            <SchemeCard 
              key={scheme.id} 
              data={scheme}
              onApply={() => handleNavigateToSchemeDetails(scheme)}
            />
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      <AIFloatingButton />
    </SafeAreaView>
  );
};

const Header = ({ onBack, searchQuery, setSearchQuery }) => {
  return (
    <View style={{
      backgroundColor: '#1E3A8A',
      padding: 20,
      paddingTop: Platform.OS === 'android' ? 40 : 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <TouchableOpacity onPress={onBack} style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={{
          color: '#FFF',
          fontSize: 18,
          fontWeight: 'bold',
          flex: 1,
          textAlign: 'center',
        }}>
          Eligible Schemes
        </Text>

        <View style={{
          flexDirection: 'row',
          width: 40,
          justifyContent: 'flex-end',
        }}>
          <TouchableOpacity style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
            <Ionicons name="notifications-outline" size={20} color="#FFF" />
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#EF4444',
              width: 14,
              height: 14,
              borderRadius: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 8, fontWeight: 'bold' }}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
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
      }}>
        <TextInput
          placeholder="Search schemes..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            flex: 1,
            fontSize: 16,
            color: '#1a2b5d',
            fontWeight: '500',
          }}
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
  );
};

const SchemeCard = ({ data, onApply }) => {
  // Determine icon based on scheme type or department
  const getIcon = () => {
    const dept = data.department.toLowerCase();
    const name = data.name.toLowerCase();
    
    if (name.includes('mudra') || name.includes('loan') || name.includes('stand-up')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#fef3c7',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="cash-multiple" size={36} color="#fbbf24" />
        </View>
      );
    } else if (name.includes('pension') || name.includes('atal')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#dbeafe',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="bank" size={36} color="#3b82f6" />
        </View>
      );
    } else if (name.includes('bima') || name.includes('insurance')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#dcfce7',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="shield-check" size={36} color="#22c55e" />
        </View>
      );
    } else if (name.includes('skill') || name.includes('training') || name.includes('kaushalya')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#e0e7ff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name="school" size={32} color="#6366f1" />
        </View>
      );
    } else if (name.includes('samridhi') || name.includes('mahila')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#fce7f3',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="account-group" size={36} color="#ec4899" />
        </View>
      );
    } else if (name.includes('annapurna') || name.includes('food')) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#ffedd5',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="food-apple" size={36} color="#f97316" />
        </View>
      );
    } else {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#e5e7eb',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialCommunityIcons name="file-document" size={32} color="#6b7280" />
        </View>
      );
    }
  };

  return (
    <View style={{
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
    }}>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View style={{ marginRight: 16, justifyContent: 'center' }}>
          {getIcon()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 4 }}>
            {data.name}
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>
            {data.department}
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
          }}>
            <View style={{
              backgroundColor: data.scheme_type === 'state' ? '#dbeafe' : '#fef3c7',
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 4,
            }}>
              <Text style={{ 
                fontSize: 10, 
                color: data.scheme_type === 'state' ? '#1e40af' : '#92400e',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
                {data.scheme_type}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={{ 
        fontSize: 13, 
        color: '#4b5563', 
        lineHeight: 18,
        marginBottom: 12,
      }} numberOfLines={2}>
        {data.description}
      </Text>

      <View style={{ height: 1, backgroundColor: '#e5e7eb', marginVertical: 12 }} />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>
            Eligibility:
          </Text>
          <Text style={{ fontSize: 12, color: '#4b5563', fontWeight: '500' }} numberOfLines={2}>
            {data.eligibility}
          </Text>
        </View>
        <TouchableOpacity 
          style={{
            backgroundColor: '#1E3A8A',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 6,
            marginLeft: 10,
          }}
          onPress={onApply}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AIFloatingButton = () => {
  return (
    <View style={{
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
    }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 10, fontWeight: '900', color: '#1E3A8A', marginBottom: -2 }}>
          AI
        </Text>
        <MaterialCommunityIcons name="message-text-outline" size={22} color="#1E3A8A" />
      </View>
    </View>
  );
};

export default EligibleSchemesScreen;