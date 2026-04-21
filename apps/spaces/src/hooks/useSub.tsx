import { useMemo } from "react";
import { Subscription } from "../store/types/subscription";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const useSub = () => {

  const {
    sub,
  } = useStore((state) => ({
    sub: state.subscription,
  }), shallow)

  const isSubActive = useMemo(() =>
    sub && sub.status === 'active' && (sub.type === 'pro' || sub.type === 'enterprise'), [sub]);

  return {
    sub: sub as Subscription | null,
    isSubActive
  };
};
