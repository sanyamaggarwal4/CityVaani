import type { Issue } from '../../types';
import CategoryChip from '../ui/CategoryChip';
import SeverityBadge from '../ui/SeverityBadge';
import StatusProgressBar from '../ui/StatusProgressBar';
import { CATEGORIES } from '../../mockData';

interface Props {
    issue: Issue;
    onUpvote?: (id: string) => void;
    onClick?: (issue: Issue) => void;
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

export default function ProblemCard({ issue, onUpvote, onClick }: Props) {
    const catInfo = CATEGORIES.find((c) => c.id === issue.category);
    const borderColor = catInfo?.color ?? '#6B7280';

    return (
        <div
            className="cv-problem-card cv-animate-fadeIn"
            style={{ ['--_accent' as string]: borderColor }}
            onClick={() => onClick?.(issue)}
        >
            {/* Color accent bar */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: borderColor,
                    borderRadius: '16px 0 0 16px',
                }}
            />

            {/* Header */}
            <div className="cv-problem-card-header">
                <h4 className="cv-problem-card-title">{issue.title}</h4>
                <SeverityBadge severity={issue.severity} />
            </div>

            {/* Meta chips */}
            <div className="cv-problem-card-meta">
                <CategoryChip category={issue.category} />
                <span className="cv-text-xs cv-text-muted">📍 {issue.location.area}</span>
            </div>

            {/* Description */}
            <p className="cv-problem-card-desc">{issue.description}</p>

            {/* Status progress */}
            <div style={{ marginBottom: '.75rem' }}>
                <StatusProgressBar status={issue.status} />
            </div>

            {/* Footer */}
            <div className="cv-problem-card-footer">
                <span>{timeAgo(issue.createdAt)}</span>

                <button
                    className="cv-problem-card-upvote"
                    onClick={(e) => {
                        e.stopPropagation();
                        onUpvote?.(issue.id);
                    }}
                >
                    👍 {issue.upvotes} same issue
                </button>
            </div>
        </div>
    );
}
