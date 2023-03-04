import { Brand } from "../components/common";
import { CreateLink, ShareLink, QrCode } from '../components/core';
import { LinksList } from "../components/core/LinksList";

export const Home = () => {
  return (
    <div className="container mx-auto xl:w-1/3 py-8">
      <div className="bg-white rounded-md py-6 px-4 mx-auto shadow-sm border border-gray-200">
        <div className="mb-8">
          <Brand />
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <CreateLink />
          <ShareLink />
          <QrCode />
          <LinksList />
        </div>
      </div>
    </div>
  )
}