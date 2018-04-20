let Pokemon = (function Pokemon() {
  all = []
  return class Pokemon {

    constructor(name, front, back, id, type1, type2) {
      this.name = name
      this.frontImage = front
      this.backImage = back
      this.id = id
      this.type1 = type1
      this.type2 = type2
      this.type = [this.type1, this.type2]
      all.push(this)
      this.moveset = ""
    }

    render() {
      let html =
      `<div class="pokemon-container pokemon-frame" data-pokename="${this.name}" >
        <div class="img-title" data-pokename="${this.name}">
          <img class="pokemon-img" id="${this.name}-front" data-pokename="${this.name}" src="${this.frontImage}" style="display:block">
          <img id="card" src=${this.cardGrabber(this.type)} alt="">
          <h5 class="center-text" data-pokename="${this.name}">${this.name}</h5>
        </div>
      </div>
      `
      return html
    }

    static all() {
      return [...all]
    }

    static findByName(name) {
      let i = 0
      while (!(this.all()[i]["name"] == name)) {
        i++
      }
      return this.all()[i]
    }

    moves() {
      return Move.all().filter(move => move.pokemonId === this.id)
    }

    static delete(id) {
      if ((id > 0) && (id < all.length+1)) {
        all = [...all.slice(0,id-1),...all.slice(id)]
        return [...all]
      } else {
        console.log("ERROR: Bad Input!!!")
      }
    }
    randomizeMoveSet() {
      // debugger
      if (!this.moveset) {
        if (this.moves().length>4) {
          let numberofmoves = this.moves().length
          let arrayofmoves = []
          for (let i=0; i<4; i++){
            let move = Math.floor((Math.random() * numberofmoves) + 1)-1;
            if (arrayofmoves.includes(move)) {
              i--
            } else {
              arrayofmoves.push(move)
            }
          }
          this.moveset = arrayofmoves
          return this.moveset
        }
        else if (this.moves().length<4) {
          let numberofmoves = this.moves().length
          let arrayofmoves = []
          if (this.moves().length < 2) {
            arrayofmoves.push(0)
          } else {
            for (let i=0; i<numberofmoves; i++){
              arrayofmoves.push(i)
            }
          }
          this.moveset = arrayofmoves
          return this.moveset
        }
      }
      // this.moveset = Array(4).fill(this.moves()[0])
      // return this.moveset
    }
    renderAllMoves() {
      if (!document.getElementsByClassName("move").length) {
        return `
        <div>
        ${this.moveset.map(move => this.renderMove(move)).join('')}
        </div>
        `
      }
    }

    renderMove(i) {
      // console.log(`[${i}`)
      // console.log(` has ${this.moves()[i]} with a id of ${this.moves()[i].id}]`);
      return `
      <button id=${this.moves()[i].id} class="move">${this.moves()[i].name}</button>
      `
    }

    cardGrabber(type) {
      let cardObj
      cardObj = {"fire": "images/fire.png",
            "grass": "images/grass.png",
            "water": "images/water.png",
            "electric": "images/electric.png",
            "fighting": "images/fighting.png",
            "normal": "images/colorless.png",
            "dragon": "images/colorless.png",
            "psychic": "images/psychic.png",
            "ghost": "images/psychic.png",
            "ground": "images/colorless.png",
            "rock": "images/colorless.png",
            "flying": "images/colorless.png",
            "bug": "images/grass.png",
            "poison": "images/psychic.png",
            "ice": "images/water.png"}

        if (type.includes("")) {
          return cardObj[type[0]]
        } else {
          return cardObj[type[1]]
        }
    }

    static typeMultiplier(move, defender) {
      let halfeffective
      let doubleeffective
      let zeroeffective
      let mult1
      let mult2
      let mult3
      //values not effective against keys
      halfeffective = {
            "fire": ["fire", "water", "rock", "dragon"],
            "grass": ["fire", "grass", "poison", "bug"],
            "water": ["water", "grass", "dragon"],
            "electric": ["electric", "grass", "dragon"],
            "fighting": ["poison", "psychic", "flying", "bug"],
            "normal": ["rock"],
            "dragon": [""],
            "psychic": ["psychic"],
            "ghost": [""],
            "ground": ["grass", "bug"],
            "rock": ["fighting", "ground"],
            "flying": ["electric", "rock"],
            "bug": ["fire", "flying", "fighting"],
            "poison": ["poison", "ground", "rock", "ghost"],
            "ice": ["water","ice"]
          }
      doubleeffective = {
            "fire": ["grass", "ice", "bug"],
            "grass": ["water", "ground", "rock"],
            "water": ["fire","ground", "rock"],
            "electric": ["water", "flying"],
            "fighting": ["normal", "ice", "rock"],
            "normal": [""],
            "dragon": ["dragon"],
            "psychic": ["poison", "fighting"],
            "ghost": ["ghost"],
            "ground": ["fire", "electric", "poison", "rock"],
            "rock": ["fire", "ice", "flying", "bug"],
            "flying": ["grass", "fighting", "bug"],
            "bug": ["grass", "poison", "psychic"],
            "poison": ["grass", "bug"],
            "ice": ["grass", "ground", "flying", "dragon"]
          }

          zeroeffective = {
            "fire": [""],
            "grass": [""],
            "water": [""],
            "electric": ["ground"],
            "fighting": ["ghost"],
            "normal": ["ghost"],
            "dragon": [""],
            "psychic": [""],
            "ghost": ["normal", "psychic"],
            "ground": ["flying"],
            "rock": [""],
            "flying": [""],
            "bug": [""],
            "poison": [""],
            "ice": [""]
          }

      if (defender.type.includes("")){
        if (halfeffective[move.type].includes(defender.type1)) {
          return .5
        } else if (doubleeffective[move.type].includes(defender.type1)){
          return 2
        }else if (zeroeffective[move.type].includes(defender.type1)) {
          return 0
        }else {
          return 1
        }
      } else {
        if (halfeffective[move.type].includes(defender.type1) || (halfeffective[move.type].includes(defender.type2))){
          return .5
        } else if (doubleeffective[move.type].includes(defender.type1) || (doubleeffective[move.type].includes(defender.type2))){
          return 2
        }else if (zeroeffective[move.type].includes(defender.type1) || (zeroeffective[move.type].includes(defender.type2))) {
          return 0
        }else {
          return 1
        }
      }
    }

    static randomPokemon() {
      let randomPokemon = Math.floor(Math.random() * (this.all().length-1) + 1)
      return this.all()[randomPokemon]
    }

  }
}
)()
