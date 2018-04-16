let match = []
document.addEventListener("DOMContentLoaded", function() {
  Adapter.getPokemon()
  Adapter.getMoves()
  Listener.runAll()
})
