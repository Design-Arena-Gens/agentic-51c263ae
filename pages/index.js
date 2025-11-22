import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const canvasRef = useRef(null);
  const [showWave, setShowWave] = useState(true);
  const [showParticle, setShowParticle] = useState(true);
  const [speed, setSpeed] = useState(2);
  const [wavelength, setWavelength] = useState(80);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    let phase = 0;
    const particles = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (i / numParticles) * canvas.width,
        baseY: canvas.height / 2,
        phase: (i / numParticles) * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      phase += speed * 0.02;

      if (showWave) {
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 +
                   Math.sin((x / wavelength) * Math.PI * 2 + phase) * 60;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      if (showParticle) {
        particles.forEach((particle) => {
          particle.x += speed;
          if (particle.x > canvas.width) {
            particle.x = 0;
          }

          const y = particle.baseY +
                   Math.sin((particle.x / wavelength) * Math.PI * 2 + phase) * 60;

          ctx.fillStyle = '#ff00ff';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#ff00ff';
          ctx.beginPath();
          ctx.arc(particle.x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showWave, showParticle, speed, wavelength]);

  return (
    <>
      <Head>
        <title>ازدواجية الموجة والجسيم - Wave-Particle Duality</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚛️</text></svg>" />
      </Head>

      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>ازدواجية الموجة والجسيم</h1>
          <h2 style={styles.subtitle}>Wave-Particle Duality</h2>
        </header>

        <div style={styles.content}>
          <div style={styles.canvasContainer}>
            <canvas ref={canvasRef} style={styles.canvas} />
          </div>

          <div style={styles.controls}>
            <div style={styles.controlGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showWave}
                  onChange={(e) => setShowWave(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>عرض الموجة (Show Wave)</span>
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showParticle}
                  onChange={(e) => setShowParticle(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>عرض الجسيمات (Show Particles)</span>
              </label>
            </div>

            <div style={styles.sliderGroup}>
              <label style={styles.sliderLabel}>
                <span>السرعة (Speed): {speed}</span>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  style={styles.slider}
                />
              </label>

              <label style={styles.sliderLabel}>
                <span>الطول الموجي (Wavelength): {wavelength}</span>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="10"
                  value={wavelength}
                  onChange={(e) => setWavelength(parseInt(e.target.value))}
                  style={styles.slider}
                />
              </label>
            </div>
          </div>

          <div style={styles.info}>
            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}>🌊 خصائص الموجة</h3>
              <ul style={styles.infoList}>
                <li>التردد (Frequency)</li>
                <li>الطول الموجي (Wavelength)</li>
                <li>التداخل (Interference)</li>
                <li>الحيود (Diffraction)</li>
              </ul>
            </div>

            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}>⚛️ خصائص الجسيم</h3>
              <ul style={styles.infoList}>
                <li>الكتلة (Mass)</li>
                <li>الشحنة (Charge)</li>
                <li>الموضع (Position)</li>
                <li>الزخم (Momentum)</li>
              </ul>
            </div>
          </div>

          <div style={styles.description}>
            <p style={styles.descriptionText}>
              <strong>ازدواجية الموجة والجسيم:</strong> تمتلك الجسيمات المادية، مثل الإلكترونات،
              خصائص جسيمات (كالكتلة والشحنة) وخصائص موجات (كالتردد والطول الموجي) في نفس الوقت.
            </p>
            <p style={styles.descriptionText}>
              هذه الظاهرة الكمية تُظهر أن الجسيمات دون الذرية تتصرف كموجات وجسيمات معًا،
              وهي واحدة من أهم مبادئ ميكانيكا الكم.
            </p>
          </div>
        </div>

        <footer style={styles.footer}>
          <p>تفاعلي - تصور فيزياء الكم | Interactive Quantum Physics Visualization</p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: 0,
    color: '#888',
    fontWeight: 'normal',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  canvasContainer: {
    background: 'rgba(10, 10, 30, 0.8)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '30px',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)',
    display: 'flex',
    justifyContent: 'center',
  },
  canvas: {
    maxWidth: '100%',
    borderRadius: '10px',
    display: 'block',
  },
  controls: {
    background: 'rgba(26, 26, 62, 0.8)',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '30px',
    border: '2px solid rgba(255, 0, 255, 0.3)',
  },
  controlGroup: {
    display: 'flex',
    gap: '30px',
    marginBottom: '25px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  sliderGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sliderLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '1rem',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    outline: 'none',
    cursor: 'pointer',
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  infoBox: {
    background: 'rgba(26, 26, 62, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid rgba(0, 255, 255, 0.2)',
  },
  infoTitle: {
    fontSize: '1.3rem',
    marginTop: 0,
    marginBottom: '15px',
    color: '#00ffff',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  description: {
    background: 'rgba(26, 26, 62, 0.6)',
    borderRadius: '15px',
    padding: '25px',
    border: '2px solid rgba(255, 0, 255, 0.2)',
    lineHeight: '1.8',
  },
  descriptionText: {
    fontSize: '1.05rem',
    margin: '0 0 15px 0',
    textAlign: 'right',
    direction: 'rtl',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    color: '#888',
    fontSize: '0.9rem',
  },
};
