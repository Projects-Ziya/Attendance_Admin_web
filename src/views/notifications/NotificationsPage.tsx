import { useState } from 'react'
import bellicon from '../../assets/bell.svg'
import messageicon from '../../assets/message.svg'
import keyicon from '../../assets/key.svg'

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative flex items-center w-[99px] h-[40px] rounded-full overflow-hidden transition-colors duration-300
        ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
      aria-pressed={enabled}
    >
      {/* Knob */}
      <span
        className={`absolute left-1 top-1 w-8 h-8 rounded-full bg-white shadow-md transform transition-transform duration-300
          ${enabled ? 'translate-x-[60px]' : 'translate-x-0'}`}
      />

      {/* Labels container */}
      <span className="relative flex-1 text-center font-bold pl-5 text-white">
        {/* OFF text */}
        <span
          className={`inset-0 flex items-center justify-center transition-transform duration-300
            ${enabled ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100 text-gray-700'}`}
        >
          OFF
        </span>
        {/* ON text */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 pr-5
            ${enabled ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          ON
        </span>
      </span>
    </button>
  )
}

function NotificationsPage() {
  return (
    <div className=" w-full bg-[#F6F5FA]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1579px] mx-auto ">
          {/* Header */}
          <div className="pt-10 pb-[60px]">
            <h1 className="font-poppins flex items-center gap-2 text-[16px] text-[#909090] font-[500] leading-[1.3] tracking-[1.28px]">
              <span className="bg-[#E8F8FF] rounded-full w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
                <img src={bellicon} alt="Section icon" className="w-5.5 h-5.5 object-contain" />
              </span>
              Notifications
            </h1>
          </div>

          {/* Main Box */}
          <div
            className="bg-white shadow-sm rounded-lg overflow-hidden mx-auto"
            style={{
              width: '100%',
              maxWidth: '1469px',
              height: '362px',
              transform: 'rotate(0deg)',
              opacity: 1,
            }}
          >
            {/* Title */}
            <h2 className="text-xl pl-[53px] pt-[45px] text-[#4D4D4D] font-[400] text-[18px] mb-[61px]">
              App Notifications
            </h2>

            {/* Notification Options */}
            <div className="space-y-[8px] pl-[45px] pr-[45px] pb-[24px]">
              {/* Task updates box */}
              <div
                className="flex items-center justify-between border shadow-sm rounded-lg bg-white mx-auto"
                style={{
                  width: '100%',
                  maxWidth: '1380px',
                  height: '80px',
                  borderRadius: '10px',
                  padding: '40px',
                  boxSizing: 'border-box',
                }}
              >
                <span className="text-[14px] text-[#4D4D4D] font-[400] flex items-center gap-[20px] min-w-0">
                  <img src={messageicon} alt="" className="flex-shrink-0" />
                  <span className="truncate">Task updates or assigned items</span>
                </span>
                <div className="flex-shrink-0 ml-4">
                  <ToggleSwitch />
                </div>
              </div>

              {/* System maintenance box */}
              <div
                className="flex items-center justify-between border shadow-sm rounded-lg bg-white mx-auto"
                style={{
                  width: '100%',
                  maxWidth: '1380px',
                  height: '80px',
                  borderRadius: '10px',
                  padding: '40px',
                  boxSizing: 'border-box',
                }}
              >
                <span className="text-[#4D4D4D] text-[14px] font-[400] flex items-center gap-[20px] min-w-0">
                  <img src={keyicon} alt="" className="flex-shrink-0" />
                  <span className="truncate">System maintenance alerts</span>
                </span>
                <div className="flex-shrink-0 ml-4">
                  <ToggleSwitch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage