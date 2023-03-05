import { AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Label, Button } from '../common';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Views',
      data: [500, 800, 1200, 950, 1100, 1500, 2000],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const LinkItem = () => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-md p-2 relative mb-8 transition-all">
      <div 
        className="absolute left-1/2 top-full bg-blue-600 rounded-full flex items-center justify-center p-2 -translate-x-1/2 -translate-y-1/4 hover:bg-blue-700 transition-colors cursor-pointer text-white text-xl"
        onClick={() => setStatsOpen(!statsOpen)}
      >
        {statsOpen? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div className="flex justify-between">
        <div>
          <a className="text-md hover:underline font-medium mb-1" href="#">
            localhost:5000
            <span className="text-blue-800">/example-link</span>
          </a>
          <p className="text-gray-500 text-sm font-light">https://youtube.com/channel/random</p>
        </div>
        <div className="flex gap-2">
          <Button color="red">
            <AiFillEdit />
          </Button>
          <Button>
            <AiFillCopy />
            Copy
          </Button>
        </div>
      </div>
      {statsOpen && (
        <div className="my-6">
          <Bar data={data} />
        </div>
      )}
    </div>
  )
}

export const LinksList = () => {
  return (
    <div>
      <Label>Your links</Label>
      <div className="flex flex-col gap-3">
        <LinkItem />
        <LinkItem />
        <LinkItem />
      </div>
    </div>
  )
}
