export default function useCapitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}