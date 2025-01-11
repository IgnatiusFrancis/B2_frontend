import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Apple, Chrome, Mail } from 'lucide-react';

const AddToCalendar = ({ event, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateForGoogle = (date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const generateGoogleCalendarUrl = () => {
    const startDate = formatDateForGoogle(event.date);
    const endDate = formatDateForGoogle(new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000));

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description.replace(/<[^>]*>/g, ''),
      location: event.location,
      dates: `${startDate}/${endDate}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateIcsFile = () => {
    const startDate = new Date(event.date).toISOString();
    const endDate = new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000).toISOString();
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startDate.replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/<[^>]*>/g, '')}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.title.replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const generateOutlookUrl = () => {
    const startDate = formatDateForGoogle(event.date);
    const endDate = formatDateForGoogle(new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000));

    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: startDate,
      enddt: endDate,
      subject: event.title,
      body: event.description.replace(/<[^>]*>/g, ''),
      location: event.location,
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={className || "w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"}
      >
        <Calendar className="inline-block mr-2 h-5 w-5" />
        Add to Calendar
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                window.open(generateGoogleCalendarUrl(), '_blank');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Chrome className="h-5 w-5 text-blue-500 mr-2" />
              Google Calendar
            </button>
            
            <button
              onClick={() => {
                generateIcsFile();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Apple className="h-5 w-5 text-gray-700 mr-2" />
              Apple Calendar
            </button>
            
            <button
              onClick={() => {
                window.open(generateOutlookUrl(), '_blank');
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              Outlook Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCalendar;