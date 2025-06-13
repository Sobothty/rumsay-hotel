import React, { useState, useRef, useEffect } from 'react';

const CheckInOut = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const guestRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setShowCheckInCalendar(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(event.target)) {
        setShowCheckOutCalendar(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate calendar days
  const generateCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDateSelect = (day, isCheckIn = true) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const selectedDate = new Date(currentYear, currentMonth, day);
    const dateString = selectedDate.toISOString().split('T')[0];
    
    if (isCheckIn) {
      setCheckInDate(dateString);
      setShowCheckInCalendar(false);
      // Auto-set checkout date to next day if not set
      if (!checkOutDate) {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOutDate(nextDay.toISOString().split('T')[0]);
      }
    } else {
      setCheckOutDate(dateString);
      setShowCheckOutCalendar(false);
    }
  };

  const updateGuests = (type, operation) => {
    setGuests(prev => {
      const newGuests = { ...prev };
      if (operation === 'increment') {
        if (type === 'adults' && newGuests.adults < 10) newGuests.adults++;
        if (type === 'children' && newGuests.children < 10) newGuests.children++;
        if (type === 'rooms' && newGuests.rooms < 5) newGuests.rooms++;
      } else {
        if (type === 'adults' && newGuests.adults > 1) newGuests.adults--;
        if (type === 'children' && newGuests.children > 0) newGuests.children--;
        if (type === 'rooms' && newGuests.rooms > 1) newGuests.rooms--;
      }
      return newGuests;
    });
  };

  const CalendarComponent = ({ isCheckIn = true }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const days = generateCalendarDays(currentYear, currentMonth);
    const todayDate = today.getDate();

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => day && handleDateSelect(day, isCheckIn)}
              disabled={!day || day < todayDate}
              className={`
                h-8 w-8 text-sm rounded-md transition-colors
                ${!day ? 'invisible' : ''}
                ${day < todayDate ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
                ${day === todayDate ? 'bg-blue-500 text-white' : 'text-gray-700'}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const GuestSelector = () => (
    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-72">
      <div className="space-y-4">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Adults</div>
            <div className="text-sm text-gray-500">Ages 13+</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests('adults', 'decrement')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.adults <= 1}
            >
              −
            </button>
            <span className="w-8 text-center">{guests.adults}</span>
            <button
              onClick={() => updateGuests('adults', 'increment')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.adults >= 10}
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Children</div>
            <div className="text-sm text-gray-500">Ages 2-12</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests('children', 'decrement')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.children <= 0}
            >
              −
            </button>
            <span className="w-8 text-center">{guests.children}</span>
            <button
              onClick={() => updateGuests('children', 'increment')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.children >= 10}
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Rooms</div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuests('rooms', 'decrement')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.rooms <= 1}
            >
              −
            </button>
            <span className="w-8 text-center">{guests.rooms}</span>
            <button
              onClick={() => updateGuests('rooms', 'increment')}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              disabled={guests.rooms >= 5}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSearch = () => {
    const searchData = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests
    };
    console.log('Search data:', searchData);
    alert(`Searching for hotels:\nCheck-in: ${formatDate(checkInDate)}\nCheck-out: ${formatDate(checkOutDate)}\nGuests: ${guests.adults} adults, ${guests.children} children\nRooms: ${guests.rooms}`);
  };

  return (
    <section className="bg-white p-2 rounded-xl border-3 border-blue-400 mx-auto mt-8 shadow-md flex flex-col md:flex-row items-stretch md:items-center relative">
      {/* Check-in */}
      <div className="relative flex-1" ref={checkInRef}>
        <div 
          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg"
          onClick={() => {
            setShowCheckInCalendar(!showCheckInCalendar);
            setShowCheckOutCalendar(false);
            setShowGuestSelector(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-500 mr-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Check-in date</span>
            <span className="text-sm text-gray-800 font-medium">
              {checkInDate ? formatDate(checkInDate) : 'Select date'}
            </span>
          </div>
        </div>
        {showCheckInCalendar && <CalendarComponent isCheckIn={true} />}
      </div>

      {/* Check-out */}
      <div className="relative flex-1 border-t md:border-t-0 md:border-l border-blue-400" ref={checkOutRef}>
        <div 
          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg"
          onClick={() => {
            setShowCheckOutCalendar(!showCheckOutCalendar);
            setShowCheckInCalendar(false);
            setShowGuestSelector(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-500 mr-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Check-out date</span>
            <span className="text-sm text-gray-800 font-medium">
              {checkOutDate ? formatDate(checkOutDate) : 'Select date'}
            </span>
          </div>
        </div>
        {showCheckOutCalendar && <CalendarComponent isCheckIn={false} />}
      </div>

      {/* Guests & Room */}
      <div className="relative flex-1 border-t md:border-t-0 md:border-l border-blue-400" ref={guestRef}>
        <div 
          className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg"
          onClick={() => {
            setShowGuestSelector(!showGuestSelector);
            setShowCheckInCalendar(false);
            setShowCheckOutCalendar(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-500 mr-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500">Guests & Rooms</span>
            <span className="text-sm text-gray-800 font-medium">
              {guests.adults + guests.children} guests, {guests.rooms} room{guests.rooms > 1 ? 's' : ''}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {showGuestSelector && <GuestSelector />}
      </div>

      {/* Search Button */}
      <button 
        onClick={handleSearch}
        className="bg-blue-600 text-white font-medium w-full md:w-auto mt-2 md:mt-0 md:ml-2 px-6 py-3 rounded-lg md:rounded-r-xl hover:bg-blue-700 transition disabled:opacity-50"
        disabled={!checkInDate || !checkOutDate}
      >
        Search
      </button>
    </section>
  );
};

export default CheckInOut;