import React from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Car, Utensils, Calendar } from 'lucide-react'

export default function Contact() {
  return (
    <div className="container w-full mx-auto">
      <main className="w-full m-auto max-w-7xl bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Contact <span className="text-blue-600">Romsay Hotel</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            We're here to help make your stay exceptional. Reach out to us for reservations, inquiries, or any
            assistance you need.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Phone */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Call Us</h3>
            <p className="text-blue-600 font-semibold text-lg">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500 mt-1">MON-SUN: 6:00AM-8:00PM</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
            <p className="text-blue-600 font-semibold">info@romsay.com</p>
            <p className="text-sm text-gray-500 mt-1">Quick Response</p>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">123 Luxury Avenue</p>
            <p className="text-gray-600 text-sm">Downtown, NY 10001</p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Front Desk</h3>
            <p className="text-gray-600 text-sm">24 Hours</p>
            <p className="text-gray-600 text-sm">Every Day</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="reservation">Room Reservation</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Hotel Information & Map */}
          <div className="space-y-8">
            {/* Hotel Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Luxury Avenue
                      <br />
                      Downtown, New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Numbers</h3>
                    <p className="text-gray-600">
                      Front Desk: +1 (555) 123-4567
                      <br />
                      Reservations: +1 (555) 123-4568
                      <br />
                      Restaurant: +1 (555) 123-4569
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Addresses</h3>
                    <p className="text-gray-600">
                      General: info@romsay.com
                      <br />
                      Reservations: reservations@romsay.com
                      <br />
                      Events: events@romsay.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Operating Hours</h3>
                    <p className="text-gray-600">
                      Front Desk: 24/7
                      <br />
                      Restaurant: 6:00 AM - 11:00 PM
                      <br />
                      Spa: 8:00 AM - 9:00 PM
                      <br />
                      Fitness Center: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">123 Luxury Avenue, Downtown NY</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Department Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reservations */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reservations</h3>
              <p className="text-sm text-gray-600 mb-2">Book your perfect stay</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4568</p>
              <p className="text-sm text-gray-500">reservations@romsay.com</p>
            </div>

            {/* Restaurant */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Restaurant</h3>
              <p className="text-sm text-gray-600 mb-2">Dining reservations</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4569</p>
              <p className="text-sm text-gray-500">restaurant@romsay.com</p>
            </div>

            {/* Concierge */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Spa</h3>
              <p className="text-sm text-gray-600 mb-2">Contact for more activity</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4570</p>
              <p className="text-sm text-gray-500">spa@romsay.com</p>
            </div>

            {/* Valet */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto mb-4">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Valet Service</h3>
              <p className="text-sm text-gray-600 mb-2">Parking assistance</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4571</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What are your check-in/check-out times?</h3>
              <p className="text-gray-600 mb-4">
                Check-in: 3:00 PM | Check-out: 11:00 AM. Early check-in and late check-out may be available upon
                request.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Is parking available?</h3>
              <p className="text-gray-600 mb-4">
                We offer complimentary valet parking for all hotel guests with 24/7 security.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Do you allow pets?</h3>
              <p className="text-gray-600 mb-4">
                Yes, we are a pet-friendly hotel. Additional fees may apply. Please inform us when making your
                reservation.
              </p>
            </div>

            <div>

              <h3 className="font-semibold text-gray-900 mb-2">What amenities are included?</h3>
              <p className="text-gray-600 mb-4">
                All rooms include free Wi-Fi, fitness center access, and concierge services. Premium rooms include spa
                access.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my reservation?</h3>
              <p className="text-gray-600">
                Cancellations are accepted up to 24 hours before arrival. Please check your booking confirmation for
                specific terms.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Contact</h2>
          <p className="text-red-700 mb-4">For urgent matters or emergencies during your stay</p>
          <div className="flex items-center justify-center space-x-8">
            <div>
              <p className="font-semibold text-red-800">24/7 Emergency Line</p>
              <p className="text-2xl font-bold text-red-600">+1 (555) 911-HELP</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}