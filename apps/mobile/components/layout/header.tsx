import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '@/hooks/use-auth-context';

type HeaderProps = {
  showThreadControls?: boolean;
  onMenuPress?: () => void;
  onNewThreadPress?: () => void;
  onNotificationsPress?: () => void;
};

export default function Header({
  showThreadControls = true,
  onMenuPress,
  onNewThreadPress,
  onNotificationsPress,
}: HeaderProps) {
  const { session } = useAuthContext();
  const [currentTime, setCurrentTime] = useState('');

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now
        .toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        .replace(/,/g, '');
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.header}>
      {/* Left Side - Thread Controls + Logo */}
      <View style={styles.leftSection}>
        {showThreadControls && (
          <View style={styles.controls}>
            {/* Thread Sidebar Toggle */}
            <TouchableOpacity
              onPress={onMenuPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={20} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>

            {/* New Thread Button */}
            <TouchableOpacity
              onPress={onNewThreadPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />
          </View>
        )}

        {/* Logo */}
        <Text style={styles.logo}>Cogno</Text>
      </View>

      {/* Right Side - Time, Notifications, User */}
      <View style={styles.rightSection}>
        {showThreadControls && (
          <TouchableOpacity
            onPress={onNotificationsPress}
            style={styles.timeButton}
            activeOpacity={0.7}
          >
            <Text style={styles.timeText}>{currentTime}</Text>
            <Ionicons
              name="notifications-outline"
              size={20}
              color="rgba(255, 255, 255, 0.6)"
            />
          </TouchableOpacity>
        )}

        {/* User Avatar */}
        {session?.user && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {session.user.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60, // Account for status bar
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 4,
  },
  logo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

