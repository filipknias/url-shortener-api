import { Label, TextInput, Button } from "../common";
import { AiOutlineArrowRight } from 'react-icons/ai';

export const CreateLink = () => {
  return (
    <div>
      <Label>Create link</Label>
      <div className="flex gap-3">
        <TextInput placeholder="https://google.com" />
        <Button>
          Create
          <AiOutlineArrowRight />
        </Button>
      </div>
    </div>
  )
}
