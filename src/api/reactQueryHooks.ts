import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchSpinWheelEvent,
  fetchSpinWheelPrizes,
  fetchSpinWheelGatcha,
  claimPrize,
  fetchSpinHistory,
  fetchDetailWinners,
} from './spinWheelApi';

// Home Spin Wheel Event
export const useSpinWheelEvent = () => useQuery({ queryKey: ['spinWheelEvent'], queryFn: fetchSpinWheelEvent });

// List Hadiah
export const useSpinWheelPrizes = () => useQuery({ queryKey: ['spinWheelPrizes'], queryFn: fetchSpinWheelPrizes });

// Gatcha
export const useSpinWheelGatcha = () => useMutation({ mutationFn: fetchSpinWheelGatcha });

// Claim Prize
export const useClaimPrize = () => useMutation({ mutationFn: ({ winnerId, payload }: { winnerId: string; payload: { nik: string; address: string; longitude: string; latitude: string } }) => claimPrize(winnerId, payload) });

// History Gatcha
export const useSpinHistory = (eventId: string) => useQuery({ queryKey: ['spinHistory', eventId], queryFn: () => fetchSpinHistory(eventId), enabled: !!eventId });

// Detail Ambil Hadiah
export const useDetailWinners = (historySpinId: string) => useQuery({ queryKey: ['detailWinners', historySpinId], queryFn: () => fetchDetailWinners(historySpinId), enabled: !!historySpinId });
