import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.cometWrapper}>
          {/* Comet core */}
          <View style={styles.cometCore} />
          {/* Asymmetric comet tail */}
          <View style={[styles.cometTail, styles.cometTail1]} />
          <View style={[styles.cometTail, styles.cometTail2]} />
          <View style={[styles.cometTail, styles.cometTail3]} />
          <View style={[styles.cometTail, styles.cometTail4]} />
          <View style={[styles.cometTail, styles.cometTail5]} />
        </View>
      </View>
      <Text style={styles.title}>Cogno</Text>
      <Text style={styles.subtitle}>
        The space between thought and creation.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  cometWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cometCore: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  cometTail: {
    position: 'absolute',
    height: 2,
    left: 0,
  },
  cometTail1: {
    width: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    top: '50%',
    opacity: 0.6,
  },
  cometTail2: {
    width: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    top: '50%',
    marginTop: 8,
    opacity: 0.4,
  },
  cometTail3: {
    width: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: '50%',
    marginTop: -8,
    opacity: 0.3,
  },
  cometTail4: {
    width: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '50%',
    marginTop: 12,
    opacity: 0.2,
  },
  cometTail5: {
    width: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: '50%',
    marginTop: -12,
    opacity: 0.15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    maxWidth: 400,
    textAlign: 'center',
  },
});

