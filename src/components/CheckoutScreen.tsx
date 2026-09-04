import React, { useState, useEffect } from 'react';
import { Treatment, Specialist, AddOnItem, BookingRecord, PaymentMethodItem } from '../types';
import { SPECIALISTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../utils/translations';

interface CheckoutScreenProps {
  treatment: Treatment;
  specialist: Specialist;
  selectedAddOns: AddOnItem[];
  basePrice: number;
  baseDuration: number;
  onConfirmBooking: (newBooking: BookingRecord) => void;
  onBack: () => void;
  language: Language;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  treatment,
  specialist: initialSpecialist,
  selectedAddOns,
  onConfirmBooking,
  onBack,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [currentSpecialist, setCurrentSpecialist] = useState<Specialist>(initialSpecialist);
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);

  // 2026 3-Month Advance Calendar Setup (Sep, Oct, Nov, Dec 2026)
  const months2026 = [
    { label: language === 'zh' ? '2026年 9月' : 'Sep 2026', monthName: 'Sep', monthIndex: 8, year: 2026, daysCount: 30, startDayOfWeek: 2 }, // Sep 1, 2026 is Tue
    { label: language === 'zh' ? '2026年 10月' : 'Oct 2026', monthName: 'Oct', monthIndex: 9, year: 2026, daysCount: 31, startDayOfWeek: 4 }, // Oct 1, 2026 is Thu
    { label: language === 'zh' ? '2026年 11月' : 'Nov 2026', monthName: 'Nov', monthIndex: 10, year: 2026, daysCount: 30, startDayOfWeek: 0 }, // Nov 1, 2026 is Sun
    { label: language === 'zh' ? '2026年 12月' : 'Dec 2026', monthName: 'Dec', monthIndex: 11, year: 2026, daysCount: 31, startDayOfWeek: 2 }  // Dec 1, 2026 is Tue
  ];

  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0); // September 2026
  const [selectedDayNum, setSelectedDayNum] = useState(15); // Default 15th of month
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('1:00 PM');

  // Payment Options State (Add / Remove feature)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>([
    { id: 'apple_pay', type: 'apple_pay', name: 'Apple Pay', isRemovable: false },
    { id: 'visa_4242', type: 'card', name: 'Visa Signature', last4: '4242', brand: 'visa', expiry: '08/28', isRemovable: true },
    { id: 'mc_8891', type: 'card', name: 'Vélure Platinum Mastercard', last4: '8891', brand: 'mastercard', expiry: '11/27', isRemovable: true },
    { id: 'atome', type: 'atome', name: 'Atome 3x PayLater (0% Int.)', isRemovable: false }
  ]);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('apple_pay');
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  // New Card Form State
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardholder, setNewCardholder] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newCvv, setNewCvv] = useState('');
  const [newCardBrand, setNewCardBrand] = useState<'visa' | 'mastercard' | 'amex'>('visa');
  const [cardFormError, setCardFormError] = useState('');

  // Discount & Booking State
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState(true);
  const [promoCodeInput, setPromoCodeInput] = useState('BEAUTY20');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Reservation hold timer: 14m 59s
  const [holdTimer, setHoldTimer] = useState(14 * 60 + 59);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoldTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayNamesZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const currentMonthData = months2026[selectedMonthIdx];
  const daysInSelectedMonth = Array.from({ length: currentMonthData.daysCount }, (_, i) => {
    const day = i + 1;
    const dayOfWeekIdx = (currentMonthData.startDayOfWeek + i) % 7;
    // Current date is Sep 3, 2026. Days prior to Sep 3, 2026 are past days.
    const isPast = selectedMonthIdx === 0 && day < 3;
    return {
      dayNum: day,
      dayOfWeek: language === 'zh' ? dayNamesZh[dayOfWeekIdx] : dayNamesShort[dayOfWeekIdx],
      isPast
    };
  });

  const timeSlots = ['10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

  // Calculations
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  const addOnsDuration = selectedAddOns.reduce((acc, curr) => acc + curr.durationMins, 0);
  const totalDuration = treatment.durationMins + addOnsDuration;

  const promoDiscount = promoCodeApplied ? 20.0 : 0;
  const pointsDiscount = redeemPoints ? 20.0 : 0;
  const taxesAndFees = 15.65;

  const subtotal = treatment.price + addOnsTotal;
  const totalAmount = Math.max(0, subtotal - promoDiscount - pointsDiscount + taxesAndFees);

  const chosenDateStr = `${currentMonthData.monthName} ${selectedDayNum}, 2026`;

  // Handler to Add New Card
  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber.trim() || newCardNumber.replace(/\s+/g, '').length < 12) {
      setCardFormError(language === 'zh' ? '请输入有效的卡号' : 'Please enter a valid card number');
      return;
    }
    if (!newCardholder.trim()) {
      setCardFormError(language === 'zh' ? '请输入持卡人姓名' : 'Please enter cardholder name');
      return;
    }
    if (!newExpiry.trim() || !newExpiry.includes('/')) {
      setCardFormError(language === 'zh' ? '有效期格式应为 MM/YY' : 'Expiry must be in MM/YY format');
      return;
    }

    const cleanNum = newCardNumber.replace(/\s+/g, '');
    const last4 = cleanNum.slice(-4);
    const newId = `card_${Date.now()}`;
    const brandName = newCardBrand === 'visa' ? 'Visa' : newCardBrand === 'mastercard' ? 'Mastercard' : 'Amex';

    const newMethod: PaymentMethodItem = {
      id: newId,
      type: 'card',
      name: `${brandName} ending in ${last4}`,
      last4,
      brand: newCardBrand,
      expiry: newExpiry,
      isRemovable: true
    };

    setPaymentMethods((prev) => [...prev, newMethod]);
    setSelectedPaymentId(newId);
    setShowAddCardModal(false);
    setNewCardNumber('');
    setNewCardholder('');
    setNewExpiry('');
    setNewCvv('');
    setCardFormError('');
  };

  // Handler to Remove a Payment Method
  const handleRemovePayment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t.deletePaymentConfirm)) {
      setPaymentMethods((prev) => prev.filter((item) => item.id !== id));
      if (selectedPaymentId === id) {
        setSelectedPaymentId('apple_pay');
      }
    }
  };

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);

      const newBookingRecord: BookingRecord = {
        id: `VEL-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceTitle: treatment.title,
        atelier: treatment.atelier,
        specialistName: currentSpecialist.name,
        specialistAvatar: currentSpecialist.avatar,
        date: chosenDateStr,
        time: selectedTimeSlot,
        durationMins: totalDuration,
        totalPaid: Number(totalAmount.toFixed(2)),
        status: 'Confirmed',
        addOns: selectedAddOns.map((a) => `${a.name} (+${a.durationMins}m)`)
      };

      setTimeout(() => {
        onConfirmBooking(newBookingRecord);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="w-full px-4 md:px-8 pb-32 max-w-7xl mx-auto">
      {/* Stepper Header */}
      <div className="flex flex-col gap-2 pt-2 mb-6">
        <div className="flex items-center justify-between max-w-md">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-label-caps text-[10px]">
              ✓
            </span>
            <span className="font-label-caps text-[10px] text-[#1f1b19]">Service</span>
          </div>
          <div className="h-0.5 w-6 bg-black rounded-full"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-label-caps text-[10px]">
              ✓
            </span>
            <span className="font-label-caps text-[10px] text-[#1f1b19]">Time &amp; Specialist</span>
          </div>
          <div className="h-0.5 w-6 bg-black rounded-full"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-label-caps text-[10px]">
              3
            </span>
            <span className="font-label-caps text-[10px] text-black font-bold">Checkout</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[#7e5448]">
          <span className="text-xs font-semibold">
            {language === 'zh' ? '席位确认与安全结账' : 'Final Step: Review & Confirm Booking'}
          </span>
          <span className="font-label-caps text-[10px] bg-[#ffdbd1] text-[#30130b] px-2 py-0.5 rounded-full font-bold">
            {t.holdingTimer} {formatTimer(holdTimer)}
          </span>
        </div>
      </div>

      {/* Responsive 2-Column Grid Layout for Website Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Main Form & Selectors) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Selected Service Card */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#efe6e4] flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-20 h-24 md:w-24 md:h-28 rounded-xl object-cover flex-shrink-0 shadow-xs"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label-caps text-[10px] text-[#7e5448] tracking-widest uppercase font-bold">
                    {treatment.atelier}
                  </span>
                  <span className="font-label-caps text-[9px] bg-[#EBD9CC] text-[#7a5146] px-2 py-0.5 rounded-full font-semibold">
                    Flagship
                  </span>
                </div>
                <h2 className="font-serif text-base md:text-lg font-semibold text-[#1f1b19] truncate mt-1">
                  {treatment.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-[#47464a]">
                  <span className="material-symbols-outlined text-[16px] text-[#7e5448]">schedule</span>
                  <span className="text-xs">{totalDuration} mins</span>
                  <span className="text-[#c8c6ca]">•</span>
                  <span className="text-xs font-bold text-black">${treatment.price}.00</span>
                </div>

                {/* Selected Specialist Pill */}
                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#f5ece9]">
                  <div className="flex items-center gap-2">
                    <img
                      src={currentSpecialist.avatar}
                      alt={currentSpecialist.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#efe6e4]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1f1b19]">
                        {currentSpecialist.name}
                      </span>
                      <span className="text-[10px] text-[#7e5448]">{currentSpecialist.title}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSpecialistModal(true)}
                    className="text-xs font-semibold text-black hover:underline"
                  >
                    {language === 'zh' ? '更换理疗师' : 'Change'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2026 ADVANCE BOOKING CALENDAR (Sep, Oct, Nov, Dec 2026) */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#efe6e4] flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5ece9] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-black text-[20px]">calendar_month</span>
                <span className="font-serif text-base font-semibold text-[#1f1b19]">
                  {t.bookingCalendar}
                </span>
              </div>
              <span className="font-label-caps text-[10px] text-[#7e5448] bg-[#fbf2ef] px-2.5 py-1 rounded-full font-bold">
                {t.advanceBooking3Months}
              </span>
            </div>

            {/* 2026 3-Month Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {months2026.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMonthIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1.5 border ${
                    selectedMonthIdx === idx
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-[#1f1b19] border-[#efe6e4] hover:border-black/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">event</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Month Day Selector Grid / Scroller */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#7e5448]">
                {language === 'zh'
                  ? `选择 ${currentMonthData.label} 的预约日期`
                  : `Select Day for ${currentMonthData.label}`}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {daysInSelectedMonth.map((item) => {
                  const isSelected = selectedDayNum === item.dayNum;
                  return (
                    <button
                      key={item.dayNum}
                      disabled={item.isPast}
                      onClick={() => setSelectedDayNum(item.dayNum)}
                      className={`flex flex-col items-center justify-center min-w-[58px] py-2.5 rounded-xl transition-all shadow-xs flex-shrink-0 ${
                        item.isPast
                          ? 'opacity-30 bg-[#efe6e4] cursor-not-allowed text-[#7e5448]'
                          : isSelected
                          ? 'bg-black text-white'
                          : 'bg-[#fbf2ef] text-[#1f1b19] hover:bg-[#efe6e4]'
                      }`}
                    >
                      <span
                        className={`font-label-caps text-[9px] ${
                          isSelected ? 'text-[#e5e1e4]' : 'text-[#7e5448]'
                        }`}
                      >
                        {item.dayOfWeek}
                      </span>
                      <span className="font-serif text-sm font-bold mt-0.5">{item.dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#f5ece9]">
              <span className="text-xs text-[#7e5448] font-medium flex items-center justify-between">
                <span>{t.timeSlots} ({chosenDateStr}):</span>
                <span className="text-black font-semibold">{selectedTimeSlot}</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-[#1f1b19] border-[#efe6e4] hover:border-black'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS WITH ADD & REMOVE FEATURE */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#efe6e4] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#f5ece9] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-black text-[20px]">credit_card</span>
                <span className="font-serif text-base font-semibold text-[#1f1b19]">
                  {t.paymentMethod}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCardModal(true)}
                className="text-xs font-bold text-[#7e5448] hover:text-black flex items-center gap-1 bg-[#fbf2ef] px-2.5 py-1 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                {t.addNewPayment}
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="flex flex-col gap-2.5">
              {paymentMethods.map((method) => {
                const isSelected = selectedPaymentId === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentId(method.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#fbf2ef] border-black shadow-xs'
                        : 'bg-white border-[#efe6e4] hover:bg-[#FAF7F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="radio"
                        name="payment_opt"
                        checked={isSelected}
                        onChange={() => setSelectedPaymentId(method.id)}
                        className="accent-black w-4 h-4 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm font-bold text-[#1f1b19] truncate">
                            {method.name}
                          </span>
                          {method.type === 'apple_pay' && (
                            <span className="font-label-caps text-[8px] bg-black text-white px-2 py-0.5 rounded-full">
                              Fast
                            </span>
                          )}
                        </div>
                        {method.expiry && (
                          <span className="text-[11px] text-[#7e5448]">Expires {method.expiry}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {method.type === 'apple_pay' ? (
                        <span className="material-symbols-outlined text-[#1f1b19] text-[22px]">
                          contactless
                        </span>
                      ) : method.type === 'atome' ? (
                        <span className="material-symbols-outlined text-[#C59B27] text-[22px]">
                          pie_chart
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-[#7e5448] text-[22px]">
                          credit_card
                        </span>
                      )}

                      {/* Remove button for user-added / removable cards */}
                      {method.isRemovable && (
                        <button
                          type="button"
                          onClick={(e) => handleRemovePayment(method.id, e)}
                          title="Remove payment option"
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#7e5448] hover:text-[#ba1a1a] hover:bg-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Order Summary & Checkout Action on Website) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20">
          {/* Beauty Pass Perks & Points */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#efe6e4] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#f5ece9] pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[20px] text-[#7e5448]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  loyalty
                </span>
                <span className="font-serif text-sm font-semibold text-[#1f1b19]">
                  {t.beautyPerks}
                </span>
              </div>
              <span className="font-label-caps text-[9px] bg-[#ffd9dc] text-[#3f0111] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Black Tier
              </span>
            </div>

            {/* Points Redemption Toggle */}
            <div className="bg-[#fbf2ef] rounded-xl p-3 flex items-center justify-between gap-3 border border-[#efe6e4]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1f1b19]">
                  {t.redeemPointsDiscount}
                </span>
                <span className="text-[11px] text-[#7e5448]">
                  Balance after: {redeemPoints ? '840 pts' : '1,240 pts'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={redeemPoints}
                  onChange={(e) => setRedeemPoints(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#e9e1de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            {/* Promo Code Input */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="font-label-caps text-[9px] text-[#7e5448] tracking-widest uppercase font-bold">
                PROMO CODE
              </span>
              {promoCodeApplied ? (
                <div className="flex items-center justify-between bg-[#fbf2ef] px-3 py-2 rounded-xl border border-[#efe6e4]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#2E6B4F]">
                      check_circle
                    </span>
                    <span className="text-xs font-bold text-[#1f1b19]">BEAUTY20</span>
                    <span className="font-label-caps text-[8px] bg-[#2E6B4F]/10 text-[#2E6B4F] px-2 py-0.5 rounded-full font-bold">
                      -$20.00
                    </span>
                  </div>
                  <button
                    onClick={() => setPromoCodeApplied(false)}
                    className="text-xs text-[#ba1a1a] font-bold hover:underline"
                  >
                    {t.remove}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="BEAUTY20"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#fbf2ef] border border-[#efe6e4] focus:outline-none"
                  />
                  <button
                    onClick={() => setPromoCodeApplied(true)}
                    className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-[#7e5448] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown Summary */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#efe6e4] flex flex-col gap-2.5">
            <h3 className="font-serif text-base font-semibold text-[#1f1b19] border-b border-[#f5ece9] pb-2">
              Payment Summary
            </h3>

            <div className="flex justify-between items-center text-xs text-[#47464a]">
              <span>{treatment.title}</span>
              <span className="font-bold text-[#1f1b19]">${treatment.price}.00</span>
            </div>

            {selectedAddOns.map((addon) => (
              <div key={addon.id} className="flex justify-between items-center text-xs text-[#47464a]">
                <span>{addon.name}</span>
                <span className="font-bold text-[#1f1b19]">+${addon.price}.00</span>
              </div>
            ))}

            {promoCodeApplied && (
              <div className="flex justify-between items-center text-xs text-[#2E6B4F] font-semibold">
                <span>Promo Discount (BEAUTY20)</span>
                <span>-$20.00</span>
              </div>
            )}

            {redeemPoints && (
              <div className="flex justify-between items-center text-xs text-[#2E6B4F] font-semibold">
                <span>Points Redemption (400 pts)</span>
                <span>-$20.00</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-[#47464a]">
              <span>Taxes &amp; Atelier Service Fee</span>
              <span className="font-bold text-[#1f1b19]">${taxesAndFees}</span>
            </div>

            <div className="pt-3 border-t border-[#f5ece9] flex justify-between items-baseline">
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-[#1f1b19]">{t.totalDue}</span>
                <span className="text-[11px] text-[#2E6B4F] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">stars</span>
                  +{Math.round(totalAmount * 2)} Beauty Pass pts earned
                </span>
              </div>
              <span className="font-serif text-2xl text-black font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={handleBook}
                disabled={isBooking || bookingSuccess}
                className={`w-full h-12 rounded-full font-label-caps text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all font-bold ${
                  bookingSuccess
                    ? 'bg-[#2E6B4F] text-white'
                    : 'bg-black text-white hover:bg-neutral-900'
                }`}
              >
                {isBooking ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Securing 2026 Reservation...</span>
                  </>
                ) : bookingSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-[#EBD9CC]">
                      check_circle
                    </span>
                    <span>Appointment Reserved!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>{t.confirmAndPay} (${totalAmount.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-2">
                <span className="material-symbols-outlined text-[14px] text-[#2E6B4F]">shield</span>
                <span className="font-label-caps text-[9px] text-[#7e5448] uppercase tracking-wider">
                  256-Bit SSL Atelier Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Payment Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fff8f6] rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#efe6e4] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#efe6e4] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-black text-[22px]">add_card</span>
                <h4 className="font-serif text-base font-semibold text-[#1f1b19]">
                  {t.addNewPayment}
                </h4>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="w-8 h-8 rounded-full bg-[#efe6e4]/60 hover:bg-[#efe6e4] flex items-center justify-center transition-colors text-[#1f1b19]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {cardFormError && (
              <div className="p-2.5 rounded-xl bg-red-100 text-red-700 text-xs font-medium">
                {cardFormError}
              </div>
            )}

            <form onSubmit={handleAddCardSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#7e5448] uppercase tracking-wide">
                  Card Brand
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['visa', 'mastercard', 'amex'] as const).map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setNewCardBrand(brand)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                        newCardBrand === brand
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-[#1f1b19] border-[#efe6e4]'
                      }`}
                    >
                      {brand.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#7e5448] uppercase tracking-wide">
                  {t.cardNumber}
                </label>
                <input
                  type="text"
                  maxLength={19}
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  placeholder="4532 8900 1234 5678"
                  className="w-full bg-white text-xs text-[#1f1b19] p-3 rounded-xl border border-[#efe6e4] focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#7e5448] uppercase tracking-wide">
                  {t.cardholderName}
                </label>
                <input
                  type="text"
                  value={newCardholder}
                  onChange={(e) => setNewCardholder(e.target.value)}
                  placeholder="Elena Vance"
                  className="w-full bg-white text-xs text-[#1f1b19] p-3 rounded-xl border border-[#efe6e4] focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#7e5448] uppercase tracking-wide">
                    {t.expiryDate}
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    placeholder="10/28"
                    className="w-full bg-white text-xs text-[#1f1b19] p-3 rounded-xl border border-[#efe6e4] focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#7e5448] uppercase tracking-wide">
                    {t.cvv}
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={newCvv}
                    onChange={(e) => setNewCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full bg-white text-xs text-[#1f1b19] p-3 rounded-xl border border-[#efe6e4] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#efe6e4]">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#7e5448]"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-[#7e5448] transition-colors"
                >
                  {t.addCardBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Specialist Change Modal */}
      {showSpecialistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#fff8f6] rounded-3xl w-full max-w-md p-6 shadow-xl border border-[#efe6e4] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#efe6e4] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#1f1b19]">Select Specialist</h3>
              <button
                onClick={() => setShowSpecialistModal(false)}
                className="w-8 h-8 rounded-full bg-[#efe6e4]/60 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {SPECIALISTS.map((sp) => (
                <div
                  key={sp.id}
                  onClick={() => {
                    setCurrentSpecialist(sp);
                    setShowSpecialistModal(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all ${
                    currentSpecialist.id === sp.id
                      ? 'bg-[#fbf2ef] border-black shadow-xs'
                      : 'bg-white border-[#efe6e4] hover:bg-[#FAF7F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#DFB3A6]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#1f1b19]">{sp.name}</span>
                      <span className="text-xs text-[#7e5448]">{sp.title}</span>
                    </div>
                  </div>
                  {currentSpecialist.id === sp.id && (
                    <span className="material-symbols-outlined text-black text-[20px]">check</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
