import React, { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Inbox,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Users,
  Check,
} from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { useConsultationRequests } from '../hooks/useConsultationRequests';
import { ConsultationRequestCard } from '../components/ConsultationRequestCard';
import { ConsultationFilterTabs } from '../components/ConsultationFilterTabs';
import { ConsultationDetailModal } from '../components/ConsultationDetailModal';
import { RejectReasonModal } from '../components/RejectReasonModal';
import type { ConsultationRequest, ConsultationFilterOption } from '../types';
import type { DoctorOutletContext } from '@/shared/layout';
import { ROUTES } from '@/shared/config/routes';
import './DoctorConsultationRequestsPage.css';

export const DoctorConsultationRequestsPage: React.FC = () => {
  const context = useOutletContext<DoctorOutletContext>();
  const globalSearchQuery = context?.searchQuery ?? '';

  const {
    requests,
    loading,
    pendingCount,
    acceptedCount,
    rejectedCount,
    acceptRequest,
    rejectRequest,
  } = useConsultationRequests();

  const [activeFilter, setActiveFilter] = useState<ConsultationFilterOption>('Pending');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedService, setSelectedService] = useState('All');

  // Modals state
  const [detailRequest, setDetailRequest] = useState<ConsultationRequest | null>(null);
  const [rejectingRequest, setRejectingRequest] = useState<ConsultationRequest | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAccept = async (req: ConsultationRequest) => {
    try {
      setIsProcessing(true);
      await acceptRequest(req.id);
      if (detailRequest?.id === req.id) {
        setDetailRequest(null);
      }
      showToast(`Request accepted! ${req.patientName} has been enrolled into your patient directory.`);
    } catch {
      // Handled
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenReject = (req: ConsultationRequest) => {
    setRejectingRequest(req);
  };

  const handleConfirmReject = async (req: ConsultationRequest, reason: string) => {
    try {
      setIsProcessing(true);
      await rejectRequest(req.id, reason);
      setRejectingRequest(null);
      if (detailRequest?.id === req.id) {
        setDetailRequest(null);
      }
      showToast(`Request for ${req.patientName} was declined.`);
    } catch {
      // Handled
    } finally {
      setIsProcessing(false);
    }
  };

  const servicesList = useMemo(() => {
    const set = new Set<string>();
    requests.forEach((r) => set.add(r.service));
    return ['All', ...Array.from(set)];
  }, [requests]);

  const effectiveSearch = localSearch.trim() || globalSearchQuery.trim();

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // Status filter
      if (activeFilter === 'Pending' && r.status !== 'pending') return false;
      if (activeFilter === 'Accepted' && r.status !== 'accepted') return false;
      if (activeFilter === 'Rejected' && r.status !== 'rejected') return false;

      // Service filter
      if (selectedService !== 'All' && r.service !== selectedService) return false;

      // Search filter
      if (effectiveSearch) {
        const query = effectiveSearch.toLowerCase();
        const matchesName = r.patientName.toLowerCase().includes(query);
        const matchesPhone = r.phone.toLowerCase().includes(query);
        const matchesConcern = r.primaryConcern.toLowerCase().includes(query);
        const matchesService = r.service.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesConcern || matchesService;
      }

      return true;
    });
  }, [requests, activeFilter, selectedService, effectiveSearch]);

  const counts = {
    All: requests.length,
    Pending: pendingCount,
    Accepted: acceptedCount,
    Rejected: rejectedCount,
  };

  return (
    <div className="doctor-page-content doctor-consult-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="doctor-consult-toast" role="alert">
          <Check size={18} className="doctor-consult-toast__icon" />
          <span className="doctor-consult-toast__text">{toastMessage}</span>
          <Link to={ROUTES.DOCTOR_PATIENTS} className="doctor-consult-toast__link">
            View Patients <Users size={14} />
          </Link>
        </div>
      )}

      {/* Page Heading */}
      <div className="doctor-page-heading">
        <div className="doctor-consult-heading-row">
          <div>
            <h1 className="doctor-page-title">Consultation Requests</h1>
            <p className="doctor-page-sub">
              Review incoming patient bookings, assess clinical concerns, and accept or decline
            </p>
          </div>

          <Link to={ROUTES.DOCTOR_PATIENTS} className="doctor-consult-patients-btn">
            <Users size={16} />
            <span>View Registered Patients</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Banner */}
      <div className="doctor-consult-stats-grid">
        <div className="doctor-consult-stat-card">
          <div className="doctor-consult-stat-card__icon doctor-consult-stat-card__icon--total">
            <Inbox size={22} />
          </div>
          <div className="doctor-consult-stat-card__info">
            <span className="doctor-consult-stat-card__label">Total Inbound</span>
            <strong className="doctor-consult-stat-card__value">{requests.length}</strong>
          </div>
        </div>

        <div className="doctor-consult-stat-card doctor-consult-stat-card--highlight">
          <div className="doctor-consult-stat-card__icon doctor-consult-stat-card__icon--pending">
            <Clock size={22} />
          </div>
          <div className="doctor-consult-stat-card__info">
            <span className="doctor-consult-stat-card__label">Pending Review</span>
            <strong className="doctor-consult-stat-card__value text-amber">{pendingCount}</strong>
          </div>
        </div>

        <div className="doctor-consult-stat-card">
          <div className="doctor-consult-stat-card__icon doctor-consult-stat-card__icon--accepted">
            <CheckCircle2 size={22} />
          </div>
          <div className="doctor-consult-stat-card__info">
            <span className="doctor-consult-stat-card__label">Accepted & Enrolled</span>
            <strong className="doctor-consult-stat-card__value text-green">{acceptedCount}</strong>
          </div>
        </div>

        <div className="doctor-consult-stat-card">
          <div className="doctor-consult-stat-card__icon doctor-consult-stat-card__icon--rejected">
            <XCircle size={22} />
          </div>
          <div className="doctor-consult-stat-card__info">
            <span className="doctor-consult-stat-card__label">Declined</span>
            <strong className="doctor-consult-stat-card__value">{rejectedCount}</strong>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <Card className="doctor-consult-card">
        {/* Toolbar */}
        <div className="doctor-consult-toolbar">
          <ConsultationFilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />

          <div className="doctor-consult-filters-group">
            {/* Service selector */}
            <div className="doctor-consult-service-select-wrap">
              <Filter size={15} className="doctor-consult-filter-icon" />
              <select
                className="doctor-consult-service-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                aria-label="Filter by service"
              >
                {servicesList.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv === 'All' ? 'All Therapies' : srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick search input */}
            <div className="doctor-consult-search-wrap">
              <Search size={15} className="doctor-consult-search-icon" />
              <input
                type="text"
                className="doctor-consult-search-input"
                placeholder="Search patient, phone, symptoms..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="doctor-consult-list">
          {loading ? (
            <div className="doctor-consult-loading">Loading consultation requests...</div>
          ) : filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <ConsultationRequestCard
                key={request.id}
                request={request}
                index={index}
                onAccept={handleAccept}
                onReject={handleOpenReject}
                onViewDetails={(req) => setDetailRequest(req)}
                isProcessing={isProcessing}
              />
            ))
          ) : (
            <div className="doctor-consult-empty">
              <Inbox size={42} className="doctor-consult-empty__icon" />
              <h3 className="doctor-consult-empty__title">No consultation requests found</h3>
              <p className="doctor-consult-empty__desc">
                {effectiveSearch || selectedService !== 'All'
                  ? 'Try clearing your search or service filters.'
                  : `There are currently no requests in the "${activeFilter}" tab.`}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* View Details Modal */}
      <ConsultationDetailModal
        request={detailRequest}
        isOpen={Boolean(detailRequest)}
        onClose={() => setDetailRequest(null)}
        onAccept={handleAccept}
        onReject={handleOpenReject}
        isProcessing={isProcessing}
      />

      {/* Reject Confirmation Modal */}
      <RejectReasonModal
        request={rejectingRequest}
        isOpen={Boolean(rejectingRequest)}
        onClose={() => setRejectingRequest(null)}
        onConfirmReject={handleConfirmReject}
        isProcessing={isProcessing}
      />
    </div>
  );
};
