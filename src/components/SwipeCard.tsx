import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native-web';
import { animated, useSpring } from '@react-spring/web';

interface SwipeCardProps {
  user: {
    id: string;
    name: string;
    age: number;
    bio: string;
    photos: string[];
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const AnimatedView = animated(View);

export function SwipeCard({ user, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const [{ x, rotate }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    config: { tension: 300, friction: 20 }
  }));

  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    startX.current = clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    api.start({
      x: deltaX,
      rotate: deltaX / 10,
      immediate: true
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    const threshold = 100;

    if (Math.abs(currentX) > threshold) {
      if (currentX > 0) {
        api.start({
          x: 500,
          rotate: 45,
          onRest: onSwipeRight
        });
      } else {
        api.start({
          x: -500,
          rotate: -45,
          onRest: onSwipeLeft
        });
      }
    } else {
      api.start({
        x: 0,
        rotate: 0
      });
    }
  };

  return (
    <AnimatedView
      style={{
        ...styles.card,
        transform: `translateX(${x.to(x => `${x}px`)}) rotate(${rotate.to(r => `${r}deg`)})`
      } as any}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <View style={styles.photoContainer}>
        <Image 
          source={{ uri: user.photos[0] }}
          style={styles.photo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.actions}>
        <View style={[styles.action, styles.actionLeft]}>
          <Text style={styles.actionText}>←</Text>
        </View>
        <View style={[styles.action, styles.actionRight]}>
          <Text style={styles.actionText}>→</Text>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    touchAction: 'none',
    userSelect: 'none',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  photoContainer: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    opacity: 0.8,
  },
  action: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLeft: {
    backgroundColor: '#ff4444',
  },
  actionRight: {
    backgroundColor: '#44dd44',
  },
  actionText: {
    fontSize: 24,
    color: 'white',
  },
});