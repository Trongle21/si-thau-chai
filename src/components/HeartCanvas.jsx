import { useEffect, useRef, useState, useCallback } from "react";
import { useHeartAnimation } from "../hooks/useHeartAnimation";
import "./HeartCanvas.css";

const SI_THAU_CHAI_IMAGES = [
  {
    url: "https://ik.imagekit.io/tvlk/blog/2024/01/go-and-share-ban-si-thau-chai-lai-chau-2-1024x768.webp?tr=q-70,c-at_max,w-1000,h-600",
    alt: "Núi rừng Tây Bắc hùng vĩ",
    caption: "Chỉ",
    message: "",
  },
  {
    url: "https://file.smiletrip.vn/posts/vi-vn/2025/01/16/1174/si-thau-chai-lai-chau-7.jpg",
    alt: "Săn mây cùng em nha",
    caption: "Muốn",
    message: "",
  },
  {
    url: "https://mia.vn/media/uploads/blog-du-lich/si-thau-chai-3-1731866463.jpg",
    alt: "Thác nước hùng vĩ",
    caption: "Nói",
    message: "",
  },
  {
    url: "https://i.ex-cdn.com/vntravellive.com/files/news/2024/10/14/giua-may-ngan-tim-ve-chon-binh-yen-si-thau-chai-121237.jpg",
    alt: "Biển mây trên núi",
    caption: "Với",
    message: "",
  },
  {
    url: "https://cdn.tcdulichtphcm.vn/upload/4-2024/images/2024-10-26/464000832_2942105865966250_5875548646956490935_n-1729918786-649-width1280height960.jpg",
    alt: "Homestay xinh xắn",
    caption: "Cả",
    message: "",
  },
  {
    url: "https://img.thuonghieusanpham.vn/img/TAPCHI_THSP/news_dataimages/nguyenmai/112021/30/10/in_article/5836_2.png?rt=20211130105837",
    alt: "Đặc sản Tây Bắc",
    caption: "Thế",
    message: "",
  },
  {
    url: "https://mia.vn/media/uploads/blog-du-lich/si-thau-chai-1-1731866463.jpg",
    alt: "Cánh đồng lúa",
    caption: "Giới",
    message: "",
  },
  {
    url: "https://mia.vn/media/uploads/blog-du-lich/si-thau-chai-1-1731866463.jpg",
    alt: "Cánh đồng lúa",
    caption: "I love you so much!",
    message: "",
  },
];

const Guestbook = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = SI_THAU_CHAI_IMAGES.length;

  const goNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goNext, goPrev, onClose]);

  if (!isOpen) return null;

  const currentImage = SI_THAU_CHAI_IMAGES[currentPage];

  return (
    <div className="guestbook-overlay" onClick={onClose}>
      <div className="guestbook-container" onClick={(e) => e.stopPropagation()}>
        <button className="guestbook-close" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="guestbook-page">
          <div className="page-image-section">
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="page-image"
            />
            <div className="page-image-overlay">
              <span className="page-number">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          </div>

          <div className="page-content-section">
            <div className="page-content-inner">
              <h2 className="page-title">{currentImage.caption}</h2>
              <div className="page-divider"></div>
              <p className="page-message">{currentImage.message}</p>

              <div className="page-decoration">
                <span className="heart-icon">💕</span>
              </div>
            </div>
          </div>
        </div>

        <button className="nav-btn nav-btn--prev" onClick={goPrev}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button className="nav-btn nav-btn--next" onClick={goNext}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="page-dots">
          {SI_THAU_CHAI_IMAGES.map((_, index) => (
            <button
              key={index}
              className={`page-dot ${index === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HeartCanvas = ({ onHeartClick }) => {
  const { canvasRef, initAnimation } = useHeartAnimation();
  const [isFormed, setIsFormed] = useState(false);
  const isFormedRef = useRef(false);

  useEffect(() => {
    if (isFormedRef.current) return;

    const cleanup = initAnimation();

    const checkFormation = setInterval(() => {
      if (canvasRef.current && !isFormedRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const imageData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          const data = imageData.data;
          let nonBlackPixels = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i] > 30 || data[i + 1] > 30 || data[i + 2] > 30) {
              nonBlackPixels++;
            }
          }
          if (nonBlackPixels > 5000) {
            isFormedRef.current = true;
            setIsFormed(true);
            clearInterval(checkFormation);
          }
        }
      }
    }, 500);

    return () => {
      cleanup?.();
      clearInterval(checkFormation);
    };
  }, [initAnimation]);

  const handleClick = (e) => {
    if (!isFormed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (distance < canvas.width * 0.15) {
      onHeartClick?.();
    }
  };

  return (
    <div className="heart-canvas-wrapper">
      <canvas ref={canvasRef} className="heart-canvas" onClick={handleClick} />
      {/* {isFormed && (
        <div className="heart-click-hint">
          <span className="pulse-heart">💖</span>
          <span className="hint-text">Click vào đây</span>
        </div>
      )} */}
    </div>
  );
};

export default HeartCanvas;
export { Guestbook, SI_THAU_CHAI_IMAGES };
