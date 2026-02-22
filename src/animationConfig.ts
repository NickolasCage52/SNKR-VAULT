/** Apple-style spring and transition configs */
export const appleSpring = {
  type: 'spring' as const,
  damping: 28,
  stiffness: 300,
};

export const appleSpringGentle = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 200,
};

export const appleTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};
