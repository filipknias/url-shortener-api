import { FiLink2 } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';
import { Label, Button } from '../common';

export const QrCode = () => {
  return (
    <div>
      <Label>Qr code</Label>
      <div className="flex justify-between gap-1 border border-gray-200 rounded-md px-3 py-6">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="" />
        <div className="flex flex-col justify-between">
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 font-medium">
              <FiLink2 className="text-blue-800 text-2xl"/>
              localhost:5000/example-link
            </li>
            <li className="flex items-center gap-2 font-medium">
              <MdDateRange className="text-blue-800 text-2xl" />
              22 December 2022
            </li>
          </ul>
          <Button>Download PNG</Button>
        </div>
      </div>
    </div>
  )
}
