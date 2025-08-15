// /src/pages/PostWritePage.tsx
// 새 게시글을 작성하는 페이지
import React from 'react';

const PostWritePage = () => {
  // TODO: 폼 상태 관리 로직 (useState, useForm 등)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 폼 데이터로 FormData 객체 생성 후 createPost API 호출
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>게시글 작성</h2>
      
      <div>
        <label><input type="radio" name="type" value="lost" defaultChecked /> 분실물</label>
        <label><input type="radio" name="type" value="found" /> 습득물</label>
      </div>

      <div><label>제목: <input type="text" name="title" /></label></div>
      <div><label>날짜: <input type="date" name="item_date" /></label></div>
      <div><label>장소(건물): <input type="text" name="location" /></label></div>
      <div><label>상세 내용: <textarea name="content"></textarea></label></div>
      <div><label>이미지: <input type="file" name="image" /></label></div>

      <button type="submit">작성 완료</button>
    </form>
  );
};

export default PostWritePage;