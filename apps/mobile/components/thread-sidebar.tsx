import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Thread } from '@cogni/types';

type ThreadSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  threads: Thread[];
  selectedThreadId: number | null;
  onSelectThread: (threadId: number) => void;
  onUpdateThread: (threadId: number, title: string) => Promise<void>;
  onDeleteThread: (threadId: number) => Promise<void>;
};

export default function ThreadSidebar({
  isOpen,
  onClose,
  threads,
  selectedThreadId,
  onSelectThread,
  onUpdateThread,
  onDeleteThread,
}: ThreadSidebarProps) {
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleSelectThread = (threadId: number) => {
    onSelectThread(threadId);
    onClose();
  };

  const startRename = (thread: Thread) => {
    setRenamingId(thread.id);
    setRenameValue(thread.title);
  };

  const handleRename = async (threadId: number) => {
    if (!renameValue.trim()) return;

    try {
      await onUpdateThread(threadId, renameValue.trim());
      setRenamingId(null);
      setRenameValue('');
    } catch (error) {
      console.error('Failed to rename thread:', error);
      Alert.alert('Error', 'Failed to rename thread');
    }
  };

  const handleDelete = async (threadId: number) => {
    Alert.alert(
      'Delete Thread',
      'Are you sure you want to delete this thread?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await onDeleteThread(threadId);
            } catch (error) {
              console.error('Failed to delete thread:', error);
              Alert.alert('Error', 'Failed to delete thread');
            }
          },
        },
      ]
    );
  };

  const renderThread = ({ item: thread }: { item: Thread }) => {
    const isSelected = selectedThreadId === thread.id;
    const isRenaming = renamingId === thread.id;

    return (
      <View
        style={[
          styles.threadItem,
          isSelected && styles.threadItemSelected,
        ]}
      >
        {isRenaming ? (
          // Rename Mode
          <View style={styles.renameContainer}>
            <TextInput
              style={styles.renameInput}
              value={renameValue}
              onChangeText={setRenameValue}
              onSubmitEditing={() => handleRename(thread.id)}
              autoFocus
              selectTextOnFocus
            />
            <View style={styles.renameButtons}>
              <TouchableOpacity
                onPress={() => handleRename(thread.id)}
                style={styles.renameSaveButton}
              >
                <Ionicons name="checkmark" size={16} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRenamingId(null);
                  setRenameValue('');
                }}
                style={styles.renameCancelButton}
              >
                <Ionicons name="close" size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Normal Mode
          <>
            <TouchableOpacity
              onPress={() => handleSelectThread(thread.id)}
              style={styles.threadButton}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.threadTitle, isSelected && styles.threadTitleSelected]}
                numberOfLines={1}
              >
                {thread.title}
              </Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.threadActions}>
              <TouchableOpacity
                onPress={() => startRename(thread)}
                style={styles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(thread.id)}
                style={styles.actionButton}
              >
                <Ionicons name="trash-outline" size={14} color="rgba(255, 255, 255, 0.4)" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sidebar} onPress={e => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Threads</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.6)" />
            </TouchableOpacity>
          </View>

          {/* Thread List */}
          {threads.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No threads yet</Text>
            </View>
          ) : (
            <FlatList
              data={threads}
              renderItem={renderThread}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: '80%',
    maxWidth: 300,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 60, // Account for status bar
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  closeButton: {
    padding: 4,
  },
  listContent: {
    padding: 12,
    paddingBottom: 100,
  },
  threadItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 8,
    overflow: 'hidden',
  },
  threadItemSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  threadButton: {
    padding: 12,
  },
  threadTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  threadTitleSelected: {
    color: '#ffffff',
    fontWeight: '500',
  },
  threadActions: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  actionButton: {
    padding: 4,
  },
  renameContainer: {
    padding: 12,
  },
  renameInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  renameButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  renameSaveButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  renameCancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});

