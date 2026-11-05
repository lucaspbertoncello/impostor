import { useModePickerViewModel } from '#/features/home/mode-picker/mode-picker.viewmodel.ts';
import { ModePickerView } from '#/features/home/mode-picker/mode-picker.view.tsx';

export function HomePage() {
  return <ModePickerView {...useModePickerViewModel()} />;
}
