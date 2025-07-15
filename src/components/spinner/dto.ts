// DTO for a single prize
export interface PrizeDto {
  id: string;
  title: string;
  bg_color: string;
  'font-color': string;
}

// DTO for the response from /api/spin-wheel/prizes
export interface SpinWheelPrizesResponseDto {
  response_code: string;
  response_message: string;
  data: PrizeDto[];
}

// DTO for /api/spin-wheel/gatcha data
export interface SpinWheelGatchaDataDto {
  prize_type: number;
  prize_id: string;
  prize_name: string;
  prize_image_url: string;
  remaining_chances: number;
  event_name: string;
  event_image_url: string;
}

// DTO for /api/spin-wheel/gatcha response
export interface SpinWheelGatchaResponseDto {
  response_code: string;
  response_message: string;
  data: SpinWheelGatchaDataDto;
}
