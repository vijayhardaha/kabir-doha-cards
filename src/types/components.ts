export type Setter<T> = (value: T | ((prev: T) => T)) => void;

export interface CardOptions {
  color: string;
  couplet: string;
  fontSize: number;
  lineHeight: number;
  loading: boolean;
}

export interface ColorInputProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
  screenReaderLabel?: string;
}

export interface CopyButtonProps {
  elementId?: string;
  scaleFactor?: number;
}

export interface DownloadButtonProps {
  elementId?: string;
  scaleFactor?: number;
}

export interface RandomButtonProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
}

export interface RangeSliderInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (val: number) => void;
  ariaLabel?: string;
  ariaValueText?: (val: number) => string;
}

export interface SearchInputProps {
  updateOptions: Setter<Partial<CardOptions>>;
  couplets: string[];
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  couplets: string[];
  onSelect: (selectedDoha: string) => void;
}

export interface OptionsBoxProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
  couplets: string[];
}

export interface PreviewBoxProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
}

export interface CoupletTextProps {
  couplet: string;
}

export interface CoupletContentProps {
  couplet: string;
}

export interface MainContentProps {
  couplets: string[];
}
