import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useT } from '../i18n/translations';
import { CATEGORIES } from '../mockData';
import StatCard from '../components/ui/StatCard';
import ProblemCard from '../components/issue/ProblemCard';

export default function CitizenDashboard() {
    const { issues, currentUser, upvoteIssue } = useAppContext();
    const t = useT();

    /* ── Computed stats ───────────────────────────────────── */
    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const recentIssues = issues.filter((i) => new Date(i.createdAt).getTime() > oneWeekAgo);
    const resolvedCount = issues.filter((i) => i.status === 'resolved' || i.status === 'closed').length;
    const unresolvedCount = issues.filter(
        (i) => i.status !== 'resolved' && i.status !== 'closed' && i.status !== 'rejected',
    ).length;
    const criticalCount = issues.filter(
        (i) => i.severity === 'critical' && i.status !== 'resolved' && i.status !== 'closed',
    ).length;
    const resolutionRate = issues.length > 0 ? Math.round((resolvedCount / issues.length) * 100) : 0;

    /* Top categories by issue count */
    const categoryCounts = issues.reduce<Record<string, number>>((acc, issue) => {
        acc[issue.category] = (acc[issue.category] || 0) + 1;
        return acc;
    }, {});
    const topCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    /* latest 5 issues */
    const latestIssues = [...issues].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ).slice(0, 5);

    return (
        <div className="cv-animate-fadeIn">
            <div className="cv-page-header">
                <h1>👋 {t.welcomeBack2}{currentUser ? `, ${currentUser.name}` : ''}!</h1>
                <p>{t.dashboardSubtitle}</p>
            </div>

            {/* ── Stat cards ──────────────────────────────────── */}
            <div className="cv-grid cv-grid-4" style={{ marginBottom: '2rem' }}>
                <StatCard icon="📋" value={issues.length} label={t.totalIssues} color="var(--cv-primary)" />
                <StatCard icon="🕐" value={recentIssues.length} label={t.thisWeek} color="var(--cv-warning)" />
                <StatCard icon="✅" value={`${resolutionRate}%`} label={t.resolutionRate} color="var(--cv-accent)" />
                <StatCard icon="🚨" value={criticalCount} label={t.criticalOpen} color="var(--cv-danger)" />
            </div>

            {/* ── Two-column layout ───────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                {/* Left: Recent issues */}
                <div>
                    <div className="cv-flex cv-items-center cv-justify-between" style={{ marginBottom: '1rem' }}>
                        <h3>{t.recentIssues}</h3>
                        <Link to="/issues" className="cv-btn cv-btn-ghost cv-btn-sm">
                            {t.viewAll}
                        </Link>
                    </div>
                    <div className="cv-flex-col cv-gap">
                        {latestIssues.map((issue) => (
                            <ProblemCard
                                key={issue.id}
                                issue={issue}
                                onUpvote={upvoteIssue}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Sidebar widgets */}
                <div className="cv-flex-col cv-gap">
                    {/* Area Summary */}
                    <div className="cv-card">
                        <h4 style={{ marginBottom: '.75rem' }}>📍 {t.areaSummary}</h4>
                        <div className="cv-flex cv-justify-between cv-items-center cv-text-sm" style={{ marginBottom: '.5rem' }}>
                            <span className="cv-text-secondary">{t.openIssues}</span>
                            <span className="cv-font-semibold">{unresolvedCount}</span>
                        </div>
                        <div className="cv-flex cv-justify-between cv-items-center cv-text-sm" style={{ marginBottom: '.5rem' }}>
                            <span className="cv-text-secondary">{t.resolved}</span>
                            <span className="cv-font-semibold" style={{ color: 'var(--cv-accent)' }}>{resolvedCount}</span>
                        </div>
                        <div className="cv-flex cv-justify-between cv-items-center cv-text-sm">
                            <span className="cv-text-secondary">{t.thisWeek}</span>
                            <span className="cv-font-semibold" style={{ color: 'var(--cv-warning)' }}>{recentIssues.length}</span>
                        </div>
                        {/* Mini progress */}
                        <div style={{ marginTop: '.75rem' }}>
                            <div className="cv-text-xs cv-text-muted" style={{ marginBottom: 4 }}>
                                {t.resolutionProgress}
                            </div>
                            <div className="cv-progress">
                                <div
                                    className="cv-progress-fill"
                                    style={{ width: `${resolutionRate}%`, background: 'var(--cv-accent)' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="cv-card">
                        <h4 style={{ marginBottom: '.75rem' }}>📊 {t.topCategories}</h4>
                        <div className="cv-flex-col cv-gap-sm">
                            {topCategories.map(([catId, count]) => {
                                const info = CATEGORIES.find((c) => c.id === catId);
                                return (
                                    <div
                                        key={catId}
                                        className="cv-flex cv-items-center cv-justify-between"
                                        style={{ fontSize: '.85rem' }}
                                    >
                                        <span>
                                            {info?.icon} {info?.label}
                                        </span>
                                        <span
                                            className="cv-badge"
                                            style={{ background: `${info?.color}18`, color: info?.color }}
                                        >
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="cv-card" style={{ textAlign: 'center' }}>
                        <h4 style={{ marginBottom: '.75rem' }}>{t.quickActions}</h4>
                        <div className="cv-flex-col cv-gap-sm">
                            <Link to="/report" className="cv-btn cv-btn-primary" style={{ width: '100%' }}>
                                📝 {t.reportProblem}
                            </Link>
                            <Link to="/map" className="cv-btn cv-btn-secondary" style={{ width: '100%' }}>
                                🗺️ {t.mapView}
                            </Link>
                            <Link to="/area-insights" className="cv-btn cv-btn-secondary" style={{ width: '100%' }}>
                                📈 {t.areaInsights}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
