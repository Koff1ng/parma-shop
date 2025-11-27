import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      
      {/* 🔥 VIDEO BACKGROUND */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>BLACK FRIDAY</h1>
        <h2>HASTA -60%</h2>
        <p>TIEMPO LIMITADO</p>

        <a href="#products" className="hero-btn">
          DESCUBRE MÁS
        </a>
      </div>
    </section>
  );
}