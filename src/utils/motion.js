/**
 * Shared Framer Motion configuration for quiet, unhurried architectural transitions.
 */

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay,
      ease: EDITORIAL_EASE,
    },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: EDITORIAL_EASE,
    },
  }),
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.16,
};
