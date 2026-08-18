import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => !document.body.classList.contains('light-theme'));

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }, [isDark]);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 9999,
                background: 'var(--card-bg-glass-heavy)',
                border: '1px solid var(--card-border)',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                gap: '8px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px var(--card-shadow)',
                cursor: 'pointer'
            }}
            onClick={() => setIsDark(!isDark)}
        >
            <div style={{
                position: 'absolute',
                left: isDark ? 'calc(100% - 36px - 4px)' : '4px',
                width: '36px',
                height: '36px',
                background: 'var(--accent)',
                borderRadius: '50%',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 0
            }} />
            <span style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                zIndex: 1,
                color: !isDark ? '#fff' : 'var(--text-secondary)',
                transition: 'color 0.3s ease'
            }}>☀️</span>
            <span style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                zIndex: 1,
                color: isDark ? '#fff' : 'var(--text-secondary)',
                transition: 'color 0.3s ease'
            }}>🌙</span>
        </div>
    );
}
