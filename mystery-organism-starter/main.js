// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* ---------------------------------- My Code ---------------------------------- */
// step 3. Return a new object
const pAequorFactory = (num, dnaArr) => {
  return {
    specimenNum: num,
    dna: dnaArr,

    // step 4. Randomly mutates one dna base
    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);
      // console.log(randomIndex)
      const currentValue = this.dna[randomIndex];
      // console.log(currentValue)
      let newValue = returnRandBase();
      while (newValue === currentValue) {
        newValue = returnRandBase();
      }
      this.dna[randomIndex] = newValue;

      return this.dna;
    },
    // Step 5. Print percent in common between two pAequors' DNAs
    compareDNA(otherSpecimen) {
      let sameDNABase = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) {
          sameDNABase += 1;
        }
      }
      let percentSame = Math.floor((sameDNABase / 15) * 100);

      console.log(
        `Specimen #${this.specimenNum} and specimen #${otherSpecimen.specimenNum} have ${percentSame}% DNA in common.`
      );
    },
    // Step 6. Return if specimen is likely to survice
    willLikelySurvive() {
      const cgBase = this.dna.filter((base) => base === 'C' || base === 'G').length;
      return (cgBase / 15) * 100 >= 60;
    },
    // Step 8 (Project Extention). Return complementary DNA Strand
    complementStrand() {
      let complementaryStrand = [...this.dna];
      for (let i = 0; i < this.dna.length; i++) {
        if (complementaryStrand[i] === "A") {
          complementaryStrand[i] = "T";
        } else if (complementaryStrand[i] === "T") {
          complementaryStrand[i] = "A";
        } else if (complementaryStrand[i] === "C") {
          complementaryStrand[i] = "G";
        } else if (complementaryStrand[i] === "G") {
          complementaryStrand[i] = "C";
        }
      }
      return complementaryStrand;
    },
  };
};

// Step 7. Create 30 instances of pAequor that can survive in their natural environment
const createpAequor = () => {
  let pAequorSurviving = [];
  let n = 1;
  while (pAequorSurviving.length < 30) {
    let newpAequor = pAequorFactory(n, mockUpStrand());
    if (newpAequor.willLikelySurvive()) {
      pAequorSurviving.push(newpAequor);
    }
    n++;
  }
  return pAequorSurviving;
};

/* -------------------------------- TESTS -------------------------------- */
// console.log(createpAequor());

// const pAequor = pAequorFactory(2, mockUpStrand());
// console.log(pAequor)
// pAequor.mutate()
// console.log(pAequor.dna);
// console.log(pAequor.willLikelySurvive());
// console.log(pAequor.complementStrand())

// const pAequor2 = pAequorFactory(3, mockUpStrand());
// console.log(pAequor2.dna)
// pAequor.compareDNA(pAequor2);
