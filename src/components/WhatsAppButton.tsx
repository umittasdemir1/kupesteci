import React from 'react';
import { useReadContent } from '../hooks/useContent';

const WhatsAppButton: React.FC = () => {
    const content = useReadContent();
    const wa = content.whatsapp;

    if (!wa) return null;

    const whatsappUrl = `https://wa.me/${wa.phone}?text=${encodeURIComponent(wa.message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-[90] h-12 w-12">
            {/* Main Button with Jumping Animation */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden ${wa.isJumping ? 'animate-[jump_5s_infinite]' : ''}`}
            >
                {/* Pulsing background effect */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:hidden" />

                {/* Light Beam / Shimmer Effect */}
                {wa.isShimmering && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite] skew-x-[-20deg]" />
                    </div>
                )}

                <img
                    src={wa.image || "/assets/whatsapp.png"}
                    alt="WhatsApp"
                    className="w-full h-full object-cover relative z-10 p-2.5"
                />

                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-150%) skewX(-20deg); }
                        100% { transform: translateX(150%) skewX(-20deg); }
                    }
                    @keyframes jump {
                        0%, 80%, 100% { transform: translateY(0); }
                        85% { transform: translateY(-15px); }
                        90% { transform: translateY(0); }
                        95% { transform: translateY(-7px); }
                    }
                `}</style>
            </a>
        </div>
    );
};

export default WhatsAppButton;
