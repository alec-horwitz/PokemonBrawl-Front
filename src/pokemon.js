let Pokemon = (function Pokemon() {
  all = []
  return class Pokemon {

    constructor(name, images) {
      this.name = name
      this.frontImage = images["front"]
      this.backImage = images["back"]
      all.push(this)
    }

    render() {
      let html =
      `<div class="pokemon-container" data-pokename="${this.name}" style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text" data-pokename="${this.name}">${this.name}</h1>
      <div style="width:96px;margin:auto" data-pokename="${this.name}">
      <img id="${this.name}-front" data-pokename="${this.name}" src="${this.frontImage}" style="display:block">
      <img id="${this.name}-back" data-pokename="${this.name}" src="${this.backImage}" style="display:none">
      </div>
      </div>`

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
  }
})()
