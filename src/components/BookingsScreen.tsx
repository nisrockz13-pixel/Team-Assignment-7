import React, { useState } from 'react';
import { BookingRecord, ScreenType } from '../types';

interface BookingsScreenProps {
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  onCancelBooking,
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<'Upcoming' | 'Past'>('Upcoming');
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<BookingRecord | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');
  const pastBookings = bookings.filter((b) => b.status === 'Completed');
  const displayed = activeFilter === 'Upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="flex flex-col w-full px-4 md:px-6 pb-28 gap-5 pt-2">
      {/* Tab Filter */}
      <div className="flex bg-[#efe6e4] p-1 rounded-full max-w-xs mx-auto w-full">
        <button
          onClick={() => setActiveFilter('Upcoming')}
          className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'Upcoming' ? 'bg-black text-white shadow-xs' : 'text-[#47464a]'
          }`}
        >
          Upcoming ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveFilter('Past')}
          className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeFilter === 'Past' ? 'bg-black text-white shadow-xs' : 'text-[#47464a]'
          }`}
        >
          Past Visits ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      {displayed.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#efe6e4] p-6">
          <span className="material-symbols-outlined text-[36px] text-[#47464a]">
            calendar_today
          </span>
          <h3 className="font-serif text-lg text-[#1f1b19] mt-2 font-medium">No appointments</h3>
          <p className="text-xs text-[#47464a] mt-1">
            Browse our curated ateliers and book your next ritual.
          </p>
          <button
            onClick={() => onNavigate('explore')}
            className="mt-4 px-5 py-2.5 bg-black text-white font-label-caps text-xs uppercase tracking-wider rounded-full font-bold shadow-xs hover:bg-neutral-800"
          >
            Explore Treatments
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {displayed.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#efe6e4] flex flex-col gap-3.5 hover:shadow-md transition-all"
            >
              {/* Header Status & Code */}
              <div className="flex items-center justify-between border-b border-[#f5ece9] pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      booking.status === 'Confirmed'
                        ? 'bg-[#2E6B4F]'
                        : booking.status === 'Pending'
                        ? 'bg-[#B87A28]'
                        : 'bg-[#77767b]'
                    }`}
                  />
                  <span className="font-label-caps text-[10px] uppercase font-bold text-[#1f1b19]">
                    {booking.status}
                  </span>
                </div>
                <span className="font-label-caps text-[10px] text-[#7e5448] font-mono tracking-wider">
                  #{booking.id}
                </span>
              </div>

              {/* Service & Atelier */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#7e5448] font-bold">
                    {booking.atelier}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#1f1b19] mt-0.5">
                    {booking.serviceTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#47464a]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                      {booking.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-black">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {booking.time}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-serif text-lg font-bold text-black">
                    ${booking.totalPaid.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-[#47464a]">Paid in full</span>
                </div>
              </div>

              {/* Specialist */}
              <div className="bg-[#fbf2ef] p-2.5 rounded-xl flex items-center justify-between border border-[#efe6e4]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={booking.specialistAvatar}
                    alt={booking.specialistName}
                    className="w-8 h-8 rounded-full object-cover border border-white"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1f1b19]">
                      {booking.specialistName}
                    </span>
                    <span className="text-[10px] text-[#7e5448]">Dedicated Practitioner</span>
                  </div>
                </div>

                {booking.addOns && booking.addOns.length > 0 && (
                  <span className="font-label-caps text-[9px] bg-[#EBD9CC] text-[#7a5146] px-2 py-0.5 rounded-full">
                    {booking.addOns.length} Add-on
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedBookingForPass(booking)}
                  className="flex-1 py-2 rounded-full bg-black text-white font-label-caps text-[10px] uppercase tracking-wider font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-neutral-800"
                >
                  <span className="material-symbols-outlined text-[14px]">qr_code</span>
                  <span>Concierge Pass</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to cancel booking #${booking.id}?`)) {
                      onCancelBooking(booking.id);
                    }
                  }}
                  className="px-3 py-2 rounded-full bg-[#efe6e4] text-[#ba1a1a] font-label-caps text-[10px] uppercase tracking-wider font-bold hover:bg-[#e9e1de]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Concierge Check-in Pass Modal */}
      {selectedBookingForPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#efe6e4] flex flex-col items-center text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#fbf2ef] flex items-center justify-center text-[#7e5448] mb-3">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>

            <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#7e5448] font-bold">
              Vélure Sanctuary Pass
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#1f1b19] mt-1">
              {selectedBookingForPass.serviceTitle}
            </h3>
            <p className="text-xs text-[#47464a] mt-0.5">
              {selectedBookingForPass.atelier}
            </p>

            {/* Mock QR Code Pattern */}
            <div className="my-5 p-4 bg-[#fbf2ef] rounded-2xl border-2 border-dashed border-[#DFB3A6] flex flex-col items-center">
              <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-xs flex items-center justify-center">
                <svg
                  className="w-36 h-36"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="30" height="30" fill="#121214" />
                  <rect x="5" y="5" width="20" height="20" fill="#ffffff" />
                  <rect x="10" y="10" width="10" height="10" fill="#121214" />
                  <rect x="70" width="30" height="30" fill="#121214" />
                  <rect x="75" y="5" width="20" height="20" fill="#ffffff" />
                  <rect x="80" y="10" width="10" height="10" fill="#121214" />
                  <rect y="70" width="30" height="30" fill="#121214" />
                  <rect x="5" y="75" width="20" height="20" fill="#ffffff" />
                  <rect x="10" y="80" width="10" height="10" fill="#121214" />
                  <rect x="35" y="10" width="10" height="10" fill="#121214" />
                  <rect x="50" y="15" width="10" height="15" fill="#121214" />
                  <rect x="40" y="35" width="20" height="20" fill="#121214" />
                  <rect x="45" y="40" width="10" height="10" fill="#ffffff" />
                  <rect x="15" y="40" width="15" height="10" fill="#121214" />
                  <rect x="75" y="45" width="15" height="10" fill="#121214" />
                  <rect x="35" y="70" width="15" height="20" fill="#121214" />
                  <rect x="60" y="75" width="25" height="15" fill="#121214" />
                </svg>
              </div>
              <span className="font-mono text-xs font-bold text-black mt-2">
                {selectedBookingForPass.id}
              </span>
            </div>

            <div className="w-full bg-[#fbf2ef] p-3 rounded-xl text-left text-xs text-[#47464a] space-y-1 mb-4">
              <div className="flex justify-between">
                <span>Practitioner:</span>
                <strong className="text-[#1f1b19]">{selectedBookingForPass.specialistName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Appointment:</span>
                <strong className="text-[#1f1b19]">
                  {selectedBookingForPass.date} • {selectedBookingForPass.time}
                </strong>
              </div>
            </div>

            <button
              onClick={() => setSelectedBookingForPass(null)}
              className="w-full py-3 rounded-full bg-black text-white font-label-caps text-xs uppercase tracking-wider font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
