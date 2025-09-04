import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ChatUser {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  text: string;
  time: string;
}

interface MyPost {
  id: number;
  title: string;
  date: string;
  type: 'found' | 'lost'; // 습득신고 or 분실신고
}

// 채팅 메시지 데이터 타입 정의
interface ChatMessagesData {
  [key: number]: ChatMessage[];
}

// 임시 쪽지 사용자 데이터
const dummyChatUsers: ChatUser[] = [
  { id: 1, name: '익명0100', lastMessage: '안녕하세요, 물건 찾으셨나요?', lastMessageTime: '7시간 전' },
  { id: 2, name: '익명0100', lastMessage: '네, 습득하신 물건이 제 것 같아요!', lastMessageTime: '7시간 전' },
  { id: 3, name: '익명0100', lastMessage: '연락 감사합니다.', lastMessageTime: '7시간 전' },
];

// 임시 내가 쓴 글 데이터
const dummyMyPosts: MyPost[] = [
  { id: 1, title: '광토 유캔두잇에서 지갑 주움', date: '25.08.14', type: 'found' },
  { id: 2, title: '광토 유캔두잇에서 지갑 주움', date: '25.08.14', type: 'found' },
  { id: 3, title: '광토 유캔두잇에서 지갑 주움', date: '25.08.14', type: 'found' },
];

// 임시 대화 내용 데이터
const dummyChatMessages: ChatMessagesData = {
  1: [
    { id: 1, senderId: 1, text: '안녕하세요. 혹시 학생증 찾으셨나요?', time: '10:25 AM' },
    { id: 2, senderId: 99, text: '네, 제가 가지고 있습니다. 어디서 잃어버리셨나요?', time: '10:28 AM' },
    { id: 3, senderId: 1, text: '광대토관에서 잃어버린 것 같아요. 혹시 전달해주실 수 있을까요?', time: '10:30 AM' },
    { id: 4, senderId: 99, text: '네, 가능합니다. 학술정보원 앞에서 만날 수 있을까요?', time: '10:32 AM' },
  ],
  2: [
    { id: 1, senderId: 2, text: '안녕하세요. 에어팟 프로 찾으셨다고 해서 연락드렸어요.', time: 'Yesterday' },
    { id: 2, senderId: 99, text: '네, 맞습니다. 혹시 어떤 색깔이신가요?', time: 'Yesterday' },
  ]
};

const MyPage = () => {
  const navigate = useNavigate();
  
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [myPosts, setMyPosts] = useState<MyPost[]>(dummyMyPosts);

  useEffect(() => {
    if (selectedUser) {
      setMessages(dummyChatMessages[selectedUser.id] || []);
    }
  }, [selectedUser]);

  const handleUserClick = (user: ChatUser) => {
    setSelectedUser(user);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedUser) return;
    const newMsg: ChatMessage = {
      id: messages.length + 1,
      senderId: 99,
      text: newMessage,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  // 회원탈퇴 처리
  const handleWithdraw = () => {
    const confirmed = window.confirm('정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
    
    if (confirmed) {
      // 백엔드 API 호출
      // try {
      //   await fetch('/api/users/withdraw', {
      //     method: 'DELETE',
      //     headers: {
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //       'Content-Type': 'application/json',
      //     },
      //   });
      // } catch (error) {
      //   console.error('회원탈퇴 중 오류 발생:', error);
      //   alert('회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
      //   return;
      // }

      // 로컬 스토리지 정리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/');
    }
  };

  // 내가 쓴 글 클릭 시 해당 게시물로 이동
  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <PageWrapper>
      <ContentContainer>
        <LeftPanel>
          <ProfileSection>
            <SectionTitle>프로필</SectionTitle>
            <ProfileContent>
              <ProfileImage />
              <ProfileInfo>
                <ProfileName>서연</ProfileName>
                <EditButton>수정</EditButton>
              </ProfileInfo>
              <StudentNumber>24061526</StudentNumber>
              
              <PasswordLink>비밀번호 수정</PasswordLink>
              <WithdrawText onClick={handleWithdraw}>회원탈퇴</WithdrawText>
            </ProfileContent>
          </ProfileSection>

          <MyInfoSection>
            <SectionTitle>내가 쓴 글</SectionTitle>
            <PostList>
              {myPosts.map((post) => (
                <PostItem key={post.id} onClick={() => handlePostClick(post.id)}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDate>{post.date}</PostDate>
                </PostItem>
              ))}
            </PostList>
          </MyInfoSection>
        </LeftPanel>

        <MiddlePanel>
          <SectionTitle>쪽지함</SectionTitle>
          <ChatUserList>
            {dummyChatUsers.map((user) => (
              <ChatUserCard 
                key={user.id} 
                onClick={() => handleUserClick(user)}
                isSelected={selectedUser?.id === user.id}
              >
                <UserIcon />
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <LastMessage>{user.lastMessage}</LastMessage>
                </UserInfo>
                <MessageTime>{user.lastMessageTime}</MessageTime>
              </ChatUserCard>
            ))}
          </ChatUserList>
        </MiddlePanel>

        <RightPanel>
          {selectedUser ? (
            <ChatContainer>
              <ChatHeader>
                <ChatUserIcon />
                <ChatUserName>{selectedUser.name}</ChatUserName>
              </ChatHeader>
              
              <ChatMessagesContainer>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} isMine={msg.senderId === 99}>
                    <MessageBubble isMine={msg.senderId === 99}>
                      {msg.text}
                    </MessageBubble>
                    <MessageTimeStamp>{msg.time}</MessageTimeStamp>
                  </ChatMessage>
                ))}
              </ChatMessagesContainer>
              
              <MessageInputContainer>
                <MessageInputField 
                  type="text" 
                  placeholder="메시지를 입력하세요..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <SendButton onClick={handleSendMessage}>전송</SendButton>
              </MessageInputContainer>
            </ChatContainer>
          ) : (
            <EmptyChatView>
              <EmptyText>메시지를 선택하세요</EmptyText>
            </EmptyChatView>
          )}
        </RightPanel>
      </ContentContainer>

      <BottomButton onClick={() => navigate(-1)}>
        뒤로가기
      </BottomButton>
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  background-color: transparent; /* f5f5f5 대신 투명하게 변경 */
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 320px 460px 1fr;
  gap: 0;
  height: calc(100vh - 120px);
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const Panel = styled.div`
  background: white;
  padding: 1.5rem;
  overflow-y: auto;
  border-right: 1px solid #ddd;
`;

const LeftPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MiddlePanel = styled(Panel)``;

const RightPanel = styled(Panel)`
  padding: 0;
  border-right: none;
`;

const ProfileSection = styled.div``;

const SectionTitle = styled.h3`
  color: #5b4cdb;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #d3d3d3;
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const ProfileName = styled.h2`
  color: #333;
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
`;

const EditButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const StudentNumber = styled.div`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const PasswordLink = styled.a`
  color: #ff69b4;
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #ff1493;
  }
`;

const WithdrawText = styled.button`
  color: #ff69b4;
  font-size: 0.9rem;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  
  &:hover {
    color: #ff1493;
  }
`;

const MyInfoSection = styled.div``;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PostItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background-color: #f8f9ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.div`
  color: #5b4cdb;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const PostDate = styled.div`
  color: #999;
  font-size: 0.8rem;
`;

const ChatUserList = styled.div`
  margin-top: 1rem;
`;

const ChatUserCard = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${({ isSelected }) => (isSelected ? '#f0f0ff' : 'transparent')};
  
  &:hover {
    background-color: #f8f8ff;
  }
`;

const UserIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #d3d3d3;
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  color: #5b4cdb;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const LastMessage = styled.div`
  color: #999;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageTime = styled.div`
  color: #ccc;
  font-size: 0.75rem;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const ChatUserIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #d3d3d3;
  margin-right: 0.75rem;
`;

const ChatUserName = styled.div`
  color: #5b4cdb;
  font-size: 1rem;
  font-weight: 500;
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f9f9f9;
`;

const ChatMessage = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
  margin-bottom: 1rem;
`;

const MessageBubble = styled.div<{ isMine: boolean }>`
  background-color: ${({ isMine }) => (isMine ? '#5b4cdb' : 'white')};
  color: ${({ isMine }) => (isMine ? 'white' : '#333')};
  padding: 0.75rem 1rem;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MessageTimeStamp = styled.span`
  font-size: 0.7rem;
  color: #999;
  margin-top: 0.25rem;
`;

const MessageInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background: white;
  gap: 0.5rem;
`;

const MessageInputField = styled.input`
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 0.9rem;
  
  &:focus {
    border-color: #5b4cdb;
  }
`;

const SendButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 15px;
  background-color: #5b4cdb;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #4a3eb8;
  }
`;

const EmptyChatView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f9f9f9;
`;

const EmptyText = styled.p`
  color: #999;
  font-size: 1rem;
`;

const BottomButton = styled.button`
  align-self: flex-end;
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  border: 1px solid #ddd;
  background: white;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;