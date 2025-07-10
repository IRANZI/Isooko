import { RootStackParamList } from '@/app/navigation/type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AchievementScreen'
>;

const AchievementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const curveHeight = 100;

  return (
    <View style={styles.container}>
      {/* Top section with phone image */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/Achievement.png')}
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
        <Text style={styles.title}>
          Achieve Your Water Usage Goal at Isooko Now
        </Text>
        <Text style={styles.subtitle}>
          Level up your water usage game with Isooko's achievements. Unlock premium features and make proper water usage a lifelong habit.
        </Text>

        {/* Dot Indicators */}
        <View style={styles.dotContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.replace('GetStartedScreen')}
        >
          <Text style={styles.startButtonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AchievementScreen;

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
    fontSize: SCREEN_WIDTH < 350 ? 15 : 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH < 350 ? 12 : 13,
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
  startButton: {
    backgroundColor: '#0D4D95',
    paddingVertical: SCREEN_WIDTH < 350 ? 8 : 12,
    paddingHorizontal: SCREEN_WIDTH < 350 ? 18 : 30,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH < 350 ? 13 : 15,
  },
});
