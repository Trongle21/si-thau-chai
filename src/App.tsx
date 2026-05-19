import { useEffect, useState } from "react";
import "./App.css";
import HeartCanvas, {
  Guestbook,
  SI_THAU_CHAI_IMAGES,
} from "./components/HeartCanvas";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SI_THAU_CHAI_IMAGES_2 = [
  {
    url: "https://ik.imagekit.io/tvlk/blog/2024/01/go-and-share-ban-si-thau-chai-lai-chau-2-1024x768.webp?tr=q-70,c-at_max,w-1000,h-600",
    alt: "Núi rừng Tây Bắc hùng vĩ",
    caption: "Welcome to the SI THAU CHAI",
  },
  {
    url: "https://file.smiletrip.vn/posts/vi-vn/2025/01/16/1174/si-thau-chai-lai-chau-7.jpg",
    alt: "Săn mây cùng em nha",
    caption: "Săn mây cùng em nha",
  },
  {
    url: "https://mia.vn/media/uploads/blog-du-lich/si-thau-chai-3-1731866463.jpg",
    alt: "Sông nước và thung lũng xanh",
    caption: "I wish see the waterfall with my love ahahahaa",
  },
  {
    url: "https://i.ex-cdn.com/vntravellive.com/files/news/2024/10/14/giua-may-ngan-tim-ve-chon-binh-yen-si-thau-chai-121237.jpg",
    alt: "Biển mây trên núi",
    caption: "Sooo Chill",
  },
  {
    url: "https://cdn.tcdulichtphcm.vn/upload/4-2024/images/2024-10-26/464000832_2942105865966250_5875548646956490935_n-1729918786-649-width1280height960.jpg",
    alt: "Rừng cây xanh tươi",
    caption: "Ảnh homestay của chúng ta nè",
  },
  {
    url: "https://img.thuonghieusanpham.vn/img/TAPCHI_THSP/news_dataimages/nguyenmai/112021/30/10/in_article/5836_2.png?rt=20211130105837",
    alt: "Rừng cây xanh tươi",
    caption: "Foodddddd",
  },
  {
    url: "https://mia.vn/media/uploads/blog-du-lich/si-thau-chai-1-1731866463.jpg",
    alt: "Rừng cây xanh tươi",
    caption: "Mong chờ cho cuộc đi chơi với em sắp tới ahahaha",
  },
];

const DESTINATION_DATE = new Date("2026-05-23T00:00:00").getTime();
// const DESTINATION_DATE = Date.now() + 1000 * 2 * 1;

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [showHeartCanvas, setShowHeartCanvas] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = DESTINATION_DATE - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setIsCountdownFinished(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SI_THAU_CHAI_IMAGES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? SI_THAU_CHAI_IMAGES.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SI_THAU_CHAI_IMAGES.length);
  };

  return (
    <>
      {showHeartCanvas ? (
        <>
          <HeartCanvas onHeartClick={() => setShowGuestbook(true)} />
          <Guestbook
            isOpen={showGuestbook}
            onClose={() => setShowGuestbook(false)}
          />
        </>
      ) : (
        <div className="app">
          <header className="hero">
            {/* <div className="hero-overlay"></div> */}
            <div className="hero-content">
              <div className="badge">
                <span className="badge-icon">🚌🚌🚌</span>
                <span>Sắp khởi hành nha Mơ oi</span>
              </div>
              <p className="subtitle">Hành trình 2 ngày 2 đêm cùng em iu</p>

              <div className="countdown-container">
                <div className="countdown-label">Thời gian đếm ngược</div>
                <div className="countdown">
                  <div className="countdown-item">
                    <div className="countdown-value">
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="countdown-unit">Ngày</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="countdown-unit">Giờ</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="countdown-unit">Phút</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <div className="countdown-value">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="countdown-unit">Giây</div>
                  </div>
                </div>
              </div>

              {!isCountdownFinished && !showHeartCanvas && (
                <div className="password-section">
                  <input
                    type="password"
                    className="password-input"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (password === "160201moa") {
                          setShowHeartCanvas(true);
                        } else {
                          setPasswordError(true);
                        }
                      }
                    }}
                  />
                  <button
                    className="heart-button"
                    onClick={() => {
                      if (password === "160201moa") {
                        setShowHeartCanvas(true);
                      } else {
                        setPasswordError(true);
                      }
                    }}
                  >
                    Mở trái tim 💖
                  </button>
                  {passwordError && (
                    <p className="password-error">
                      Sai mật khẩu rồi nha! Thử lại đi 💔
                    </p>
                  )}
                </div>
              )}

              {isCountdownFinished && !showHeartCanvas && (
                <button
                  className="heart-button"
                  onClick={() => setShowHeartCanvas(true)}
                >
                  Mở trái tim 💖
                </button>
              )}
            </div>
          </header>

          <section className="gallery-section">
            <div className="section-header">
              <h2 className="section-title" style={{ color: "#fff" }}>
                Siêu mê
              </h2>
            </div>

            <div className="carousel">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {SI_THAU_CHAI_IMAGES_2.map((image, index) => (
                  <div className="carousel-slide" key={index}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="slide-overlay">
                      <p className="slide-caption">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-btn carousel-btn--prev"
                onClick={prevSlide}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                className="carousel-btn carousel-btn--next"
                onClick={nextSlide}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              <div className="carousel-dots">
                {SI_THAU_CHAI_IMAGES_2.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="thumbnails">
              {SI_THAU_CHAI_IMAGES_2.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                >
                  <img src={image.url} alt={image.alt} />
                </div>
              ))}
            </div>
          </section>

          <section className="info-section">
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">🏔️</div>
                <h3>Địa điểm</h3>
                <p>Mù Cang Chải, Yên Bái</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📅</div>
                <h3>Thời gian</h3>
                <p>23 - 26/05/2026</p>
              </div>
              <div className="info-card">
                <div className="info-icon">👥</div>
                <h3>Thành viên</h3>
                <p>Chỉ có chúng ta thui</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🎒</div>
                <h3>Hoạt động</h3>
                <p>Chơi với em iu</p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="footer-content">
              <p className="footer-quote">
                "Hành trình ngàn dặm bắt đầu từ một bước chân"
              </p>
              <p className="footer-motivation">
                Chỉ còn <strong>{timeLeft.days}</strong> ngày nữa... Waiting for
                the moment to be with you
              </p>
              <p>❤❤❤❤</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
