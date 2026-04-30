import React from 'react';

export default function CircularButton({ href = '#', target = '_blank' }) {
  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinRev { to { transform: rotate(-360deg); } }
        @keyframes breathe {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes playPulse {
          0%,100% { opacity: 1; transform: scale(1) translateX(2px); }
          50% { opacity: 0.7; transform: scale(0.9) translateX(2px); }
        }
        @keyframes glowPop {
          0%,100% { filter: drop-shadow(0 0 6px rgba(255,255,255,0.15)); }
          50% { filter: drop-shadow(0 0 22px rgba(255,255,255,0.45)); }
        }

        .cb-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          cursor: pointer;
          animation: breathe 4s ease-in-out infinite;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cb-wrap:hover {
          animation: none;
          transform: scale(1.08);
        }
        .cb-wrap:hover .cb-badge { animation: glowPop 1.5s ease-in-out infinite; }
        .cb-wrap:hover .cb-text { animation-duration: 8s; }

        .cb-badge {
          position: absolute;
          inset: 0;
          animation: glowPop 3s ease-in-out infinite;
        }

        .cb-text {
          position: absolute;
          inset: 0;
          animation: spin 18s linear infinite;
        }

        .cb-dots {
          position: absolute;
          inset: 0;
          animation: spinRev 30s linear infinite;
        }

        .cb-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.15), 0 8px 24px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
        }
        .cb-wrap:hover .cb-center {
          transform: translate(-50%, -50%) scale(1.12);
          box-shadow: 0 0 0 6px rgba(255,255,255,0.2), 0 12px 30px rgba(0,0,0,0.6);
        }

        .cb-play {
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 9px solid #111;
          margin-left: 1px;
          animation: playPulse 2s ease-in-out infinite;
        }
      `}</style>

      <a href={href} target={target} rel="noreferrer" style={{ textDecoration: 'none' }}>
        <div className="cb-wrap">
          {/* Badge scalloped noir */}
          <div className="cb-badge">
            <svg width="140" height="140" viewBox="0 0 260 260">
              <defs>
                <radialGradient id="cbBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
              </defs>
              <path
                d="
                  M130,10
                  C140,10 148,18 152,25 C156,32 162,35 170,33
                  C178,31 186,35 188,43 C190,51 196,56 204,56
                  C212,56 218,63 218,71 C218,79 223,85 230,88
                  C237,91 240,99 238,107 C236,115 239,122 245,127
                  C251,132 251,142 245,147 C239,152 236,159 238,167
                  C240,175 237,183 230,186 C223,189 218,195 218,203
                  C218,211 212,218 204,218 C196,218 190,223 188,231
                  C186,239 178,243 170,241 C162,239 156,242 152,249
                  C148,256 140,260 130,260 C120,260 112,256 108,249
                  C104,242 98,239 90,241 C82,243 74,239 72,231
                  C70,223 64,218 56,218 C48,218 42,211 42,203
                  C42,195 37,189 30,186 C23,183 20,175 22,167
                  C24,159 21,152 15,147 C9,142 9,132 15,127
                  C21,122 24,115 22,107 C20,99 23,91 30,88
                  C37,85 42,79 42,71 C42,63 48,56 56,56
                  C64,56 70,51 72,43 C74,35 82,31 90,33
                  C98,35 104,32 108,25 C112,18 120,10 130,10Z
                "
                fill="url(#cbBg)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <circle cx="130" cy="130" r="53" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Texte qui tourne */}
          <div className="cb-text">
            <svg width="140" height="140" viewBox="0 0 260 260">
              <defs>
                <path id="cbTp" d="M130,130 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text fontSize="6" fontWeight="700" letterSpacing="2" fill="rgba(255,255,255,0.92)" fontFamily="'Helvetica Neue', Arial, sans-serif">
                <textPath href="#cbTp" startOffset="0%">
                  VISIT • LIVE VISIT • LIVE • LINK • VISIT • LIVE VISIT • LIVE • LINK •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Texte décoratif en cercle */}
          <div className="cb-dots">
            <svg width="140" height="140" viewBox="0 0 260 260">
              <defs>
                <path id="cbDots" d="M130,130 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
              </defs>
              <text fontSize="5" fontWeight="700" letterSpacing="2" fill="rgba(255,255,255,0.35)" fontFamily="'Helvetica Neue', Arial, sans-serif">
                <textPath href="#cbDots" startOffset="0%">
                  • LIVE • VISIT • LINK • LIVE • VISIT • LINK • LIVE • VISIT •
                </textPath>
              </text>
            </svg>
          </div>

          {/* Bouton play central */}
          <div className="cb-center">
            <div className="cb-play"></div>
          </div>
        </div>
      </a>
    </>
  );
}
