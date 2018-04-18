let Pokemon = (function Pokemon() {
  all = []
  return class Pokemon {

    constructor(name, front, back, id) {
      this.name = name
      this.frontImage = front
      this.backImage = back
      this.id = id
      all.push(this)
      this.moveset = ""
    }

    render() {
      let html =
      `<div class="pokemon-container pokemon-frame" data-pokename="${this.name}" >
        <h1 class="center-text" data-pokename="${this.name}">${this.name}</h1>
        <div style="width:96px;margin:auto" data-pokename="${this.name}">
          <img id="${this.name}-front" data-pokename="${this.name}" src="${this.frontImage}" style="display:block">
          <img id="${this.name}-back" data-pokename="${this.name}" src="${this.backImage}" style="display:none">
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
      if (!this.moveset) {
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
      }
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
      // console.log(i)
      return `
      <button id=${this.moves()[i].id} class="move">${this.moves()[i].name}</button>
      `
    }

  }
})()
