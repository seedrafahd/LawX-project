// import icon4 from "./icon-4.svg";
// import icon5 from "./icon-5.svg";
// import icon6 from "./icon-6.svg";

const sessions = [
  {
    id: 1,
    isCurrent: true,
    action: { label: "الحالية", type: "current" },
    lastSeen: "نشط الآن",
    location: "لندن، المملكة المتحدة",
    device: "Chrome على MacBook Pro",
    ip: "IP: 192.168.1.104",
    // icon: icon5,
    iconClass: "relative w-6 h-[17px]",
    rowPaddingY: "py-[26px]",
    lastSeenPaddingY: "pt-7 pb-[29px]",
    locationPaddingY: "pt-7 pb-[29px]",
    deviceWidth: "w-[173.98px]",
    ipWidth: "w-[95.95px]",
    devicePl: "pl-[147.45px]",
    hasBorderTop: false,
  },
  {
    id: 2,
    isCurrent: false,
    action: { label: "إلغاء", type: "cancel" },
    lastSeen: "منذ ساعتين",
    location: "نيويورك، الولايات المتحدة",
    device: "Safari على iPhone 15",
    ip: "IP: 172.16.254.1",
    // icon: icon6,
    iconClass: "relative w-[15px] h-[22px]",
    rowPaddingY: "py-[30px]",
    lastSeenPaddingY: "pt-7 pb-[28.5px]",
    locationPaddingY: "pt-7 pb-[28.5px]",
    deviceWidth: "w-[136.83px]",
    ipWidth: "w-[89.09px]",
    devicePl: "pl-[184.61px]",
    hasBorderTop: true,
  },
];

export const ActiveSessionsSection = () => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 w-full bg-white rounded-xl border border-[#c2c6d81a] shadow-[0px_12px_32px_#191c1d0a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
          <h2 className="text-base sm:text-lg font-bold text-[#191c1d] text-right [direction:rtl]">
            إدارة الجلسات النشطة
          </h2>
          {/* <img src={icon4} className="w-5 h-4" /> */}
        </div>

        <button className="bg-[#ffdad6] text-[#93000a] text-xs font-bold px-4 py-2 rounded-lg w-full sm:w-auto">
          تسجيل الخروج من كافة الأجهزة
        </button>
      </div>

      {/* Sessions */}
      <div className="flex flex-col divide-y">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 py-4"
          >
            {/* Device + IP */}
            <div className="flex items-center gap-3 w-full sm:w-[35%]">
              {/* <img src={session.icon} className="w-5 h-5" /> */}

              <div className="flex flex-col text-right w-full [direction:rtl]">
                <span className="text-sm font-semibold text-[#191c1d]">
                  {session.device}
                </span>
                <span className="text-xs text-[#424656]">{session.ip}</span>
              </div>
            </div>

            {/* Location */}
            <div className="text-sm text-[#191c1d] text-right w-full sm:w-[25%] [direction:rtl]">
              {session.location}
            </div>

            {/* Last seen */}
            <div className="text-xs text-[#424656] text-right w-full sm:w-[20%] [direction:rtl]">
              {session.lastSeen}
            </div>

            {/* Action */}
            <div className="flex justify-end w-full sm:w-[20%]">
              {session.isCurrent ? (
                <span className="bg-[#0066ff1a] text-[#0066ff] text-xs px-2 py-1 rounded-full">
                  الحالية
                </span>
              ) : (
                <button className="text-[#ba1a1a] text-sm font-bold">
                  إلغاء
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
