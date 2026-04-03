import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '../i18n/translations';

export default function AboutUsPage() {
    const t = useT();

    const [selectedMember, setSelectedMember] = useState<any>(null);

    const team = [
        {
            id: 'ojaswini',
            name: 'Ojaswini',
            role: t.teamLead,
            imageUrl: '/team/ojaswini.jpg',
            email: 'ojaswiniii07@gmail.com',
            linkedin: 'https://linkedin.com/in/ojaswini-arora-85ab3b346',
        },
        {
            id: 'sanyam',
            name: 'Sanyam Aggarwal',
            role: t.teamMember,
            imageUrl: '/team/sanyam.jpg',
            email: 'sanyamaggarwal@outlook.in',
            linkedin: 'https://linkedin.com/in/sanyamaggarwal4',
        },
        {
            id: 'anany',
            name: 'Anany Pratyush',
            role: t.teamMember,
            imageUrl: '/team/anany.jpg',
            email: 'pratyushanany@gmail.com',
            linkedin: 'https://linkedin.com/in/anany-pratyush-61746737a',
        },
        {
            id: 'krisha',
            name: 'Krisha Malhotra',
            role: t.teamMember,
            imageUrl: '/team/krisha.jpg',
            email: 'krisha2247@gmail.com',
            linkedin: 'https://linkedin.com/in/krisha-malhotra-11680737b',
        },
    ];

    return (
        <div className="cv-animate-fadeIn" style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: '3rem' }}>
            {/* Header */}
            <div className="cv-page-header cv-text-center">
                <h1 style={{ fontSize: '2.5rem', marginBottom: '.5rem', color: 'var(--cv-primary)' }}>
                    ✨ {t.aboutUsTitle}
                </h1>
                <p style={{ fontSize: '1.1rem' }}>{t.aboutUsSubtitle}</p>
            </div>

            {/* Who We Are */}
            <div className="cv-card" style={{ padding: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>{t.whoWeAre}</h2>
                <h3 style={{ color: 'var(--cv-primary)', marginBottom: '1rem' }}>Team Infinite Loop</h3>
                <p className="cv-text-secondary" style={{ fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
                    {t.teamDesc}
                </p>
            </div>

            {/* Meet the Team */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>{t.meetTheTeam}</h2>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem'
                }}
            >
                {team.map((member) => (
                    <div
                        key={member.id}
                        className="cv-card cv-card-clickable cv-text-center"
                        style={{ padding: '2rem 1rem' }}
                        onClick={() => setSelectedMember(member)}
                    >
                        {/* Avatar Wrapper */}
                        <div
                            style={{
                                width: 120,
                                height: 120,
                                margin: '0 auto 1.25rem',
                                borderRadius: '50%',
                                background: 'var(--cv-surface-alt)',
                                border: '3px solid var(--cv-border)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}
                        >
                            {member.imageUrl ? (
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <span style={{ fontSize: '3rem', color: 'var(--cv-text-muted)' }}>👤</span>
                            )}

                            {/* "Add Photo" overlay hint (only shows if no image is present) */}
                            {!member.imageUrl && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 0,
                                        right: 0,
                                        fontSize: '0.65rem',
                                        color: 'var(--cv-text-muted)',
                                        fontWeight: 600
                                    }}
                                >
                                    Add Photo
                                </div>
                            )}
                        </div>
                        <h4 style={{ marginBottom: '.25rem', fontSize: '1.1rem' }}>{member.name}</h4>
                        <p className="cv-text-sm cv-text-secondary cv-font-medium">{member.role}</p>
                    </div>
                ))}
            </div>

            {/* Profile Modal */}
            {selectedMember && createPortal(
                <div className="cv-overlay" onClick={() => setSelectedMember(null)}>
                    <div className="cv-modal cv-text-center" style={{ maxWidth: 400, padding: '2.5rem 1.5rem' }} onClick={(e) => e.stopPropagation()}>
                        <div
                            style={{
                                width: 150,
                                height: 150,
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                background: 'var(--cv-surface-alt)',
                                border: '4px solid var(--cv-primary)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {selectedMember.imageUrl ? (
                                <img
                                    src={selectedMember.imageUrl}
                                    alt={selectedMember.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <span style={{ fontSize: '4rem', color: 'var(--cv-text-muted)' }}>👤</span>
                            )}
                        </div>

                        <h2 style={{ marginBottom: '.25rem' }}>{selectedMember.name}</h2>
                        <p className="cv-text-sm cv-font-semibold" style={{ color: 'var(--cv-primary)', marginBottom: '1.5rem' }}>
                            {selectedMember.role}
                        </p>

                        <div className="cv-flex-col cv-gap-sm cv-items-center" style={{ marginBottom: '2rem' }}>
                            <a
                                href={`mailto:${selectedMember.email}`}
                                className="cv-flex cv-items-center cv-gap-sm cv-text-secondary"
                                style={{ fontSize: '.95rem', fontWeight: 500 }}
                            >
                                <span>📧</span> {selectedMember.email}
                            </a>
                            <a
                                href={selectedMember.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="cv-flex cv-items-center cv-gap-sm cv-text-secondary"
                                style={{ fontSize: '.95rem', fontWeight: 500 }}
                            >
                                <span style={{ color: '#0A66C2' }}>💼</span> LinkedIn Profile
                            </a>
                        </div>

                        <button className="cv-btn cv-btn-secondary" style={{ width: '100%' }} onClick={() => setSelectedMember(null)}>
                            {t.close}
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
