import { Socket, io } from 'socket.io-client';
import { VideoCall } from '../types/User';

export class VideoCallService {
  private socket: Socket;
  private currentCall: VideoCall | null = null;
  private timer: any;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;

  constructor() {
    this.socket = io('YOUR_SIGNALING_SERVER_URL');
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      if (!this.peerConnection) return;
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit('answer', answer);
    });

    this.socket.on('answer', async (answer: RTCSessionDescriptionInit) => {
      if (!this.peerConnection) return;
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    this.socket.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      if (!this.peerConnection) return;
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  async initiateCall(matchId: string, initiatorId: string, receiverId: string) {
    this.currentCall = {
      id: `${matchId}-${Date.now()}`,
      matchId,
      initiatorId,
      receiverId,
      startTime: Date.now(),
      duration: 10, // Initial 10 seconds
      loveCoinsSpent: 0
    };

    await this.setupPeerConnection();
    this.startTimer();
    
    return this.currentCall;
  }

  private async setupPeerConnection() {
    const configuration = { 
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    this.peerConnection = new RTCPeerConnection(configuration);

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('ice-candidate', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
    };

    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      this.localStream.getTracks().forEach(track => {
        if (this.localStream && this.peerConnection) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });
    } catch (error) {
      throw new Error(`Media access failed: ${error.message}`);
    }
  }

  private startTimer() {
    this.timer = setTimeout(() => {
      if (this.currentCall) {
        this.endCall();
      }
    }, this.currentCall!.duration * 1000);
  }

  async extendCall(loveCoins: number) {
    if (!this.currentCall) return;

    const secondsToAdd = loveCoins * 10; // 1 LoveCoin = 10 seconds
    this.currentCall.duration += secondsToAdd;
    this.currentCall.loveCoinsSpent += loveCoins;

    clearTimeout(this.timer);
    this.startTimer();
  }

  async endCall() {
    if (!this.currentCall) return;

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }

    if (this.peerConnection) {
      this.peerConnection.close();
    }

    this.socket.disconnect();
    
    const callData = { ...this.currentCall };
    this.currentCall = null;
    clearTimeout(this.timer);
    
    return callData;
  }
}