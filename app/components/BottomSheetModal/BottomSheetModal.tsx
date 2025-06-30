import React, {
  useCallback,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export interface BottomSheetModalProps {
  children: ReactNode;
  onDismiss?: () => void;
  snapPoints: Array<number | string>;
}

const BottomSheetModal: ForwardRefRenderFunction<
  GorhomBottomSheetModal,
  BottomSheetModalProps
> = ({ children, onDismiss, snapPoints }, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GorhomBottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onDismiss={onDismiss}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </GorhomBottomSheetModal>
  );
};

export default forwardRef(BottomSheetModal);
