import { Brand, Button } from "../components/common";
import { CreateLink, ShareLink, QrCode } from '../components/core';

export const Home = () => {
  return (
    <div className="container mx-auto xl:w-1/3 h-full py-8 px-4">
      <div className="bg-white rounded-md py-6 px-4 mx-auto shadow-sm border border-gray-200 min-h-full">
        <div className="mb-8 flex justify-between items-center">
          <Brand />
          <Button>Dashboard</Button>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <CreateLink />
          {/* <ShareLink />
          <QrCode /> */}
        </div>
      </div>
    </div>
  )
}