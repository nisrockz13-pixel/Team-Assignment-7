import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DiscoverScreen } from './components/DiscoverScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ServiceDetailScreen } from './components/ServiceDetailScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { PassScreen } from './components/PassScreen';
import { TalkToUsScreen } from './components/TalkToUsScreen';
import { ConsultancyChatBot } from './components/ConsultancyChatBot';
import { SkinAnalysisModal } from './components/SkinAnalysisModal';
import { ScreenType, Treatment, Specialist, AddOnItem, BookingRecord } from './types';
import { TREATMENTS, SPECIALISTS, ADD_ONS, INITIAL_BOOKINGS } from './data/mockData';
import { Language } from './utils/translations';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('discover');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('discover');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(TREATMENTS[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(SPECIALISTS[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([ADD_ONS[0]]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [wishlist, setWishlist] = useState<string[]>(['cryo-facial']);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);

  // Language preference: English ('en') or Chinese ('zh')
  const [language, setLanguage] = useState<Language>('en');

  // Skin profile analysis modal state
  const [isSkinAnalysisOpen, setIsSkinAnalysisOpen] = useState(false);

  const navigateTo = (screen: ScreenType) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    navigateTo('service-detail');
  };

  const handleQuickBook = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    const spec = SPECIALISTS[1] || SPECIALISTS[0];
    setSelectedSpecialist(spec);
    setSelectedAddOns([ADD_ONS[0]]);
    navigateTo('checkout');
  };

  const handleProceedToCheckout = (
    treatment: Treatment,
    specialist: Specialist,
    addOns: AddOnItem[]
  ) => {
    setSelectedTreatment(treatment);
    setSelectedSpecialist(specialist);
    setSelectedAddOns(addOns);
    navigateTo('checkout');
  };

  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
    navigateTo('bookings');
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleBack = () => {
    if (currentScreen === 'checkout') {
      navigateTo('service-detail');
    } else if (currentScreen === 'service-detail') {
      navigateTo(previousScreen === 'explore' ? 'explore' : 'discover');
    } else {
      navigateTo('discover');
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#1f1b19] font-sans antialiased flex flex-col">
      {/* Universal Fixed Header with Single Vélure Logo, Language Switcher & Desktop Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onBack={handleBack}
        language={language}
        onToggleLanguage={setLanguage}
        onOpenSkinAnalysis={() => setIsSkinAnalysisOpen(true)}
      />

      {/* Main Responsive Canvas (Optimized for both mobile and wide website displays) */}
      <main className="flex-1 w-full pt-16 md:pt-20 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {currentScreen === 'discover' && (
              <DiscoverScreen
                onSelectTreatment={handleSelectTreatment}
                onQuickBook={handleQuickBook}
                onNavigate={navigateTo}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  navigateTo('explore');
                }}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                language={language}
                onOpenSkinAnalysis={() => setIsSkinAnalysisOpen(true)}
              />
            )}

            {currentScreen === 'explore' && (
              <ExploreScreen
                onSelectTreatment={handleSelectTreatment}
                onQuickBook={handleQuickBook}
                onNavigate={navigateTo}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {currentScreen === 'service-detail' && (
              <ServiceDetailScreen
                treatment={selectedTreatment}
                onProceedToCheckout={handleProceedToCheckout}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onBack={handleBack}
              />
            )}

            {currentScreen === 'checkout' && (
              <CheckoutScreen
                treatment={selectedTreatment}
                specialist={selectedSpecialist}
                selectedAddOns={selectedAddOns}
                basePrice={selectedTreatment.price}
                baseDuration={selectedTreatment.durationMins}
                onConfirmBooking={handleConfirmBooking}
                onBack={handleBack}
                language={language}
              />
            )}

            {currentScreen === 'bookings' && (
              <BookingsScreen
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onNavigate={navigateTo}
              />
            )}

            {currentScreen === 'pass' && (
              <PassScreen onNavigate={navigateTo} />
            )}

            {currentScreen === 'talk-to-us' && (
              <TalkToUsScreen onNavigate={navigateTo} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Live Chat Bot for Consultancy Services */}
      <ConsultancyChatBot
        language={language}
        onSelectTreatment={handleSelectTreatment}
        onOpenSkinAnalysis={() => setIsSkinAnalysisOpen(true)}
      />

      {/* Skin Profile Analysis Modal Feature */}
      <SkinAnalysisModal
        isOpen={isSkinAnalysisOpen}
        onClose={() => setIsSkinAnalysisOpen(false)}
        language={language}
        onBookTreatment={handleQuickBook}
      />

      {/* Bottom Navigation Dock (Visible on Mobile, Desktop has Top Header Nav) */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        bookingCount={bookings.filter((b) => b.status === 'Confirmed').length}
        language={language}
      />
    </div>
  );
}
