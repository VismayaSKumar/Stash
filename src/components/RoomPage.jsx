import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../firebase.config';
import Webcam from 'react-webcam';

function RoomPage() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cap, setCap] = useState(null);
  const [snaps, setSnaps] = useState({});
  const [isSnapped, setIsSnapped] = useState(false);

  const [userId] = useState(() => Math.random().toString(36).substring(2, 12));
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // Video constraints you already use
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  // Register this user and track users in room
  useEffect(() => {
    set(ref(db, `room/${roomId}/users/${userId}`), { joinedAt: Date.now() })
      .then(() => setIsConnected(true));

    const usersRef = ref(db, `room/${roomId}/users`);
    const unsubscribeUsers = onValue(usersRef, snapshot => {
      const val = snapshot.val() || {};
      setUsers(Object.keys(val));
    });

    const snapsRef = ref(db, `room/${roomId}/snaps`);
    const unsubscribeSnaps = onValue(snapsRef, snapshot => {
      setSnaps(snapshot.val() || {});
    });

    return () => {
      set(ref(db, `room/${roomId}/users/${userId}`), null);
      unsubscribeUsers();
      unsubscribeSnaps();
    };
  }, [roomId, userId]);

  // Copy link logic
  
  const shareLink = `${window.location.origin}/Stash/#/room/${roomId}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => setCopied(true));
    setTimeout(() => setCopied(false), 2000);
  };

  // When you snap, save image to Firebase
  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setCap(imgSrc);
    setIsSnapped(true)
    set(ref(db, `room/${roomId}/snaps/${userId}`), { src: imgSrc, timestamp: Date.now() });
  }, [webcamRef, roomId, userId]);

  // Automatically navigate to results when both users have snapped
  useEffect(() => {
    if (users.length === 2 && Object.keys(snaps).length === 2) {
      // Use your Results page layout — both images passed as an array
      const capturedImages = Object.values(snaps);
      navigate("/results", { state: { capturedImages,roomId } });
    }
  }, [snaps, users, navigate]);

  return (
    <div className='h-screen w-full flex py-30 flex-col items-center bg-secondary p-6 font-fraunces -mt-10'>
      {/* Sharing link: only when first user is waiting */}
      {users.length === 1 && (
        <div className='bg-primary w-3/4 rounded-4xl py-10 px-16 flex flex-col gap-6 items-center justify-center'>
          <h1 className='font-fraunces text-4xl text-last'>Invite a Friend</h1>
          <div className='w-full flex font-fraunces'>
            <input type="text" readOnly value={shareLink} className='w-4/5 rounded-l-full bg-whites p-3 px-6' />
            <button onClick={copyToClipboard} className='bg-last w-1/5 rounded-r-full text-whites'>
              {copied ? "copied!" : "copy"}
            </button>
          </div>
          <div className='font-mclaren text-tertiary'>
            Share the link and wait for your friend to join the room...
          </div>
        </div>
      )}

      {/* When both users present, show webcam/snapping UI */}
      {users.length >= 2 && (
        <div className='flex flex-col w-full font-fraunces'>
          <div className='flex justify-around items-start'>
            <div className='preview p-2 h-full w-1/5 border-2 border-dotted flex justify-center items-center'>
              {cap && <img className='w-80' src={cap} alt="Your captured" />}
            </div>
            <div className='flex flex-col p-2 gap-5'>
                <p className="text-last text-center text-xl font-semibold">Both users connected! Snap your photo.</p>
              <Webcam
                className="w-[400px]"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored={true}
                videoConstraints={videoConstraints}
              />
              <div className='gap-40 flex justify-center items-center'>
                <button disabled={!isSnapped} onClick={() => {setCap(null);setIsSnapped(false)}} className='bg-buttonmain disabled:cursor-not-allowed disabled:opacity-50 hover:bg-buttonhover hover:text-last hover:scale-105 duration-300 text-whites rounded-4xl px-9 py-2'>
                  Retake
                </button>
                <button disabled={isSnapped} onClick={capture} className="bg-buttonmain hover:text-last hover:bg-buttonhover hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 duration-300 text-whites rounded-4xl px-9 py-2 font-light">
                  Snap
                </button>
              </div>
            </div>
            <div className=' w-1/4  bg-primary p-5 flex flex-col gap-2 rounded-xl px-8 pt-8 pb-15 '>
              <h1 className='text-lg font-bold text-tertiary text-center '>Instructions</h1>
              <p>1. Pose</p>
              <p>2. Click Snap</p>
              <p>3. Wait until your friend clicks a snap to try on different frames</p>
              <p>You will be automatically navigated to the next page when both are done </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomPage;
