import { BiLink } from 'react-icons/bi';

export const Brand = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-blue-600 rounded-full flex items-center justify-center p-1">
        <BiLink className="text-2xl text-white" />
      </div>
      <h2 className="text-2xl font-bold">Url Shrinker</h2>
    </div>
  )
}