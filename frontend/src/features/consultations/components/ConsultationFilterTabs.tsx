import React from 'react';
import type { ConsultationFilterOption } from '../types';
import './ConsultationFilterTabs.css';

export interface ConsultationFilterTabsProps {
  activeFilter: ConsultationFilterOption;
  onFilterChange: (filter: ConsultationFilterOption) => void;
  counts: {
    All: number;
    Pending: number;
    Accepted: number;
    Rejected: number;
  };
}

const TABS: ConsultationFilterOption[] = ['All', 'Pending', 'Accepted', 'Rejected'];

export const ConsultationFilterTabs: React.FC<ConsultationFilterTabsProps> = React.memo(({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <div className="consult-filter-tabs" role="tablist">
      {TABS.map((tab) => {
        const isActive = activeFilter === tab;
        const count = counts[tab];

        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            className={`consult-filter-tab ${isActive ? 'consult-filter-tab--active' : ''} consult-filter-tab--${tab.toLowerCase()}`}
            onClick={() => onFilterChange(tab)}
          >
            <span className="consult-filter-tab__label">{tab}</span>
            <span className="consult-filter-tab__badge">{count}</span>
          </button>
        );
      })}
    </div>
  );
});

ConsultationFilterTabs.displayName = 'ConsultationFilterTabs';
