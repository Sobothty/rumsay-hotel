"use client"

import React from "react"
import { useState, useEffect } from "react"
import { CreditCard, Shield, ArrowLeft, Users, Trash2, Calendar, ArrowRight, CheckCircle } from "lucide-react"

// Custom Button Component
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
    ghost: "hover:bg-blue-50 hover:text-blue-700",
    outline: "border border-blue-200 bg-white hover:bg-blue-50 hover:text-blue-700",
  }
  const sizes = "h-10 py-2 px-4"

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Custom Card Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-xl bg-white text-gray-950 shadow-lg border border-gray-100 ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = "", ...props }) => (
  <div className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

// Custom Input Component
const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

// Custom Label Component
const Label = ({ children, className = "", ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
)

// Custom Select Components
const Select = ({ children, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleValueChange = (newValue) => {
    setValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen,
          setIsOpen,
          value,
          onValueChange: handleValueChange,
        }),
      )}
    </div>
  )
}

const SelectTrigger = ({ children, isOpen, setIsOpen, value }) => (
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="flex h-10 w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {children}
  </button>
)

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
)

const SelectContent = ({ children, isOpen, onValueChange }) => {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg">
      {React.Children.map(children, (child) => React.cloneElement(child, { onValueChange }))}
    </div>
  )
}

const SelectItem = ({ children, value, onValueChange }) => (
  <button
    type="button"
    onClick={() => onValueChange(value)}
    className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
  >
    {children}
  </button>
)

// Custom Separator Component
const Separator = ({ className = "", ...props }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} {...props} />
)

export default function HotelCheckoutPage() {
  // State declarations first to avoid reference errors
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [specialRequests, setSpecialRequests] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    nights: 0,
    rooms: [],
  })
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    gender: "",
  })

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    }
  }

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    return Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
  }

  // Calculate nights between dates
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.round((end - start) / (1000 * 60 * 60 * 24))
  }

  const calculateRoomTotal = (room) => {
    const nightsToUse = checkInDate && checkOutDate ? getNights() : bookingDetails.nights
    return Number.parseFloat(room.price) * nightsToUse
  }

  const roomsTotal = cartItems.reduce((sum, room) => sum + calculateRoomTotal(room), 0)

  const handleBackToRooms = () => {
    // For browser history API (works without router)
    window.history.back()
  }

  const handleRemoveRoom = (roomId) => {
    // Remove the condition that checks if cartItems.length > 1
    const updatedRooms = cartItems.filter((room) => room.id !== roomId)
    setCartItems(updatedRooms)
    localStorage.setItem("cartItems", JSON.stringify(updatedRooms))

    // If cart becomes empty, clear dates and redirect back to room selection
    if (updatedRooms.length === 0) {
      // Clear dates from localStorage and state
      localStorage.removeItem("checkInDate")
      localStorage.removeItem("checkOutDate")
      setCheckInDate("")
      setCheckOutDate("")
      setBookingDetails((prev) => ({
        ...prev,
        checkIn: "",
        checkOut: "",
        nights: 0,
      }))
      handleBackToRooms()
    }
  }

  const checkInFormatted = formatDate(checkInDate)
  const checkOutFormatted = formatDate(checkOutDate)

  // Fetch profile on mount
  useEffect(() => {
    const fetchCartData = () => {
      const cartData = localStorage.getItem("cartItems")
      if (cartData) {
        const parsedCart = JSON.parse(cartData)
        setCartItems(parsedCart)

        // Set booking details from cart data
        setBookingDetails((prev) => ({
          ...prev,
          rooms: parsedCart,
          checkIn: localStorage.getItem("checkInDate") || "",
          checkOut: localStorage.getItem("checkOutDate") || "",
          nights: calculateNights(
            localStorage.getItem("checkInDate") || "",
            localStorage.getItem("checkOutDate") || "",
          ),
        }))
      }
    }
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) return
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.ok) {
          const data = await res.json()
          console.log("Profile data:", data.data) // Debug: check gender value
          setGuestInfo({
            name: data.data.name || "",
            email: data.data.email || "",
            gender: data.data.gender || "",
          })
        }
      } catch (err) {
        // handle error if needed
      }
    }
    fetchCartData()
    fetchProfile()
  }, [])

  // Update booking details when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = getNights()
      setBookingDetails((prev) => ({
        ...prev,
        nights: nights,
      }))

      // Update localStorage
      localStorage.setItem("checkInDate", checkInDate)
      localStorage.setItem("checkOutDate", checkOutDate)
    }
  }, [checkInDate, checkOutDate])

  // Reset dates if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setCheckInDate("")
      setCheckOutDate("")
      setBookingDetails((prev) => ({
        ...prev,
        checkIn: "",
        checkOut: "",
        nights: 0,
      }))
    }
  }, [cartItems])

  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <Button
            variant="ghost"
            className="mb-4 absolute left-8 top-8 hover:bg-blue-100 transition-all duration-300"
            onClick={handleBackToRooms}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Room Selection
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your <span className="text-blue-600">Booking</span>
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Just a few more details to confirm your stay. We're excited to welcome you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guest Information */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-800">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={guestInfo.name}
                      readOnly
                      className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-800">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestInfo.email}
                      readOnly
                      className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-blue-800">
                    Gender
                  </Label>
                  <Input
                    id="gender"
                    value={guestInfo.gender}
                    readOnly
                    className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                  Stay Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn" className="text-blue-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Check-in Date
                    </Label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkInDate}
                        min={getTodayDate()}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full rounded-md bg-blue-10/50 border-blue-100 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkOut" className="text-blue-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Check-out Date
                    </Label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOutDate}
                        min={checkInDate || getTomorrowDate()}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full rounded-md bg-blue-10/50 border-blue-100 px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-blue-800">Duration</Label>
                  {checkInDate && checkOutDate && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center justify-center space-x-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl px-8 py-5 border border-blue-200 shadow-md">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-1">
                            {checkInFormatted.day}
                          </div>
                          <span className="text-blue-800 font-medium">{checkInFormatted.month}</span>
                          <span className="text-xs text-blue-600">{checkInFormatted.weekday}</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <div className="h-0.5 w-12 bg-blue-400"></div>
                            <ArrowRight className="text-blue-600 mx-1" size={20} />
                            <div className="h-0.5 w-12 bg-blue-400"></div>
                          </div>
                          <div className="mt-1 px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-md">
                            <span className="text-white font-bold text-sm tracking-wide">
                              {getNights()} night{getNights() !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold mb-1">
                            {checkOutFormatted.day}
                          </div>
                          <span className="text-blue-800 font-medium">{checkOutFormatted.month}</span>
                          <span className="text-xs text-blue-600">{checkOutFormatted.weekday}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                  Payment Information
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2 text-blue-600">
                    <CreditCard className="w-4 h-4" />
                    We accept all major credit and debit cards
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-blue-800">
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="text-lg pl-10 bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-blue-800">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc" className="text-blue-800">
                      Security Code (CVC)
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-blue-800">
                    Name on Card
                  </Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    className="bg-blue-50/50 border-blue-100 focus-visible:ring-blue-400"
                  />
                </div>

                {/* Card Type Icons */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-sm text-gray-500">We accept:</span>
                  <div className="flex gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white text-xs flex items-center justify-center font-bold shadow-md">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-md text-white text-xs flex items-center justify-center font-bold shadow-md">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md text-white text-xs flex items-center justify-center font-bold shadow-md">
                      AMEX
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-orange-700 rounded-md text-white text-xs flex items-center justify-center font-bold shadow-md">
                      DISC
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-900"></div>
              <CardHeader className="">
                <CardTitle className="text-blue-800">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Room Details */}
                {cartItems.map((room, index) => (
                  <div key={room.id} className="space-y-4">
                    {index > 0 && <Separator className="my-4" />}
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={room.image_url || "/placeholder.svg"}
                          alt={room.type}
                          className="w-24 h-20 object-cover rounded-lg shadow-md border border-blue-100"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-blue-800">{room.type}</h4>
                          <button
                            onClick={() => handleRemoveRoom(room.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            aria-label="Remove room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                        <div className="flex items-center text-sm text-blue-600 mt-1">
                          <Users className="w-4 h-4 mr-1" />
                          <span>Capacity: {room.capacity} Guests</span>
                        </div>
                        <div className="flex items-center text-sm mt-2 bg-blue-50 p-2 rounded-md">
                          <span className="font-medium text-blue-800">${Number.parseFloat(room.price).toFixed(2)}</span>
                          <span className="mx-1 text-blue-600">×</span>
                          <span className="text-blue-600">
                            {checkInDate && checkOutDate ? getNights() : bookingDetails.nights} nights
                          </span>
                          <span className="ml-auto font-semibold text-blue-800">
                            ${calculateRoomTotal(room).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator className="my-4" />

                

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${roomsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold bg-blue-100 p-3 rounded-lg mt-2">
                    <span className="text-blue-800">Total</span>
                    <span className="text-blue-800">${roomsTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
                  <Shield className="w-5 h-5" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>

                {/* Cancellation Policy */}
                <div className="text-sm bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm border border-blue-200">
                  <p className="font-medium text-blue-700 mb-1 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Free cancellation until {new Date(bookingDetails.checkIn).toLocaleDateString()}
                  </p>
                  <p className="text-blue-600 ml-6">
                    After that, cancellations will be charged the first night's rate.
                  </p>
                </div>

                {/* Complete Booking Button */}
                <Button className="w-full h-12 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
                  Complete Booking - ${roomsTotal.toFixed(2)}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing your booking, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
