import api from './client';

// Home Spin Wheel Event
export const fetchSpinWheelEvent = async () => {
  const { data } = await api.get('/spin-wheel/event');
  return data;
};

// List Hadiah
export const fetchSpinWheelPrizes = async () => {
  const { data } = await api.get('/spin-wheel/prizes/');
  return data;
};

// Gatcha
export const fetchSpinWheelGatcha = async () => {
  const { data } = await api.get('/spin-wheel/gatcha');
  return data;
};

// Claim Prize
export const claimPrize = async (
  winnerId: string,
  payload: { nik: string; address: string; longitude: string; latitude: string }
) => {
  const { data } = await api.post(`/spin-wheel/claim-prize/${winnerId}`, payload);
  return data;
};

// History Gatcha
export const fetchSpinHistory = async (eventId: string) => {
  const { data } = await api.get(`/spin-wheel/history-spin/${eventId}`);
  return data;
};

// Detail Ambil Hadiah
export const fetchDetailWinners = async (historySpinId: string) => {
  const { data } = await api.get(`/spin-wheel/detail-winners/${historySpinId}`);
  return data;
};
