interface FeatureListProps {
  title: string
  features: string[]
}

export function FeatureList({ title, features }: FeatureListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-fuchsia-600 mb-3">{title}</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}