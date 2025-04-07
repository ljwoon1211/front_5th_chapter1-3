/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
): ComponentType<P> {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let prevResult: JSX.Element | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent = (props: P): JSX.Element => {
    // 3. equals 함수를 사용하여 props 비교
    const hasPropsChanged = !prevProps || !_equals(prevProps, props);

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (hasPropsChanged) {
      prevResult = Component(props);
      prevProps = { ...props };
    }

    return prevResult!;
  };

  return MemoizedComponent;
};

