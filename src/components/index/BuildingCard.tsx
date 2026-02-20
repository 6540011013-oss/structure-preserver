import { Link } from "react-router-dom";

interface BuildingCardProps {
  letter: string;
  code: string;
  name: string;
  rooms: string;
  floors: string;
  roomsPerFloor: string;
  gradient: string;
  href: string;
  btnColor: string;
}

export default function BuildingCard({
  letter, code, name, rooms, floors, roomsPerFloor, gradient, href, btnColor,
}: BuildingCardProps) {
  return (
    <Link to={href} className="no-underline">
      <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-[50px_30px] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] cursor-pointer">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-2xl ${gradient} flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5`}>
          {letter}
        </div>

        <h3 className="text-2xl font-bold mb-2 text-slate-900">{code}</h3>
        <p className="text-slate-500 mb-6">{name} • {rooms}</p>

        {/* Stats */}
        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mb-6">
          <div className="flex justify-between">
            <span>Total Floors</span>
            <span className="font-semibold text-slate-900">{floors}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Rooms/Floor</span>
            <span className="font-semibold text-slate-900">{roomsPerFloor}</span>
          </div>
        </div>

        {/* CTA */}
        <span className={`inline-block ${btnColor} text-white rounded-xl px-6 py-2.5 font-semibold text-[0.95rem] transition-colors`}>
          View Floor Plan →
        </span>
      </div>
    </Link>
  );
}
