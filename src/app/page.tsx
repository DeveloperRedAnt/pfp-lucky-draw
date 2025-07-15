"use client"
import { useState } from "react";
import svgPaths from "./svg-assets";
import SpinPage from "../components/spinner/spin-page";

function MdiCheckDecagram() {
  return (
    <div
      className="relative shrink-0 size-[42px]"
      data-name="mdi:check-decagram"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 42 42"
      >
        <g id="mdi:check-decagram">
          <path
            d={svgPaths.p1fe61d40}
            fill="var(--fill-0, #009844)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function CongratulationsText() {
  return (
    <div className="flex flex-col gap-1 items-center text-[#009844] text-center">
      <h1 className="text-[20px] font-bold tracking-[0.2px]">
        SELAMAT !
      </h1>
      <p className="text-[12px] tracking-[0.12px]">
        Anda Mendapatkan Hadiah
      </p>
    </div>
  );
}

function CongratulationsHeader() {
  return (
    <div className="flex flex-col gap-2.5 items-center">
      <MdiCheckDecagram />
      <CongratulationsText />
    </div>
  );
}

function PrizeImage() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-center bg-cover bg-no-repeat rounded-2xl shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] size-[156px]"
        style={{ backgroundImage: `url('https://is3.cloudhost.id/raizora/red-ant-colony/motor.png')` }}
      />
    </div>
  );
}

function MdiCardAccountDetailsOutline() {
  return (
    <div className="relative shrink-0 size-5 text-gray-500">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g clipPath="url(#clip0_1_87)" id="mdi:card-account-details-outline">
          <path
            d={svgPaths.p3d5b4e00}
            fill="currentColor"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_87">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IdField({ nikValue, onNikChange }: { nikValue: string; onNikChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-[8px] text-gray-600 tracking-[0.08px] uppercase">
        NIK KTP
      </label>
      <input
        type="text"
        value={nikValue}
        onChange={(e) => onNikChange(e.target.value)}
        className="bg-transparent text-[12px] text-gray-700 tracking-[0.12px] outline-none placeholder:text-gray-400 w-full"
        placeholder="Masukkan NIK KTP"
        maxLength={16}
      />
    </div>
  );
}

function IdCard({ nikValue, onNikChange }: { nikValue: string; onNikChange: (value: string) => void }) {
  return (
    <div className="w-full border-b border-gray-300 pb-4">
      <div className="flex items-center gap-3 px-4 py-3">
        <MdiCardAccountDetailsOutline />
        <IdField nikValue={nikValue} onNikChange={onNikChange} />
      </div>
    </div>
  );
}

function MdiMapMarkerOutline() {
  return (
    <div className="relative shrink-0 size-5 text-gray-500">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="mdi:map-marker-outline">
          <path
            d={svgPaths.p33d10cf0}
            fill="currentColor"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function AddressField({ addressValue, onAddressChange }: { addressValue: string; onAddressChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-[8px] text-gray-600 tracking-[0.08px] uppercase">
        Alamat Lengkap
      </label>
      <textarea
        value={addressValue}
        onChange={(e) => onAddressChange(e.target.value)}
        className="bg-transparent text-[12px] text-gray-700 tracking-[0.12px] outline-none placeholder:text-gray-400 w-full resize-none min-h-[60px] leading-relaxed"
        placeholder="Masukkan alamat lengkap"
        rows={3}
      />
    </div>
  );
}

function AddressCard({ addressValue, onAddressChange }: { addressValue: string; onAddressChange: (value: string) => void }) {
  return (
    <div className="w-full border-b border-gray-300 pb-4">
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="mt-1">
          <MdiMapMarkerOutline />
        </div>
        <AddressField addressValue={addressValue} onAddressChange={onAddressChange} />
      </div>
    </div>
  );
}

function MdiLocation() {
  return (
    <div className="absolute left-1/2 size-6 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="mdi:location">
          <path
            d={svgPaths.p3aac8400}
            fill="#FF4848"
            id="Vector"
            stroke="#505050"
          />
        </g>
      </svg>
    </div>
  );
}

function MapSection() {
  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div
        className="h-40 w-full bg-gray-200 relative"
        style={{ 
          backgroundImage: `url('https://is3.cloudhost.id/raizora/red-ant-colony/map.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <MdiLocation />
      </div>
    </div>
  );
}

function FormSection({ nikValue, onNikChange, addressValue, onAddressChange }: { 
  nikValue: string; 
  onNikChange: (value: string) => void;
  addressValue: string; 
  onAddressChange: (value: string) => void;
}) {
  return (
    <div className="w-full space-y-4">
      <IdCard nikValue={nikValue} onNikChange={onNikChange} />
      <AddressCard addressValue={addressValue} onAddressChange={onAddressChange} />
      <MapSection />
    </div>
  );
}

function SubmitButton({ nikValue, addressValue }: { nikValue: string; addressValue: string }) {
  const handleSubmit = () => {
    if (!nikValue.trim() || !addressValue.trim()) {
      alert('Mohon lengkapi semua data terlebih dahulu');
      return;
    }
    
    alert(`Data berhasil disimpan!\nNIK KTP: ${nikValue}\nAlamat: ${addressValue}`);
  };

  const isDisabled = !nikValue.trim() || !addressValue.trim();

  return (
    <button
      onClick={handleSubmit}
      disabled={isDisabled}
      className={`w-full px-6 py-4 rounded-lg font-bold text-[14px] tracking-[0.14px] transition-all duration-200 ${
        isDisabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-[#009844] text-white hover:bg-[#007A37] active:scale-[0.98]'
      }`}
    >
      Klaim Hadiah Sekarang
    </button>
  );
}

 function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
    <div className="w-full max-w-[480px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 space-y-6">
      {children}
      </div>
    </div>
    </div>
  );
}



 function CongratulationsForm() {
  const [nikValue, setNikValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  return (
    <Layout>
          {/* Hero Background */}
          <div
            className="h-[177px] rounded-xl bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('https://is3.cloudhost.id/raizora/red-ant-colony/hero-banner-pfp.png')` }}
          />
          
          {/* Congratulations Section */}
          <CongratulationsHeader />
          
          {/* Prize Image */}
          <PrizeImage />
          
          {/* Prize Description */}
          <div className="text-center space-y-2">
            <h2 className="text-[16px] font-bold text-gray-700 tracking-[0.16px] leading-relaxed">
              Sepeda Motor Yamaha Vixion 250cc, Fuel Injection, Manual
            </h2>
            <p className="text-[12px] text-gray-600 tracking-[0.12px] leading-relaxed">
              Silahkan isi form dibawah ini untuk Ambil Hadiah Anda
            </p>
          </div>
          
          {/* Form Section */}
          <div className="space-y-6">
            <FormSection 
              nikValue={nikValue} 
              onNikChange={setNikValue}
              addressValue={addressValue} 
              onAddressChange={setAddressValue}
            />
            
            {/* Submit Button */}
            <SubmitButton nikValue={nikValue} addressValue={addressValue} />
          </div>
    </Layout>
  );
}

export default function App() {
  return (
    <Layout>
        <SpinPage />
    </Layout>
  );
}