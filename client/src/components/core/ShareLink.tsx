import { FiLink2 } from 'react-icons/fi';
import { AiFillCopy } from 'react-icons/ai';
import { Label, Button } from '../common';

export const ShareLink = () => {
  return (
    <div>
        <Label>Share your link</Label>
        <div className="border border-gray-200 rounded-md p-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-3">
              <FiLink2 className="text-blue-800 text-2xl" />
              <a className="text-md hover:underline font-medium" href="#">
                localhost:5000
                <span className="text-blue-800">/example-link</span>
              </a>
            </div>
            <Button>
              <AiFillCopy />
              Copy
            </Button>
          </div>
        </div>
      </div>
  )
}
