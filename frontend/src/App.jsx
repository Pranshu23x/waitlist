import React, { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingText, setLoadingText] = useState('');

  const GOOGLE_FORM_ID = '1FAIpQLSffr3eaxDH5u0wuzDmQT_2lS7H_r6ctxsY3QKmbDc-mrlrrxw';
  const GOOGLE_FORM_FIELD_ID = '1924648042';
  const BACKEND_API_URL = '/api/waitlist';

  React.useEffect(() => {
    if (status === 'loading') {
      const targetText = "SECURING_SLOT...";
      let currentChars = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < targetText.length) {
          currentChars += targetText[i];
          setLoadingText(currentChars + "_");
          i++;
        } else {
          setLoadingText(targetText + (Math.floor(Date.now() / 400) % 2 === 0 ? "_" : " "));
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      try {
        const backendResponse = await fetch(BACKEND_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!backendResponse.ok) console.warn('Backend returned non-200 status');
      } catch (backendError) {
        console.warn('Local backend is offline. Skipping local DB save.');
      }

      const googleFormUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
      const formData = new URLSearchParams();
      formData.append(`entry.${GOOGLE_FORM_FIELD_ID}`, email);

      await fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center bg-grain overflow-hidden selection:bg-black/10 bg-center bg-cover bg-no-repeat transition-all duration-1000`} style={{
      backgroundImage: 'url("/bg.png")',
      backgroundAttachment: 'fixed'
    }}>

      {/* Top Banner (Translucent, moves left -> right) */}
      <div className="fixed top-0 w-full overflow-hidden bg-white/40 backdrop-blur-md text-black/60 z-50 py-4 border-b border-black/10 pointer-events-none">
        <div className="whitespace-nowrap flex w-[200%] animate-marquee-reverse items-center text-xs md:text-sm tracking-[0.2em] font-medium">
          <span className="flex-1 flex justify-around items-center px-4">
            <span>412/500 ALPHA SLOTS REMAINING • 1 MONTH PREMIUM FOR EARLY ADOPTERS • SYSTEM CALIBRATING FOR Q3 RELEASE • JOIN NOW TO SECURE $0 ACCESS</span>
            <span className="text-black/40 mx-4">✦</span>
            <span>412/500 ALPHA SLOTS REMAINING • 1 MONTH PREMIUM FOR EARLY ADOPTERS • SYSTEM CALIBRATING FOR Q3 RELEASE • JOIN NOW TO SECURE $0 ACCESS</span>
            <span className="text-black/40 mx-4">✦</span>
          </span>
          <span className="flex-1 flex justify-around items-center px-4">
            <span>412/500 ALPHA SLOTS REMAINING • 1 MONTH PREMIUM FOR EARLY ADOPTERS • SYSTEM CALIBRATING FOR Q3 RELEASE • JOIN NOW TO SECURE $0 ACCESS</span>
            <span className="text-black/40 mx-4">✦</span>
            <span>412/500 ALPHA SLOTS REMAINING • 1 MONTH PREMIUM FOR EARLY ADOPTERS • SYSTEM CALIBRATING FOR Q3 RELEASE • JOIN NOW TO SECURE $0 ACCESS</span>
            <span className="text-black/40 mx-4">✦</span>
          </span>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4 py-8 min-h-screen">

        {/* Hero Section */}
        <div className="flex flex-col items-center mb-12 w-full">
          <h1 className="animate-fade-up delay-1 font-source-serif italic font-medium text-[clamp(4rem,15vw,8rem)] text-black tracking-[-0.02em] leading-[0.9] mb-4 text-center drop-shadow-sm">
            Rewind
          </h1>
          <div className="flex flex-col items-center gap-4">
            <p className="animate-fade-up delay-2 text-[clamp(12px,2.5vw,18px)] tracking-[0.15em] md:tracking-[0.25em] uppercase text-black/80 font-bold font-serif-premium italic text-center px-4">
              World's first data layer which acts as an interview cheat sheet.
            </p>
            <p className="animate-fade-up delay-3 text-[15px] md:text-[18px] text-black/50 font-light tracking-wide text-center px-4 max-w-5xl">
              Get perfect real time answers to ace your next B2B call before the interviewer finishes the question.
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="animate-fade-up delay-4 w-full max-w-xl px-2 flex flex-col items-center relative">
          
          <div className={`w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${status === 'success' ? 'opacity-0 translate-y-12 blur-md scale-95 pointer-events-none absolute select-none' : 'opacity-100 translate-y-0 blur-0 scale-100 relative'}`}>
            {/* The tight container */}
            <form onSubmit={handleSubmit} className="group flex flex-col md:flex-row items-center gap-3 w-full bg-black/[0.03] backdrop-blur-xl border border-black/10 p-2 rounded-[2rem] md:rounded-full shadow-2xl transition-all duration-300 focus-within:border-black/30 focus-within:bg-black/[0.05] focus-within:shadow-[0_0_30px_rgba(0,0,0,0.03)] hover:border-black/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 bg-transparent text-black font-light px-6 py-4 md:py-3 focus:outline-none placeholder:text-black/40 text-[15px] md:text-[16px] w-full text-center md:text-left transition-colors"
                disabled={status === 'loading' || status === 'success'}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`clip-btn group/btn transition-all duration-700 active:scale-95 shrink-0 mx-auto md:mx-0 ${status === 'loading' ? 'opacity-80 pointer-events-none' : ''}`}
              >
                <p className="relative z-10 grid items-center justify-items-center w-full uppercase">
                  <span className={`col-start-1 row-start-1 flex items-center font-mono text-[10px] tracking-wider transition-all duration-500 ${status === 'loading' ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                    {loadingText}
                  </span>
                  <span className={`col-start-1 row-start-1 flex items-center gap-2 transition-all duration-500 ${status !== 'loading' ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                    JOIN <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </p>
              </button>
            </form>

            {/* Micro Trust Line */}
            <p className="mt-6 text-[12px] text-black/40 tracking-wider font-light text-center">
              Backed By People Working at Google, Microsoft & Uber
            </p>
          </div>

          {/* Success State */}
          <div className={`w-full transition-all duration-1000 delay-[150ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center bg-black/[0.03] backdrop-blur-xl border border-black/10 p-8 md:p-10 rounded-[2rem] ${status === 'success' ? 'opacity-100 translate-y-0 blur-0 scale-100 relative' : 'opacity-0 translate-y-12 blur-md scale-95 pointer-events-none absolute select-none'}`}>
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-6 bg-black/5">
              <CheckCircle className="w-6 h-6 text-black/60" strokeWidth={1.5} />
            </div>
            <h2 className="font-source-serif italic text-3xl md:text-4xl text-black mb-3 px-2">You're on the list</h2>
            <p className="text-[12px] md:text-[14px] text-black/50 tracking-wider mb-8 font-light text-center">
             Gear up for something real good coming your way 🔥!
            </p>
          
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-rose-500 animate-fade-up w-full justify-center">
              <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span className="text-[12px] font-medium tracking-wide">{errorMessage}</span>
            </div>
          )}

        </div>

      </main>

      {/* Bottom Banner (Translucent, moves right -> left) */}
      <div className="fixed bottom-0 w-full overflow-hidden bg-white/40 backdrop-blur-md text-black/60 z-50 py-4 border-t border-black/10 pointer-events-none">
        <div className="whitespace-nowrap flex w-[200%] animate-marquee items-center text-xs md:text-sm tracking-[0.2em] font-medium">
          <span className="flex-1 flex justify-around items-center">
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
          </span>
          <span className="flex-1 flex justify-around items-center">
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
            <span>Join now and claim your free tier on launch</span>
            <span className="text-black/40 mx-4 font-bold text-lg">·</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
