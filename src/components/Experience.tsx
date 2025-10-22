import React from 'react';
import { useTranslation } from 'react-i18next';

interface TimelineItem {
  id: string
  title: string
  organization: string
  location: string
  period: string
  description?: string
  type: 'education' | 'work'
}

const Experience: React.FC = () => {
  const { t } = useTranslation();
  
  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: t('experience.timeline.education1.title'),
      organization: t('experience.timeline.education1.organization'),
      location: t('experience.timeline.education1.location'),
      period: '2018 — 2022',
      type: 'education'
    },
    {
      id: '2',
      title: t('experience.timeline.education2.title'),
      organization: t('experience.timeline.education2.organization'),
      location: t('experience.timeline.education2.location'),
      period: '2022',
      type: 'education'
    },
    {
      id: '3',
      title: t('experience.timeline.work1.title'),
      organization: t('experience.timeline.work1.organization'),
      location: t('experience.timeline.work1.location'),
      period: '2023-2024',
      type: 'work'
    },
    {
      id: '4',
      title: t('experience.timeline.work2.title'),
      organization: t('experience.timeline.work2.organization'),
      location: t('experience.timeline.work2.location'),
      period: '2024',
      type: 'work'
    }
  ];
  
  return (
    <section id="experience" className="bg-white text-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">{t('experience.title')}</h2>
          <p className="text-lg text-gray-600">{t('experience.description')}</p>
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
                          {item.type === 'education' ? t('experience.education') : t('experience.workExperience')}
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
               <span className="text-gray-600">{t('experience.education')}</span>
             </div>
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 rounded-full bg-black ring-1 ring-black ring-offset-2 ring-offset-white"></div>
               <span className="text-gray-600">{t('experience.workExperience')}</span>
             </div>
           </div>
         </div>
      </div>
    </section>
  )
}

export default Experience
