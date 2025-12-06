import React from 'react'
import PollFeedbackBox from '../../components/Polls&Feedback/PollFeedbackBox'
import MainLayout from '../../components/layout/MainLayout'
import pollsicon from '../../assets/icons/pollsfeedback/pollsblueicon.svg'

function PollsFeedback() {
  return (
    <MainLayout>
     <div className="bg-[#F6F5FA]  w-[1469px]  sm:px-4  lg:px-6 ">

        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12 ">
          <h1 className=" flex items-center gap-2 text-midGray text-[16px]  leading-[16px] font-[500] ">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={pollsicon}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
          Polls Feedback
          </h1>
        </div>
      <PollFeedbackBox/>
    </div>
    </MainLayout>
  )
}

export default PollsFeedback
