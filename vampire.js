class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  //** Tree traversal methods **/-----------------------------------------------------------------------------------------------------

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const vampire of this.offspring) {
      const nameLookUp = vampire.vampireWithName(name);
      if (nameLookUp) {
        return nameLookUp;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const descendent of this.offspring) {
      totalDescendents += 1;
      const descendents = descendent.totalDescendents
      totalDescendents = totalDescendents + descendents;
    }
    
    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];

    if (this.yearConverted >= 1980) {
      vampires.push(this)
    }

    for (const offsp of this.offspring) {
      const millenialOffspring = offsp.allMillennialVampires;
      vampires = vampires.concat(millenialOffspring);
    }

    return vampires;
  }
  }


module.exports = Vampire;

