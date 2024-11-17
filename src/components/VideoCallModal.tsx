import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import { useUserStore } from '../store/userStore';

interface VideoCallModalProps {
  matchedUser: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export function VideoCallModal({ matchedUser, onClose }: VideoCallModalProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCallActive, setIsCallActive] = useState(true);
  const { currentUser, updateLoveCoins } = useUserStore();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Démarrer la caméra
    startCamera();

    // Timer pour les 10 secondes initiales
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsCallActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
    } catch (error) {
      console.error('Erreur accès caméra:', error);
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
  };

  const handleExtendCall = () => {
    if (currentUser && currentUser.loveCoins >= 10) {
      updateLoveCoins(-10); // Déduire 10 LoveCoins
      setTimeLeft(prev => prev + 10); // Ajouter 10 secondes
      setIsCallActive(true);
    } else {
      alert('Pas assez de LoveCoins !');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.videoContainer}>
        {localStream && (
          <video
            style={styles.localVideo}
            autoPlay
            playsInline
            muted
            ref={(video) => {
              if (video) video.srcObject = localStream;
            }}
          />
        )}
        {remoteStream && (
          <video
            style={styles.remoteVideo}
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
          />
        )}
      </View>

      <View style={styles.controls}>
        <Text style={styles.timer}>
          Temps restant: {timeLeft}s
        </Text>
        
        {!isCallActive && currentUser?.loveCoins >= 10 && (
          <TouchableOpacity 
            style={styles.extendButton}
            onPress={handleExtendCall}
          >
            <Text style={styles.extendButtonText}>
              Prolonger (10 LoveCoins)
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.endButton}
          onPress={onClose}
        >
          <Text style={styles.endButtonText}>
            Terminer l'appel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: '70%',
    position: 'relative',
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
  },
  controls: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  timer: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  extendButton: {
    backgroundColor: '#44dd44',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: 200,
  },
  extendButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 25,
    width: 200,
  },
  endButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});