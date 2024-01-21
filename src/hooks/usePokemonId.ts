export default function usePokemonId(id: number) {
  return `Nº${id.toString().padStart(3, '0')}`
}