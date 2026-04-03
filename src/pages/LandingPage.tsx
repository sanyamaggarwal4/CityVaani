import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function LandingPage() {
    const { currentUser } = useAppContext();

    return (
        <div className="cv-animate-fadeIn" style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Hero section */}
            <section style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '.5rem' }}>🏙️</div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '.5rem', letterSpacing: '-.03em' }}>
                    CityVaani
                </h1>
                <p
                    style={{
                        fontSize: '1.15rem',
                        color: 'var(--cv-text-secondary)',
                        maxWidth: 520,
                        margin: '0 auto .5rem',
                        lineHeight: 1.6,
                    }}
                >
                    Your Voice, Your City, Your Change
                </p>
                <p
                    style={{
                        fontSize: '.95rem',
                        color: 'var(--cv-text-muted)',
                        maxWidth: 560,
                        margin: '0 auto 2rem',
                    }}
                >
                    A civic issue reporting platform that bridges the gap between citizens and
                    local governance. Report problems, track progress, and empower your community.
                </p>

                {currentUser ? (
                    <Link
                        to={currentUser.role === 'authority' ? '/authority' : '/dashboard'}
                        className="cv-btn cv-btn-primary cv-btn-lg"
                    >
                        Go to Dashboard →
                    </Link>
                ) : (
                    <div className="cv-flex cv-items-center cv-gap" style={{ justifyContent: 'center' }}>
                        <Link to="/login" className="cv-btn cv-btn-primary cv-btn-lg">
                            Get Started
                        </Link>
                        <Link to="/login?guest=true" className="cv-btn cv-btn-secondary cv-btn-lg">
                            Try as Guest
                        </Link>
                    </div>
                )}
            </section>

            {/* Features grid */}
            <section style={{ padding: '2rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.35rem' }}>
                    How CityVaani Works
                </h2>
                <div className="cv-grid cv-grid-3">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="cv-card cv-animate-fadeIn"
                            style={{ textAlign: 'center', animationDelay: `${i * 80}ms` }}
                        >
                            <div style={{ fontSize: '2.25rem', marginBottom: '.75rem' }}>{f.icon}</div>
                            <h4 style={{ marginBottom: '.35rem' }}>{f.title}</h4>
                            <p className="cv-text-sm cv-text-secondary">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories preview */}
            <section style={{ padding: '2rem 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '1.35rem' }}>
                    Issue Categories We Cover
                </h2>
                <div
                    className="cv-flex cv-gap-sm"
                    style={{ flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {CATEGORY_PREVIEW.map((c) => (
                        <span
                            key={c.label}
                            className="cv-chip"
                            style={{ background: `${c.color}14`, color: c.color, fontSize: '.82rem' }}
                        >
                            {c.icon} {c.label}
                        </span>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section
                style={{
                    padding: '2rem 0 3rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem',
                    textAlign: 'center',
                }}
            >
                {STATS.map((s, i) => (
                    <div key={i} className="cv-animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cv-primary)' }}>
                            {s.value}
                        </div>
                        <div className="cv-text-sm cv-text-muted">{s.label}</div>
                    </div>
                ))}
            </section>
        </div>
    );
}

const FEATURES = [
    {
        icon: '📝',
        title: 'Report Problems',
        desc: 'Easily report civic issues in your area with photos, location, and category tags.',
    },
    {
        icon: '🗺️',
        title: 'Map-Based Tracking',
        desc: 'See all reported issues on an interactive map to understand issue density.',
    },
    {
        icon: '📊',
        title: 'Track Progress',
        desc: 'Follow the status of issues from Reported to Resolved with transparent updates.',
    },
    {
        icon: '🏛️',
        title: 'Authority Dashboard',
        desc: 'Ward and municipal officers can manage, prioritize, and resolve issues.',
    },
    {
        icon: '🌐',
        title: 'Multilingual',
        desc: 'Available in English and Hindi to ensure accessibility for all citizens.',
    },
    {
        icon: '📈',
        title: 'Area Intelligence',
        desc: 'View area ratings, category-wise breakdown, and civic health insights.',
    },
];

const CATEGORY_PREVIEW = [
    { icon: '🗑️', label: 'Sanitation & Waste', color: '#D97706' },
    { icon: '💧', label: 'Water & Drainage', color: '#2563EB' },
    { icon: '🛣️', label: 'Roads & Infrastructure', color: '#6B7280' },
    { icon: '💡', label: 'Streetlights', color: '#F59E0B' },
    { icon: '🌳', label: 'Environment', color: '#059669' },
    { icon: '🐕', label: 'Animal–Human Conflict', color: '#DC2626' },
    { icon: '🛡️', label: 'Citizen Safety', color: '#7C3AED' },
    { icon: '🏥', label: 'Public Health', color: '#EC4899' },
    { icon: '🚧', label: 'Encroachment', color: '#92400E' },
    { icon: '📢', label: 'Noise / Nuisance', color: '#EF4444' },
    { icon: '🏚️', label: 'Property Damage', color: '#4B5563' },
];

const STATS = [
    { value: '120+', label: 'Issues Reported' },
    { value: '85%', label: 'Resolution Rate' },
    { value: '12', label: 'Categories' },
    { value: '5', label: 'Wards Covered' },
];
