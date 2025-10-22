import React from 'react'

interface TimelineItem {
  id: string
  title: string
  organization: string
  location: string
  period: string
  description?: string
  type: 'education' | 'work'
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    title: 'Elektrotehničar informacionih tehnologija',
    organization: 'ITHS (Information Technology High School)',
    location: 'Beograd',
    period: '2018 — 2022',
    type: 'education'
  },
  {
    id: '2',
    title: 'Softversko Inžinjerstvo',
    organization: 'Univerzitet Singidunum',
    location: 'Beograd',
    period: '2022',
    type: 'education'
  },
  {
    id: '3',
    title: 'Front end developer, React programer',
    organization: 'FactoryWW',
    location: 'Beograd',
    period: '2023-2024',
    type: 'work'
  },
  {
    id: '4',
    title: 'IT support',
    organization: 'International consulting and development',
    location: 'Beograd',
    period: '2024',
    type: 'work'
  }
]

const Experience: React.FC = () => {
  return (
    <section className="bg-white text-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Experience</h2>
          <p className="text-lg text-gray-600">My educational background and professional journey</p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          <div className="space-y-12">
            {timelineData.map((item) => (
              <div key={item.id} className="relative flex items-start">
                 <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white ${
                   item.type === 'education' ? 'bg-black' : 'bg-black ring-1 ring-black ring-offset-white'
                 } z-10`}></div>

                <div className="ml-16 flex-1">
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-700">
                          {item.organization}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.location}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                         <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                           item.type === 'education' 
                             ? 'bg-black text-white' 
                             : 'bg-black text-white'
                         }`}>
                          {item.type === 'education' ? 'Education' : 'Work Experience'}
                        </span>
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          {item.period}
                        </p>
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

         <div className="mt-16 flex justify-center">
           <div className="flex items-center space-x-6 text-sm">
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 rounded-full bg-black"></div>
               <span className="text-gray-600">Education</span>
             </div>
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 rounded-full bg-black ring-1 ring-black ring-offset-2 ring-offset-white"></div>
               <span className="text-gray-600">Work Experience</span>
             </div>
           </div>
         </div>
      </div>
    </section>
  )
}

export default Experience
