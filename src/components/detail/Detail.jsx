import React from 'react'
import './detail.css'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion } from 'firebase/firestore'
import { doc, updateDoc } from 'firebase/firestore'

const Detail = () => {

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();

  const { currentUser } = useUserStore();

  const userDocRef = doc(db, 'users', user.id);

  const handleBlock = async () => {

    if(!user) return;

    try{
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock();
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>privacy and help</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>shared Photos</span>
            <img src="./arrowDown.png" alt="" /> 
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://cdn.pixabay.com/photo/2023/11/03/10/47/ai-generated-8362679_640.jpg" alt="" />
                <span>photo_2023_7.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://cdn.pixabay.com/photo/2023/11/03/10/47/ai-generated-8362679_640.jpg" alt="" />
                <span>photo_2023_7.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://cdn.pixabay.com/photo/2023/11/03/10/47/ai-generated-8362679_640.jpg" alt="" />
                <span>photo_2023_7.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" /> 
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User Blocked" : "Block user"}
        </button>
        <button className='logout' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail