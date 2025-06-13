import { Award, Clock, MapPin, Users, Wifi, Car, Utensils, Dumbbell, Waves, Star } from 'lucide-react'

export default function About() {
  return (
    <div className='container w-full mx-auto text-center'>
      <main className="w-full m-auto max-w-7xl py-12 px-4 sm:px-6 bg-gray-50 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">Romsay Hotel</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Where luxury meets comfort. Experience unparalleled hospitality in good environment.
          </p>  
          <div className="mt-10 flex justify-center space-x-4">
            <div className="rounded-md shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 md:py-4 md:text-lg md:px-10">
                Best Service
            </div>
            <div className="rounded-md shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 md:py-4 md:text-lg md:px-10">
                Best Hotel
            </div>
          </div>
        </div>

        {/* Hotel Overview */}
        <div className="relative bg-white p-8 rounded-2xl shadow-lg mb-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl text-left">Our Story</h2>
              <p className="mt-3 text-lg text-gray-500 text-left">
                Established in 1985, Romsay Hotel has been a beacon of luxury and comfort for over three decades.
                Our commitment to exceptional service and attention to detail has made us a preferred destination for
                travelers from around the world.
              </p>
              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Star className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">5-star luxury accommodations with personalized service</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Prime location in the downtown with easy access to attractions
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Award-winning hospitality and sustainable tourism practices
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex items-center justify-center">
              <img
                src="src/assets/banner.jpg"
                alt="Grand Vista Hotel exterior"
                className="rounded-lg shadow-lg w-full max-w-md"
              />  
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white py-12 rounded-2xl shadow-lg mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Premium Amenities</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for a perfect stay
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                From world-class dining to relaxing spa services, we offer amenities that exceed expectations.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Amenity 1 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Utensils className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fine Dining</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Award-winning restaurant featuring international cuisine and local specialties prepared by
                        renowned chefs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 2 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Waves className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Spa & Wellness</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Full-service spa with massage therapy, beauty treatments, and wellness programs for complete
                        relaxation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 3 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Dumbbell className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Fitness Center</h3>
                      <p className="mt-5 text-base text-gray-500">
                        State-of-the-art fitness facility with modern equipment, personal training, and group classes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 4 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Wifi className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Business Center</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Fully equipped business center with high-speed internet, meeting rooms, and conference
                        facilities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 5 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Car className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Valet Parking</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Complimentary valet parking service with 24/7 security for your peace of mind. Guaranteed safe parking for your vehicle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 6 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Users className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Concierge Service</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Dedicated concierge team to assist with reservations, tours, and local recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Team */}
        <div className="bg-white py-12 rounded-2xl shadow-lg mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Leadership Team</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Meet our hospitality experts
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Experienced professionals dedicated to making your stay exceptional.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Team Member 1 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <img
                            className="h-16 w-16 rounded-full bg-white"
                            src="https://via.placeholder.com/64x64"
                            alt="Hotel Manager"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">James Richardson</h3>
                      <p className="mt-2 text-base text-gray-500">General Manager</p>
                      <p className="mt-5 text-base text-gray-500">
                        With 20+ years in luxury hospitality, James ensures every guest receives world-class service.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <img
                            className="h-16 w-16 rounded-full bg-white"
                            src="https://via.placeholder.com/64x64"
                            alt="Executive Chef"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Maria Santos</h3>
                      <p className="mt-2 text-base text-gray-500">Executive Chef</p>
                      <p className="mt-5 text-base text-gray-500">
                        Award-winning chef creating culinary masterpieces that blend international flavors with local
                        ingredients.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 3 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <img
                            className="h-16 w-16 rounded-full bg-white"
                            src="https://via.placeholder.com/64x64"
                            alt="Guest Relations Manager"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">David Park</h3>
                      <p className="mt-2 text-base text-gray-500">Guest Relations Manager</p>
                      <p className="mt-5 text-base text-gray-500">
                        Dedicated to creating memorable experiences and ensuring every guest feels welcomed and valued.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 4 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 ">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <img
                            className="h-16 w-16 rounded-full bg-white"
                            src="https://via.placeholder.com/64x64"
                            alt="Operations Manager"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Sarah Williams</h3>
                      <p className="mt-2 text-base text-gray-500">Operations Manager</p>
                      <p className="mt-5 text-base text-gray-500">
                        Ensures seamless daily operations and maintains the highest standards of service across all
                        departments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Awards & Recognition</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Excellence recognized worldwide
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">2023</span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">Best Luxury Hotel Award</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Recognized by the International Hotel Awards for outstanding luxury accommodations and service
                      excellence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">2022</span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">5-Star TripAdvisor Certificate</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Achieved 5-star rating on TripAdvisor with over 2,000 excellent reviews from satisfied guests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">2021</span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">Sustainable Tourism Award</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Honored for our commitment to environmental sustainability and responsible tourism practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Booking Section */}
        <div id="contact" className="bg-blue-700 rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to experience luxury?</span>
              <span className="block text-blue-200">Book your stay with us today.</span>
            </h2>
          </div>
        </div>

      </main>
    </div>
  )
}