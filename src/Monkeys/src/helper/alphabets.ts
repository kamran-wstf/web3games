export const randomPoints = (character: string): number => {
    // Define all the datasets
    const datasets = [
        { // Dataset 1
            'C': 1, 'Z': 2, 'A': 3, 'O': 4, 'I': 5, 'N': 6, 'S': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'E': 12, 'U': 13, 'M': 14, 'W': 15, 'F': 16, 'G': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'T': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 2
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'N': 6, 'S': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'C': 12, 'U': 13, 'M': 14, 'F': 15, 'W': 16, 'G': 17, 'Y': 18, 'P': 19, 'K': 20,
            'V': 21, 'Z': 22, 'B': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 3
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'N': 6, 'U': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'C': 12, 'S': 13, 'M': 14, 'W': 15, 'Y': 16, 'G': 17, 'F': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 4
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'C': 6, 'S': 7, 'H': 8, 'R': 9, 'Z': 10,
            'L': 11, 'N': 12, 'U': 13, 'M': 14, 'W': 15, 'F': 16, 'G': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'D': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 5
            'E': 1, 'T': 2, 'F': 3, 'O': 4, 'I': 5, 'S': 6, 'N': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'C': 12, 'U': 13, 'M': 14, 'W': 15, 'A': 16, 'G': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 6
            'E': 1, 'J': 2, 'A': 3, 'O': 4, 'L': 5, 'N': 6, 'S': 7, 'H': 8, 'R': 9, 'D': 10,
            'I': 11, 'C': 12, 'U': 13, 'M': 14, 'W': 15, 'F': 16, 'G': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'T': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 7
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'N': 6, 'S': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'F': 12, 'U': 13, 'M': 14, 'W': 15, 'C': 16, 'G': 17, 'B': 18, 'P': 19, 'Y': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 8
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'Q': 6, 'G': 7, 'H': 8, 'R': 9, 'D': 10,
            'L': 11, 'C': 12, 'U': 13, 'M': 14, 'W': 15, 'F': 16, 'S': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'N': 26
        },
        { // Dataset 9
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'U': 6, 'S': 7, 'H': 8, 'R': 9, 'G': 10,
            'L': 11, 'C': 12, 'N': 13, 'M': 14, 'W': 15, 'F': 16, 'D': 17, 'Y': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        },
        { // Dataset 10
            'E': 1, 'T': 2, 'A': 3, 'O': 4, 'I': 5, 'N': 6, 'S': 7, 'L': 8, 'R': 9, 'D': 10,
            'H': 11, 'Y': 12, 'U': 13, 'M': 14, 'W': 15, 'F': 16, 'G': 17, 'C': 18, 'P': 19, 'B': 20,
            'V': 21, 'Z': 22, 'K': 23, 'J': 24, 'X': 25, 'Q': 26
        }
    ];

    // Randomly select one of the datasets
    const randomDatasetIndex = Math.floor(Math.random() * datasets.length);
    const selectedDataset = datasets[randomDatasetIndex];
    
    // Get the value for the character from the selected dataset
    // If character is not found in the dataset, return a default value of 150
    return selectedDataset[character.toUpperCase() as keyof typeof selectedDataset] || 150;
}


