import { AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { Label, Button } from '../common';

export const LinksList = () => {
  return (
    <div>
      <Label>Your links</Label>
      <div className="flex flex-col gap-3">
      <div className="border border-gray-200 rounded-md p-2">
        <div className="flex justify-between">
            <div>
              <a className="text-md hover:underline font-medium mb-1" href="#">
                localhost:5000
                <span className="text-blue-800">/example-link</span>
              </a>
              <p className="text-gray-500 text-sm font-light">https://youtube.com/channel/random</p>
            </div>
            <div className="flex gap-2">
              <Button>
                <AiFillEdit />
                Edit
              </Button>
              <Button>
                <AiFillCopy />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
