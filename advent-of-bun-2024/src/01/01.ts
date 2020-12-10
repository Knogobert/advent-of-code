export function partOne(input: string) {
  const lines: string[] = input.split("\n")
  const left: number[] = [];
  const right: number[] = [];
  lines.forEach(line => {
    if (line === "") return
    const [l, r] = line.split("   ")
    left.push(Number(l))
    right.push(Number(r))
  })

  const sortedLeft = left.sort()
  const sortedRight = right.sort()

  let counter = 0
  // cooked night time brain
  for (let i: number = 0; i < sortedLeft.length; i++) {
    if (sortedLeft[i] > sortedRight[i]) counter += sortedLeft[i] - sortedRight[i]
    else counter += sortedRight[i] - sortedLeft[i]
  }
  return counter
}

export function partTwo(input: string) {
  const lines: string[] = input.split("\n")
  const left: number[] = [];
  const right: number[] = [];
  lines.forEach(line => {
    if (line === "") return
    const [l, r] = line.split("   ")
    left.push(Number(l))
    right.push(Number(r))
  })

  const savedSimilarityScores = new Map<string, number>()
  let counter = 0

  for (let i: number = 0; i < left.length; i++) {
    if (savedSimilarityScores.has(`${left[i]} ${right[i]}`)) {
      counter += savedSimilarityScores.get(`${left[i]} ${right[i]}`)
      return savedSimilarityScores.get(`${left[i]} ${right[i]}`)
    }
    const similarityScore = right.reduce((acc, j) => {
      if (left[i] === j) return acc + 1
      return acc
    }, 0);
    savedSimilarityScores.set(`${left[i]} ${right[i]}`, similarityScore * left[i])
    counter += (similarityScore * left[i])
  }
  return counter
}