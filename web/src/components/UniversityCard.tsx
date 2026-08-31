import React from "react"

interface UniversityCardProps {
  university: {
    name: string
    rank: number
    fields: string[]
    image: string
    description: string
    badge: string
  }
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-gray-200 relative">
        <img src={university.image} alt={university.name} className="object-cover w-full h-full" />
        <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary">{university.badge}</span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{university.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{university.description}</p>
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Специализации:</span>
            <span>{university.fields.join(', ')}</span>
          </div>
        </div>
        <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-medium text-sm">Посмотреть программы</button>
      </div>
    </div>
  )
}

export default UniversityCard
