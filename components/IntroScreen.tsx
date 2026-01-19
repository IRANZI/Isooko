import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation/type';

const { width } = Dimensions.get('window');

type IntroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Intro'>;

const IntroScreen: React.FC = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const curveHeight = 100;

  return (
    <View style={styles.container}>
      {/* Top blue section with phone image */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/home.png')}
          style={styles.phoneImage}
          resizeMode="contain"
        />
      </View>

      {/* SVG Curve */}
      <Svg width={width} height={curveHeight} style={styles.curveSvg}>
        <Path
          fill="#fff"
          d={`M0,0 Q${width / 2},${curveHeight * 2} ${width},0 L${width},${curveHeight} L0,${curveHeight} Z`}
        />
      </Svg>

      {/* Bottom white panel */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Isooko - Smart Water Better Lives!</Text>
        <Text style={styles.subtitle}>
          Choose a best way to preserve water and live a better life.
        </Text>

        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('GetStartedScreen')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('WaterQualityScreen')}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4D95',
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  phoneImage: {
    width: 250,
    height: 680,
  },
  curveSvg: {
    position: 'absolute',
    bottom: 250,
    left: 0,
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 250,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  dotContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#0D4D95',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  skipButton: {
    backgroundColor: '#EAF3FF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: '#0D4D95',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  skipText: {
    color: '#0D4D95',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
