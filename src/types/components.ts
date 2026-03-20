export type Setter<T> = (value: T) => void;

export interface ColorInputProps {
  color: string;
  setColor: Setter<string>;
  screenReaderLabel?: string;
}

export interface CopyButtonProps {
  couplet: string;
  screenReaderText?: string;
}

export interface DownloadButtonProps {
  elementId?: string;
  fileNamePrefix?: string;
  scaleFactor?: number;
  quality?: number;
}

export interface RandomButtonProps {
  setCouplet: Setter<string>;
  loading: boolean;
  setLoading: Setter<boolean>;
}

export interface RangeSliderInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: Setter<number>;
  ariaLabel?: string;
  ariaValueText?: (val: number) => string;
}

export interface SearchInputProps {
  setCouplet: Setter<string>;
  couplets: string[];
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  couplets: string[];
  onSelect: (selectedDoha: string) => void;
}

export interface OptionsBoxProps {
  couplets: string[];
  color: string;
  setColor: Setter<string>;
  couplet: string;
  setCouplet: Setter<string>;
  fontSize: number;
  setFontSize: Setter<number>;
  lineHeight: number;
  setLineHeight: Setter<number>;
  loading: boolean;
  setLoading: Setter<boolean>;
}

export interface PreviewBoxProps {
  couplet: string;
  setCouplet: Setter<string>;
  loading: boolean;
  setLoading: Setter<boolean>;
  screenReaderText?: string;
}

export interface CoupletTextProps {
  couplet: string;
  screenReaderText?: string;
}

export interface CoupletContentProps {
  couplet: string;
}

export interface MainContentProps {
  couplets: string[];
}
