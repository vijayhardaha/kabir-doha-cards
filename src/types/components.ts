/**
 * Represents a state setter that accepts values or updater callbacks.
 */
export type Setter<T> = (value: T | ((prev: T) => T)) => void;

/**
 * Defines the editable state used to render a doha card.
 */
export interface CardOptions {
  color: string;
  couplet: string;
  loading: boolean;
}

/**
 * Describes props for the card color picker control.
 */
export interface ColorInputProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
  screenReaderLabel?: string;
}

/**
 * Describes props for loading a random doha into the card.
 */
export interface RandomButtonProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
}

/**
 * Describes props for opening doha search and applying selections.
 */
export interface SearchInputProps {
  updateOptions: Setter<Partial<CardOptions>>;
  couplets: string[];
}

/**
 * Describes props for the searchable doha selection modal.
 */
export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  couplets: string[];
  onSelect: (selectedDoha: string) => void;
}

/**
 * Defines props for the main card customization toolbar.
 */
export interface OptionsBoxProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
  couplets: string[];
}

/**
 * Defines props for rendering the live doha card preview.
 */
export interface PreviewBoxProps {
  options: CardOptions;
  updateOptions: Setter<Partial<CardOptions>>;
}

/**
 * Describes props for rendering formatted couplet lines.
 */
export interface CoupletTextProps {
  couplet: string;
}

/**
 * Describes props for the composed couplet content block.
 */
export interface CoupletContentProps {
  couplet: string;
}

/**
 * Defines props for the client-side card generator shell.
 */
export interface MainContentProps {
  couplets: string[];
}
