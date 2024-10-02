import React, { useEffect, useRef } from 'react'
import { FaStethoscope, FaUserMd, FaClock, FaShieldAlt } from 'react-icons/fa'

const teamMembers = [
  { name: 'Dr. Jane Smith', role: 'Chief Medical Officer', image: '/images/doc1.png' },
  { name: 'John Doe', role: 'Head of Technology', image: '/images/doc3.png' },
  { name: 'Emily Brown', role: 'Patient Care Coordinator', image: '/images/doc2.png' },
]

export default function About() {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el)
    })

    return () => observerRef.current.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-lime-500 to-green-600 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Telemedicine background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-lime-500 opacity-50 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-down">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About <span className="text-lime-300">Rimberio</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-lime-100 animate-fade-in-up">
            Revolutionizing healthcare through innovative telemedicine solutions.
          </p>
        </div>
        <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="#mission"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-lime-700 bg-white hover:bg-lime-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Learn More
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
     

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>

      {/* Mission Statement */}
      
      <div id="mission" className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center animate-on-scroll">
          <h2 className="text-base font-semibold text-lime-600 tracking-wide uppercase">Our Mission</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Healthcare at Your Fingertips
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            At Rimberio, we're committed to making quality healthcare accessible to everyone, anywhere, anytime.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Rimberio?</h2>
            <p className="mt-4 text-lg text-gray-500">
              Experience the future of healthcare with our cutting-edge telemedicine platform.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {[
              { name: 'Expert Physicians', description: 'Access to board-certified doctors', icon: FaUserMd },
              { name: '24/7 Availability', description: 'Round-the-clock medical consultations', icon: FaClock },
              { name: 'Secure Platform', description: 'HIPAA-compliant video consultations', icon: FaShieldAlt },
              { name: 'Comprehensive Care', description: 'From diagnosis to follow-ups', icon: FaStethoscope },
            ].map((feature, index) => (
              <div key={feature.name} className="relative animate-on-scroll" style={{animationDelay: `${index * 200}ms`}}>
                <dt>
                  <feature.icon className="absolute h-6 w-6 text-lime-600" aria-hidden="true" />
                  <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-lime-500 to-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl animate-on-scroll">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Meet Our Team</h2>
              <p className="text-xl text-green-100">
                The dedicated professionals behind Rimberio's innovative telemedicine solutions.
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {teamMembers.map((member, index) => (
                <li key={member.name} className="animate-on-scroll" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="space-y-6">
                    <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 ring-4 ring-lime-300 shadow-lg transform transition duration-500 hover:scale-105" src={member.image} alt={member.name} />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3 className="text-white">{member.name}</h3>
                        <p className="text-lime-200">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-lime-500 to-green-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 animate-on-scroll">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to experience Rimberio?</span>
            <span className="block">Start your journey to better health today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-green-100">
            Join thousands of satisfied patients who have chosen Rimberio for their telemedicine needs.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-lime-700 bg-white hover:bg-lime-50 sm:w-auto transform transition duration-500 hover:scale-105 hover:shadow-lg"
          >
            Sign Up Now
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}