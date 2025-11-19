import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { WorkspaceMember, Note } from '@cogni/types';

type ChatInputProps = {
  onSend: (
    content: string,
    fileIds?: number[],
    mentionedMemberIds?: number[],
    mentionedNoteIds?: number[]
  ) => void;
  onStop?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  canStop?: boolean;
  threadId?: number | null;
  workspaceMembers?: WorkspaceMember[];
  workspaceNotes?: Note[];
};

export type ChatInputRef = {
  focus: () => void;
  clear: () => void;
};

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  function ChatInput(
    {
      onSend,
      onStop,
      isLoading = false,
      placeholder = 'Ask anything',
      canStop = true,
      threadId,
      workspaceMembers = [],
      workspaceNotes = [],
    },
    ref
  ) {
    const [text, setText] = useState('');
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        setText('');
      },
    }));

    const handleSend = () => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      onSend(trimmed, undefined, undefined, undefined);
      setText('');
    };

    const handleStop = () => {
      if (onStop && canStop) {
        onStop();
      }
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          <BlurView intensity={25} tint="dark" style={styles.inputWrapper}>
            {/* Inner highlight for shiny top edge effect */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0)']}
              style={styles.innerHighlight}
              pointerEvents="none"
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder={placeholder}
              placeholderTextColor='#9ca3af'
              multiline
              maxLength={4000}
              editable={!isLoading}
              onSubmitEditing={handleSend}
              blurOnSubmit={false}
            />
            <View style={styles.buttonContainer}>
              {isLoading && canStop ? (
                <BlurView intensity={70} tint="dark" style={styles.stopButton}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0)']}
                    style={styles.buttonInnerHighlight}
                    pointerEvents="none"
                  />
                  <TouchableOpacity
                    onPress={handleStop}
                    style={styles.buttonTouchable}
                    activeOpacity={0.7}
                  >
                    <View style={styles.stopIcon} />
                  </TouchableOpacity>
                </BlurView>
              ) : isLoading ? (
                <ActivityIndicator color='#ffffff' size='small' />
              ) : (
                <BlurView intensity={70} tint="dark" style={styles.sendButton}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0)']}
                    style={styles.buttonInnerHighlight}
                    pointerEvents="none"
                  />
                  <TouchableOpacity
                    onPress={handleSend}
                    style={[
                      styles.buttonTouchable,
                      !text.trim() && styles.sendButtonDisabled,
                    ]}
                    disabled={!text.trim()}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name='arrow-up'
                      size={20}
                      color='#ffffff'
                    />
                  </TouchableOpacity>
                </BlurView>
              )}
            </View>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  keyboardAvoid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 32, // rounded-4xl (very rounded)
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
    minHeight: 56,
    overflow: 'hidden', // Required for BlurView to work with borderRadius
    // Complex shadow effect to match web: 0_8px_32px_rgba(0,0,0,0.15)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  innerHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 12, // Gradient fades over 12px
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    maxHeight: 140,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 8,
  },
  buttonContainer: {
    marginLeft: 8,
    marginBottom: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden', // Required for BlurView to work with borderRadius
    // Shadow effect matching web
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden', // Required for BlurView to work with borderRadius
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonInnerHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20, // Half of button height (40px / 2)
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  stopIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
});

export default ChatInput;

