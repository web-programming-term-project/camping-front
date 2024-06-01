import "../css/site.css";
export default function Site({ siteData, onEdit, onDelete }) {
  const { sitePhotoUrl, siteName, category, pCapacity, charge } = siteData;

  return (
    <div className="site-container">
      <div>이미지 {sitePhotoUrl}</div>
      <div>사이트 이름 {siteName}</div>
      <div>카테고리 {category}</div>
      <div>인원수 {pCapacity}</div>
      <div>가격 {charge}</div>
      <button onClick={onEdit}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}
