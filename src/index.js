let match = []
document.addEventListener("DOMContentLoaded", function() {
  Adapter.getPokemon()
  Adapter.getMoves()
  Adapter.getGames()
  Listener.runAll()
})
