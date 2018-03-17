export function clamp (value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  else if (value > max) {
    return max;
  }

  return value;
}

// Get the linear interpolation between two values
export function lerp (value1: number, value2: number, amount: number) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}