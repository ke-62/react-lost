import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface ChatUser {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  postId?: number;
  postTitle?: string;
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
  type: string;
}

// 채팅 메시지 데이터 타입 정의
interface ChatMessagesData {
  [key: number]: ChatMessage[];
}

// 임시 쪽지 사용자 데이터 (id 3 제거)
const dummyChatUsers: ChatUser[] = [
  { id: 1, name: '익명0100', lastMessage: '안녕하세요, 물건 찾으셨나요?', lastMessageTime: '7시간 전' },
  { id: 2, name: '익명0100', lastMessage: '네, 습득하신 물건이 제 것 같아요!', lastMessageTime: '7시간 전' },
];

// 임시 내가 쓴 글 데이터
const dummyMyPosts: MyPost[] = [
  { id: 1, title: '광개토관에서 에어팟 발견', date: '25.08.14', type: 'found' },
];

// 임시 대화 내용 데이터
const dummyChatMessages: ChatMessagesData = {
  1: [
    { id: 1, senderId: 1, text: '안녕하세요. 혹시 에어팟 프로2 버젼 맞을까요?', time: '10:25 AM' },
    { id: 2, senderId: 99, text: '네, 맞습니다. 무슨색 케이스일까요?', time: '10:28 AM' },
    { id: 3, senderId: 1, text: ' 연두색 케이스입니다.', time: '10:30 AM' },
    { id: 4, senderId: 99, text: '네, 맞습니다. 오늘 학술정보원 앞에서 만날 수 있을까요?', time: '10:32 AM' },
    { id: 5, senderId: 1, text: '네, 감사합니다! 한 10분 내로 도착합니다!', time: '10:35 AM' },
  ],
  2: [
    { id: 1, senderId: 99, text: '안녕하세요. 찾으셨다는 지갑 검정색 반지갑에 김세종 학생증 있는거 맞을까요??', time: 'Yesterday' },
    { id: 2, senderId: 2, text: '네, 맞습니다! ', time: 'Yesterday' },
    { id: 3, senderId: 99, text: '감사합니다! 오늘 학술정보원 앞에서 만날 수 있을까요?', time: 'Yesterday' },
    { id: 4, senderId: 2, text: '네, 알겠습니다. 바로 갈게요!', time: 'Yesterday' },
  ]
};

const MyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [myPosts, setMyPosts] = useState<MyPost[]>(dummyMyPosts);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>(dummyChatUsers);

  useEffect(() => {


    const storedChats = JSON.parse(localStorage.getItem('chatUsers') || '[]');
    const mergedChats = [...dummyChatUsers, ...storedChats];
    setChatUsers(mergedChats);

    // navigate로 전달된 selectedUserId가 있으면 해당 사용자 선택
    if (location.state?.selectedUserId) {
      const userToSelect = mergedChats.find(u => u.id === location.state.selectedUserId);
      if (userToSelect) {
        setSelectedUser(userToSelect);
      }
      // state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

  const handleWithdraw = () => {
    const confirmed = window.confirm('정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.');

    if (confirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.clear();

      alert('회원탈퇴가 완료되었습니다.');
      navigate('/', { replace: true });
      window.location.reload();
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  // 게시물 제목 가져오기 함수
  const getPostTitle = (userId: number) => {
    const user = chatUsers.find(u => u.id === userId);
    if (user?.postTitle) {
      return user.postTitle;
    }

    // postId가 있으면 posts에서 찾기
    if (user?.postId) {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      const post = posts.find((p: any) => p.id === user.postId);
      if (post) return post.title;
    }

    // 기본 더미 데이터에 대한 제목
    const dummyTitles: { [key: number]: string } = {
      1: '광개토관에서 에어팟 발견',
      2: '학습정보관 4층 열람실에서 검정색 지갑 발견'
    };
    return dummyTitles[userId] || null;
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
                <ProfileName>김세종</ProfileName>
              </ProfileInfo>
              <StudentNumber>25012345</StudentNumber>

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
            {chatUsers.map((user) => (
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

              {getPostTitle(selectedUser.id) && (
                <PostInfoBanner>
                  <PostInfoIcon>📝</PostInfoIcon>
                  <PostInfoText>{getPostTitle(selectedUser.id)}</PostInfoText>
                </PostInfoBanner>
              )}

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


const PostInfoBanner = styled.div`
  background: #f0f0ff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostInfoIcon = styled.span`
  font-size: 1rem;
`;

const PostInfoText = styled.span`
  color: #5b4cdb;
  font-size: 0.85rem;
  font-weight: 500;
`;
