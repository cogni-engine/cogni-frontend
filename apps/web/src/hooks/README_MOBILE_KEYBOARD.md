# Mobile Keyboard Detection Hook

## Overview
The `useMobileKeyboard` hook provides mobile device and keyboard visibility detection for the markdown editor toolbar.

## Features
- **Mobile Detection**: Automatically detects if the user is on a mobile device (screen width < 768px)
- **Keyboard Visibility**: Detects when the mobile keyboard is open using the Visual Viewport API
- **Keyboard Height**: Calculates the height of the mobile keyboard

## How It Works

### Visual Viewport API
The hook uses the `window.visualViewport` API to detect keyboard visibility:
- When the mobile keyboard opens, `visualViewport.height` decreases
- When the keyboard closes, `visualViewport.height` returns to normal
- The difference between `window.innerHeight` and `visualViewport.height` gives us the keyboard height

### Toolbar Behavior
Based on the keyboard state, the toolbar positioning changes:

#### Desktop or Mobile (keyboard hidden)
- Position: `sticky top-0`
- Toolbar stays at the top of the editor

#### Mobile (keyboard visible)
- Position: `fixed bottom-2`
- Toolbar sticks to the top of the mobile keyboard
- Automatically hides when the keyboard is dismissed
- Smooth transitions with `transition-all duration-200`

## Browser Support
The Visual Viewport API is supported in:
- iOS Safari 13+
- Chrome for Android 61+
- Samsung Internet 8.2+
- Firefox for Android 68+

For older browsers without Visual Viewport API support, the hook gracefully degrades to the default sticky behavior.

## Usage Example

```tsx
import { useMobileKeyboard } from '@/hooks/useMobileKeyboard';

function MyEditor() {
  const { isMobile, isKeyboardVisible, keyboardHeight } = useMobileKeyboard();
  
  return (
    <div
      className={`
        ${isMobile && isKeyboardVisible 
          ? 'fixed bottom-2' 
          : 'sticky top-0'}
      `}
    >
      {/* Toolbar content */}
    </div>
  );
}
```

## Implementation Details

### State Management
The hook returns an object with three properties:
```typescript
{
  isMobile: boolean;          // True if screen width < 768px
  isKeyboardVisible: boolean; // True if keyboard height > 150px
  keyboardHeight: number;     // Height of the keyboard in pixels
}
```

### Event Listeners
The hook listens to:
- `visualViewport.resize` - Detects when the viewport size changes
- `visualViewport.scroll` - Ensures updates when scrolling occurs
- `window.resize` - Updates mobile state when window is resized

All listeners are properly cleaned up on unmount.

## Performance Considerations
- Uses `useState` with a single state object to minimize re-renders
- Includes threshold (150px) to avoid false positives from browser chrome changes
- Event listeners are only attached on mobile devices
- Gracefully handles SSR (server-side rendering) environments

